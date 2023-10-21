import { Return, Type_dxnry } from "./Return.js"

export class Column_table {
    public id: string
    public type: Type_dxnry
    public rows: Return[]
    constructor(id: string, type: Type_dxnry) {
        this.id = id
        this.type = type
        this.rows = []
    }


}