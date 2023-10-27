import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";
import Primitive from "./primitives.js";

export default class Truncate extends Expression {
    private expression: Expression
    private cant: Primitive | null
    constructor(exp: Expression, cant: Primitive | null) {
        super()
        this.expression = exp;
        this.cant = cant;
    }

    public execute(env: Environment): Return {

        const valor = this.expression.execute(env);
        let integer;

        if (valor != null || valor != undefined) {
            if (valor.type == Type_dxnry.DOUBLE || valor.type == Type_dxnry.INT) {
                if (this.cant) {
                    integer = this.truncateToDecimals(valor.value, this.cant.execute().value)
                }else{
                    integer = Math.floor(valor.value);
                }
                return { value: integer, type: Type_dxnry.INT }

            } else {
                console.log("no se ingreso un double o int");
            }
        }
        return { value: null, type: Type_dxnry.NULL };
    }

    private truncateToDecimals(number:number, decimals:number) {
        const factor = 10 ** decimals;
        return Math.trunc(number * factor) / factor;
      }

}