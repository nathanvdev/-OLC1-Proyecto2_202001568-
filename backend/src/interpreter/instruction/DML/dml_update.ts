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
        console.log()
        Table.Update(this.Columns, this.Where, env)
        console.log()

    }

}