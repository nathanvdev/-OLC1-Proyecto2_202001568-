import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Statement from "./Statement.js";

export default class Ffunction extends Instruction{
    private id: string
    public params: Array<Expression>
    public type: Type_dxnry 
    public statement: Statement

    constructor(id: string, params: Array<Expression>, type:Type_dxnry, statement: Statement){
        super()
        this.id = id
        this.params = params
        this.type = type
        this.statement = statement
    }

    public execute(env: Environment){
        env.SaveFunction(this.id, this)
    }
}