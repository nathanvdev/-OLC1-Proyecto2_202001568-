import Environment from "../abstrac/Environment.js"
import Instruction from "../abstrac/Instruction.js"


export default class Alter_Rename_column extends Instruction {
    private Table_name: string
    private Column_name: string
    private newColumn_name: string


    constructor(Table_name: string, Column_name: string, newColumn_name:string, Line: number, Column: number) {
        super(Line, Column)
        this.Table_name = Table_name
        this.Column_name = Column_name
        this.newColumn_name = newColumn_name

    }

    public execute(env:Environment): any {
        env.Alter_Rename_column(this.Table_name, this.Column_name, this.newColumn_name)
    }

}