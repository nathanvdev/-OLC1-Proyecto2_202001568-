import Environment from "../abstrac/Environment.js"
import Instruction from "../abstrac/Instruction.js"
import { Type_dxnry } from "../abstrac/Return.js"

export default class Alter_Add extends Instruction {
    private Table_name: string
    private Column_name: string
    private type: Type_dxnry

    constructor(Table_name: string, Column_name: string, type: Type_dxnry, Line: number, Column: number) {
        super(Line, Column)
        this.Table_name = Table_name
        this.Column_name = Column_name
        this.type = type
    }

    public execute(env:Environment): any {
        env.Alter_Add(this.Table_name, this.Column_name, this.type)
    }

}