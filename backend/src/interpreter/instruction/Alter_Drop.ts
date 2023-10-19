import Environment from "../abstrac/Environment.js"
import Instruction from "../abstrac/Instruction.js"


export default class Alter_Drop extends Instruction {
    private Table_name: string
    private Column_name: string


    constructor(Table_name: string, Column_name: string, Line: number, Column: number) {
        super(Line, Column)
        this.Table_name = Table_name
        this.Column_name = Column_name

    }

    public execute(env:Environment): any {
        env.Alter_Drop(this.Table_name, this.Column_name)
    }

}