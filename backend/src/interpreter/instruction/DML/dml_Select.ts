import { outs } from "../../../out/out.js";
import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";
import { Return, Type_dxnry } from "../../abstrac/Return.js";
import { Node_table, Table_SQL } from "../../abstrac/Table_SQL.js";
import Logics from "../../expression/Logics.js";
import Relational from "../../expression/Relational.js";

export class dml_Select extends Instruction {
    private Columns: string[]
    private Table_name: string

    constructor(columns: [] | string, table_name: string) {
        super()
        if (typeof columns == "string") {
            this.Columns = [columns]
        } else {
            this.Columns = columns
        }
        this.Table_name = table_name
    }

    public execute(env: Environment) {

        let Table = env.FindTable(this.Table_name)
        let Rows_selected: Node_table[][] = []
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }
        if (this.Columns[0] == "*") {
            Rows_selected = Table.getAllRows()
        } else {
            Rows_selected = Table.getRows(this.Columns)
        }
        console.log(Rows_selected)

        let output = ""

        for (const row of Rows_selected) {
            for (const col of row) {
                output += `| ${col.getColumnName()}\t`
            }
            output += "\n"
            break
        }

        for (const row of Rows_selected) {
            for (const col of row) {
                if (col.getType() == Type_dxnry.DATE) {
                    let date = new Date(col.getValue())
                    output += `| ${date.toLocaleDateString("es-ES")}\t`
                } else {
                    output += `| ${col.getValue()}\t`
                }
            }
            output += "\n"
        }

        outs.push(output)


    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoSelect${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Select"];\n`
        return { rama: rama, nodo: NodoPrincipal };

    }
}

export class dml_Select_where extends Instruction {
    private Columns: string[]
    private Table_name: string
    private Where: Logics | Relational

    constructor(columns: [] | string, table_name: string, where: Logics | Relational) {
        super()
        if (typeof columns == "string") {
            this.Columns = [columns]
        } else {
            this.Columns = columns
        }
        this.Table_name = table_name
        this.Where = where
    }

    public execute(env: Environment) {
        let Table = env.FindTable(this.Table_name)
        let Rows: Node_table[][] = []
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }
        if (this.Columns[0] == "*") {
            Rows = Table.getAllRows()
        } else {
            Rows = Table.getRows(this.Columns)
        }

        let Rows_f: Node_table[][] = []
        Rows.forEach(row => {
            const flag: Return = this.Where.execute_where(env, row)
            if (flag.value) {
                Rows_f.push(row)
            }
        })
        console.log(Rows_f)

        let output = ""
        if (Rows_f.length == 0) {
            for (const col of Table.getHeaders()) {
                output += `| ${col.getColumnName()}\t`
            }
        }
        for (const row of Rows_f) {
            for (const col of row) {
                output += `| ${col.getColumnName()}\t`
            }
            output += "\n"
            break
        }
        for (const row of Rows_f) {
            for (const col of row) {
                if (col.getType() == Type_dxnry.DATE) {
                    let date = new Date(col.getValue())
                    output += `| ${date.toLocaleDateString("es-ES")}\t`
                } else {
                    output += `| ${col.getValue()}\t`
                }
            }
            output += "\n"
        }
        outs.push(output)
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoSelect${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Select"];\n`
        const codigorama: { rama: string; nodo: string; } = this.Where.GetDOT()
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return { rama: rama, nodo: NodoPrincipal };
    }
}