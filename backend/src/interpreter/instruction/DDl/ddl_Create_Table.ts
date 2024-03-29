import Environment from "../../abstrac/Environment.js"
import Instruction from "../../abstrac/Instruction.js"
import { Node_table, Table_SQL } from "../../abstrac/Table_SQL.js"


export default class ddl_Create_Table extends Instruction {
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

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoCreateTable ${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Create Table"];\n`
        return { rama: rama, nodo: NodoPrincipal };
    }



}