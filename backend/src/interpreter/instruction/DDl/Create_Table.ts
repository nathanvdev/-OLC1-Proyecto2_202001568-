import Environment from "../../abstrac/Environment.js"
import Instruction from "../../abstrac/Instruction.js"
import { Node_table, Table_SQL } from "../../abstrac/Table_SQL.js"


export default class Create_Table extends Instruction {
    private Name: string
    private Headers: []

    constructor(name: string, headers: []) {
        super()
        this.Name = name
        this.Headers = headers
    }

    public execute(env: Environment) {

        let tmp_headers: Node_table[] = []
        this.Headers.forEach((header) => {
            tmp_headers.push(new Node_table(header[0], "", header[1]))
        })

        let tmp_table: Table_SQL = new Table_SQL(this.Name, tmp_headers)
        env.NewTable(this.Name, tmp_table)

    }



}