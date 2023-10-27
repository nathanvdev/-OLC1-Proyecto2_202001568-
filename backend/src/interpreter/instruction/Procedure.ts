import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import Statement from "./Statement.js";

export default class Procedure extends Instruction{
    private id: string
    public params: Array<Expression>
    public statement: Statement

    constructor(id: string, params: Array<Expression>, statement: Statement){
        super()
        this.id = id
        this.params = params
        this.statement = statement
    }

    public execute(env: Environment) {
        env.SaveProcedure(this.id, this)
    }
}