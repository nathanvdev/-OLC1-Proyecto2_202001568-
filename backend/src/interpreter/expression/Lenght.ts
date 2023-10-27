import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class Lenght extends Expression {
    private expression: Expression
    constructor(exp: Expression) {
        super()
        this.expression = exp;
    }


    public execute(env: Environment): Return {

        const valor = this.expression.execute(env);
        let nuevo: number;

        if (valor != null || valor != undefined) {
            if (valor.type == Type_dxnry.STRING) {
                nuevo = valor.value.toString().length;
                return { value: nuevo, type: Type_dxnry.INT };
            }
        }
        return { value: null, type: Type_dxnry.NULL };
    }

}