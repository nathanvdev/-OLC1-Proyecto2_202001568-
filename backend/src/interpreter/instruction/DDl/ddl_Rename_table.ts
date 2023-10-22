import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";

export default class ddl_Rename_table extends Instruction{
    private Table_name: string
    private New_name: string

    constructor(table_name: string, new_name: string) {
        super()
        this.Table_name = table_name
        this.New_name = new_name
    }

    public execute(env:Environment){
        let Table = env.FindTable(this.Table_name)
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }

        env.Rename_table(this.Table_name, this.New_name)
    }
        

}