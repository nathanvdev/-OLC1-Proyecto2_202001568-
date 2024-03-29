import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";
import Logics from "../../expression/Logics.js";
import Relational from "../../expression/Relational.js";

export default class dml_Update extends Instruction {
    private Table_name: string
    private Columns: [][]
    private Where: Logics | Relational

    constructor(table_name: string, columns: [], where: Logics | Relational) {
        super()
        this.Table_name = table_name
        this.Columns = columns
        this.Where = where
    }

    public execute(env: Environment) {
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }
        Table.Update(this.Columns, this.Where, env)

    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoUpdate${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Update"];\n`
        const codigorama: { rama: string; nodo: string; } = this.Where.GetDOT()
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return { rama: rama, nodo: NodoPrincipal };
    }

}