import { Column_table } from "../abstrac/Column_table.js";
import Environment from "../abstrac/Environment.js";
import Instruction from "../abstrac/Instruction.js";

export default class Create_Table extends Instruction {

    private id: string
    private columns: []

    constructor(id: string, columns: [], Line: number, Column: number) {
        super(Line, Column)
        this.id = id
        this.columns = columns
    }

    public execute(env: Environment): any {
        let tmp2: Map<string, Column_table>  = new Map();
        for (let i = 0; i < this.columns.length; i++) {
            const element = this.columns[i];
            let tmp = new Column_table(element[0], element[1])
            if (!tmp2.has(element[0])) {
                tmp2.set(element[0], tmp)
            } else {
                console.log(`Error: la columna ${element[0]} ya existe en la tabla ${this.id}`)
            }
        }
        env.Create_Table(this.id, tmp2)
    }




}


