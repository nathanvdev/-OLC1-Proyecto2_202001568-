import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class TOUpper extends Expression {
    private expression: Expression
    constructor(exp: Expression) {
        super()
        this.expression = exp;
    }


    public execute(env: Environment): Return {

        const valor = this.expression.execute(env);
        let varMay = '';

        if (valor != null || valor != undefined) {

            if (valor.type == Type_dxnry.STRING) {
                varMay = valor.value.toUpperCase();
                return { value: varMay, type: Type_dxnry.STRING }
            } else {
                console.log("no se ingreso una cadena");
            }
        }

        return { value: null, type: Type_dxnry.NULL };
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoUpper${id.toString()}`;
        let rama = '';
 
        rama += `${nodo}[label="ToUpper"];\n`;
        
        const codigoast: {rama: string, nodo: string} = this.expression.GetDOT();
        rama += codigoast.rama;
 
        rama += `${nodo} -> ${codigoast.nodo}\n`
        
 
        return{rama: rama, nodo: nodo};
     }

}