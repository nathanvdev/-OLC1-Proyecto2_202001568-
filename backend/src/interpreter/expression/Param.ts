import Expression from "../abstrac/Expression.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Environment from "../abstrac/Environment.js";

export default class Param extends Expression{
    private id: string
    private type: Type_dxnry

    constructor(id: string, type: Type_dxnry){
        super()
        this.id = id
        this.type = type
    }

    public execute(env: Environment){
        return { value: this.id, type: this.type};
    }

}