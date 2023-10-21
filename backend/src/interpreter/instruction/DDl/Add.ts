import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";
import { Node_table } from "../../abstrac/Table_SQL.js";

export default class Add extends Instruction {
    private Table_name: string
    private Column_name: string
    private Data_type: number

    constructor(table_name: string, column_name: string, data_type: number) {
        super()
        this.Table_name = table_name
        this.Column_name = column_name
        this.Data_type = data_type
    }

    public execute(env: Environment) {
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }

        let tmp_header: Node_table = new Node_table(this.Column_name, "", this.Data_type)
        Table.NewColumn(tmp_header)

    }
}