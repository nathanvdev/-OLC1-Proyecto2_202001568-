import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";

export class ddl_Drop_Column extends Instruction{
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

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoDropColumn ${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Drop Column"];\n`
        return{rama: rama, nodo: NodoPrincipal};
    }
}

export class ddl_Drop_Table extends Instruction{
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

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoDropTable ${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Drop Table"];\n`
        return{rama: rama, nodo: NodoPrincipal};
    }
}