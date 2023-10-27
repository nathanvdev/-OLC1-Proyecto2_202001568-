import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class TypeOf extends Expression {
    private expression: Expression
    constructor(exp: Expression) {
        super()
        this.expression = exp;
    }


    public execute(env: Environment): Return {

        const valor = this.expression.execute(env);
        let tipo = '';

        if (valor != null || valor != undefined) {

            if (valor.type == Type_dxnry.STRING) {
                tipo = "string";
                return { value: tipo, type: Type_dxnry.STRING };

            } else if (valor.type == Type_dxnry.INT) {
                tipo = "int";
                return { value: tipo, type: Type_dxnry.STRING };

            } else if (valor.type == Type_dxnry.DOUBLE) {
                tipo = "double";
                return { value: tipo, type: Type_dxnry.STRING };

            } else if (valor.type == Type_dxnry.BOOLEAN) {
                tipo = "boolean";
                return { value: tipo, type: Type_dxnry.STRING };

            } else {
                console.log("no se ingreso una cadena");
            }
        }

        return { value: null, type: Type_dxnry.NULL };

    }




}