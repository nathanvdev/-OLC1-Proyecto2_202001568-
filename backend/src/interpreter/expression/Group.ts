import Expression from "../abstrac/Expression.js";

export default class Group extends Expression{
    private expr: Expression

    constructor(expr: Expression){
        super()
        this.expr = expr
    }

    public execute(env: any) {
        return this.expr.execute(env)
    }
}