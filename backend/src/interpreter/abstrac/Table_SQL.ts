import Primitive from "../expression/primitives.js"
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

    public getType(): number {
        return this.Content.type
    }

    public setValue(value_in: Return) {
        if (this.Content.type == value_in.type) {
            this.Content = value_in
            
        }else{
            console.log(`El tipo de dato no coincide con el tipo de la columna "${this.Column_name}"`)
        }

    }

    public DeleteColumn() {
        this.Column_name = "null"
        this.Content = { value: null, type: 0 }
    }

    public RenameColumn(new_name: string) {
        this.Column_name = new_name
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
                this.Headers[i].DeleteColumn();
                console.log(`Se elimino la columna "${column_name}" de la tabla "${this.Name}"`);
                return;
            }
        }
        console.log(`La columna "${column_name}" no existe en la tabla "${this.Name}"`);
    }

    public Rename_table(new_name: string) {
        this.Name = new_name
    }

    public Rename_column(column_name: string, new_name: string) {
        for (let i = 0; i < this.Headers.length; i++) {
            if (this.Headers[i].getColumnName() == column_name) {
                this.Headers[i].RenameColumn(new_name);
                console.log(`Se renombro la columna "${column_name}" a "${new_name}" en la tabla "${this.Name}"`);
                return;
            }
        }
        console.log(`La columna "${column_name}" no existe en la tabla "${this.Name}"`);
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
            newRow.forEach((tmp_node:Node_table)=>{
                if (insert[0]==tmp_node.getColumnName()) {
                    tmp_node.setValue(insert[1])
                }
            })
        });

        this.Rows.push(newRow)
        console.log(`Se inserto una nueva fila en la tabla "${this.Name}"`);
    }

}

interface node_toInsert {
    0: string;
    1: Return;
}