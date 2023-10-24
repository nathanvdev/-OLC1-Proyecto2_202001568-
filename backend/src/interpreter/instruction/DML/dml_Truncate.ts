import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";

export default class dml_Truncate extends Instruction{
    private Table_name: string
    constructor(table_name: string) {
        super()
        this.Table_name = table_name
    }
    public execute(env: Environment): any {
        let Table = env.FindTable(this.Table_name)
        Table.Truncate()
    }
}