import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";

export class Drop_Column extends Instruction{
    private Table_name: string
    private Column_name: string

    constructor(table_name: string, column_name: string) {
        super()
        this.Table_name = table_name
        this.Column_name = column_name
    }

    public execute(env: Environment){
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }

        Table.DeleteHeader(this.Column_name)
    }
}

export class Drop_Table extends Instruction{
    private Table_name: string

    constructor(table_name: string) {
        super()
        this.Table_name = table_name
    }

    public execute(env: Environment){
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }

        env.DeleteTable(this.Table_name)
    }
}