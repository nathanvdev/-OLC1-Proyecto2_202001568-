import Environment from "../../abstrac/Environment.js"
import Instruction from "../../abstrac/Instruction.js"
import Logics from "../../expression/Logics.js"
import Relational from "../../expression/Relational.js"

export class DML_Select extends Instruction {
    private Columns: string[]
    private Table_name: string

    constructor(columns: string[], table_name: string) {
        super()
        this.Columns = columns
        this.Table_name = table_name
    }

    public execute(env: Environment) {
        // let tmp = env.DML_Select(this.Columns, this.Table_name)
        // if(tmp == null){
        //     console.log(`La tabla "${this.Table_name}" no existe`)
        //     return
        // }
        // console.log(tmp)
    }
}

export class DML_Select_all extends Instruction{
    private Table_name: string

    constructor(table_name: string) {
        super()
        this.Table_name = table_name
    }

    public execute(env: Environment) {
        // let tmp = env.DML_Select_all(this.Table_name)
        // if(tmp == null){
        //     console.log(`La tabla "${this.Table_name}" no existe`)
        //     return
        // }
        // console.log(tmp)
    }
}

export class DML_Select_where extends Instruction{
    private columns: string[]
    private table_name: string
    private conditions: Relational | Logics

    constructor(columns: string[], table_name: string, conditions: any) {
        super()
        this.columns = columns
        this.table_name = table_name
        this.conditions = conditions
    }

    public execute(env: Environment) {
        // let result:[]|null = env.DML_Select_where(this.columns, this.table_name, this.conditions)
    }
}