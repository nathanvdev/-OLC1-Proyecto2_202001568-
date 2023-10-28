import Logics from "../expression/Logics.js"
import Relational from "../expression/Relational.js"
import Primitive from "../expression/primitives.js"
import Environment from "./Environment.js"
import { Return } from "./Return.js"




export class Node_table {
    private Column_name: string
    private Content: Return

    constructor(column_name: string, value_in: any, type_in: number) {
        this.Column_name = column_name
        let tmp: Return = { value: value_in, type: type_in }
        this.Content = tmp
    }

    public getColumnName(): string {
        return this.Column_name
    }

    public getValue(): any {
        return this.Content.value
    }

    public getType(): number {
        return this.Content.type
    }

    public setValue(value_in: Return) {
        if (this.Content.type == value_in.type) {
            this.Content = value_in
        } else {
            console.log(`El tipo de dato no coincide con el tipo de la columna "${this.Column_name}"`)
        }

    }

    public DeleteColumn() {
        this.Column_name = "-null"
        this.Content = { value: null, type: 0 }
    }

    public RenameColumn(new_name: string) {
        this.Column_name = new_name
    }

    public Update(Columns: string[][], env: Environment) {
        Columns.forEach((column: string[]) => {
            if (column[0] == this.Column_name) {

            }
        })
    }
}

export class Table_SQL {
    private Name: string
    private Headers: Node_table[]
    private Rows: Node_table[][] = []

    constructor(name: string, headers: Node_table[]) {
        this.Name = name
        this.Headers = headers
    }

    public NewColumn(header: Node_table) {
        this.Headers.push(header)
    }

    public DeleteHeader(column_name: string) {
        for (let i = 0; i < this.Headers.length; i++) {
            if (this.Headers[i].getColumnName() == column_name) {
                this.Headers.splice(i, 1);
                console.log(`Se elimino la columna "${column_name}" en la tabla "${this.Name}"`);
                break
            }
        }
        for (let i = 0; i < this.Rows.length; i++) {
            for (let j = 0; j < this.Rows[i].length; j++) {
                if (this.Rows[i][j].getColumnName() == column_name) {
                    this.Rows[i].splice(j, 1);
                    break
                }
            }
        }
    }

    public Rename_table(new_name: string) {
        this.Name = new_name
    }

    public Rename_column(column_name: string, new_name: string) {
        for (let i = 0; i < this.Headers.length; i++) {
            if (this.Headers[i].getColumnName() == column_name) {
                this.Headers[i].RenameColumn(new_name);
                console.log(`Se renombro la columna "${column_name}" a "${new_name}" en la tabla "${this.Name}"`);
                break
            }
        }
        for (let i = 0; i < this.Rows.length; i++) {
            for (let j = 0; j < this.Rows[i].length; j++) {
                if (this.Rows[i][j].getColumnName() == column_name) {
                    this.Rows[i][j].RenameColumn(new_name);
                    break
                }
            }
        }
    }

    public getCountHeaders(): number {
        return this.Headers.length
    }

    public InsertRow(toInsert: node_toInsert[]) {
        let newRow: Node_table[] = []

        this.Headers.forEach(head => {
            let tmp: Node_table = new Node_table(head.getColumnName(), null, head.getType())
            newRow.push(tmp)
        });

        toInsert.forEach((insert: node_toInsert) => {
            newRow.forEach((tmp_node: Node_table) => {
                if (insert[0] == tmp_node.getColumnName()) {
                    tmp_node.setValue(insert[1])
                }
            })
        });

        this.Rows.push(newRow)
        console.log(`Se inserto una nueva fila en la tabla "${this.Name}"`);
    }

    public getAllRows(): Node_table[][] {
        return this.Rows
    }

    public getRows(Columns: string[]): Node_table[][] {
        let RowsFinded: Node_table[][] = []
        this.Rows.forEach((row: Node_table[]) => {
            let tmp: Node_table[] = []
            row.forEach((tmp_column) => {
                if (Columns.includes(tmp_column.getColumnName())) {
                    tmp.push(tmp_column)
                }
            })
            RowsFinded.push(tmp)
        });

        return RowsFinded
    }

    public Update(Columns: [][], Where: Logics | Relational, env: Environment) {
        this.Rows.forEach(row => {
            const flag: Return = Where.execute_where(env, row)
            if (flag.value) {
                Columns.forEach((column: string[]) => {
                    row.forEach((tmp_column: Node_table) => {
                        if (column[0] == tmp_column.getColumnName()) {
                            const izq = column[1] as unknown as Primitive;
                            tmp_column.setValue(izq.execute(env))
                            console.log(`Se actualizo la columna "${tmp_column.getColumnName()}" en la tabla "${this.Name}"`);
                        }
                    })
                })
            }
        })
    }

    public Truncate() {
        this.Rows = []
        console.log(`Se vacio la tabla "${this.Name}"`);
    }

    public Delete(Where: Logics | Relational, env: Environment) {
        this.Rows.forEach((row: Node_table[]) => {
            const flag: Return = Where.execute_where(env, row)
            if (flag.value) {
                this.Rows.splice(this.Rows.indexOf(row), 1)
                console.log(`Se elimino una fila de la tabla "${this.Name}"`);
            }
        })
    }
}

interface node_toInsert {
    0: string
    1: Return
}1