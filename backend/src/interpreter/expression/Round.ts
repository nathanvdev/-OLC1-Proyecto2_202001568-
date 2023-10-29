import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";
import Primitive from "./primitives.js";

export default class Round extends Expression {
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
                    const num = this.cant.execute(env)
                    integer = valor.value.toFixed(num.value)
                } else {
                    integer = Math.round(valor.value);
                }
                return { value: integer, type: Type_dxnry.INT }
            } else {
                console.log("no se ingreso un double o int");
            }
        }
        return { value: null, type: Type_dxnry.NULL };
    }

    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoRound${id.toString()}`;
        let rama = '';

        rama += `${nodo}[label="Round"];\n`;
        
        const codigoast: {rama: string, nodo: string} = this.expression.GetDOT();
        rama += codigoast.rama;

        rama += `${nodo} -> ${codigoast.nodo}\n`
        

        return{rama: rama, nodo: nodo};
    }


}