import Instruction from "../../abstrac/Instruction.js";

export default class dml_Delete extends Instruction{
    private Table_name: string
    private Where: any
    constructor(table_name: string, where: any) {
        super()
        this.Table_name = table_name
        this.Where = where
    }
    public execute(env: any) {
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }
        Table.Delete(this.Where, env)
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoDelete${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Delete"];\n`
        const codigorama: { rama: string; nodo: string; } = this.Where.GetDOT()
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return{rama: rama, nodo: NodoPrincipal};
    }
}