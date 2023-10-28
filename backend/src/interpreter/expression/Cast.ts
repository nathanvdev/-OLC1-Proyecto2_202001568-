import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class Cast extends Expression{
    private exp: Expression
    private type: Type_dxnry

    constructor(exp: Expression, type: Type_dxnry) {
        super()
        this.exp = exp
        this.type = type
    }

    public execute(env: any):Return {
        let value:Return 
        if (typeof this.exp === 'string') {
            let tmp = env.getVariable(this.exp)
            value = tmp
        }else{
            value = this.exp.execute(env)
        }
        
        switch (this.type) {
            
            case Type_dxnry.INT:
                return { value: parseInt(value.value), type: Type_dxnry.INT }

            case Type_dxnry.DOUBLE:
                return { value: parseFloat(value.value), type: Type_dxnry.DOUBLE }

            case Type_dxnry.STRING:
                return { value: value.value.toString(), type: Type_dxnry.STRING }

            case Type_dxnry.BOOLEAN:
                return { value: Boolean(value.value), type: Type_dxnry.BOOLEAN }

            case Type_dxnry.DATE:
                let date: Date = new Date(value.value)
                date.setDate(date.getDate() +1)
                return { value: date, type: Type_dxnry.DATE }

            default:
                return { value: null, type: Type_dxnry.NULL }
        }
    }
}