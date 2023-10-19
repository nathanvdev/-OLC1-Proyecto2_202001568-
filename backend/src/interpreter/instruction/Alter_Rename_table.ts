import Environment from "../abstrac/Environment.js"
import Instruction from "../abstrac/Instruction.js"


export default class Alter_Rename_table extends Instruction {
    private Table_name: string
    private newTable_name: string


    constructor(Table_name: string, newTable_name: string, Line: number, Column: number) {
        super(Line, Column)
        this.Table_name = Table_name
        this.newTable_name = newTable_name

    }

    public execute(env:Environment): any {
        env.Alter_Rename_table(this.Table_name, this.newTable_name)
    }

}