import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";

export default class Variable extends Expression{

    private id: string

    constructor(id: string){
        super()
        this.id = id
    }

    public execute(env: Environment): any {
        return env.getVariable(this.id.toLowerCase())
    }
}