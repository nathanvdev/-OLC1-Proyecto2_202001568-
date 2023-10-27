import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class ToLower extends Expression {
    private expression: Expression
    constructor(expression: Expression) {
        super()
        this.expression = expression
    }

    public execute(env: Environment): Return {

        const valor = this.expression.execute(env);
        let varMin = '';

        if (valor != null || valor != undefined) {

            if (valor.type == Type_dxnry.STRING) {
                varMin = valor.value.toLowerCase();
                return { value: varMin, type: Type_dxnry.STRING }
            } else {
                console.log("no se ingreso una cadena");
            }

        }

        return { value: null, type: Type_dxnry.NULL };

    }
}