import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";


export default class ReturnExpression extends Expression {
    private value: Expression
    private tipodereturn: Type_dxnry

    constructor(value: Expression, tipodereturn: Type_dxnry) {
        super();
        this.value = value;
        this.tipodereturn = tipodereturn;
    }

    public execute(env: Environment): Return {

        if (this.value != null && this.value != undefined) {

            if (this.tipodereturn == Type_dxnry.RETURN) {
                const value = this.value.execute(env);

                return { value: value.value, type: Type_dxnry.RETURN }

            } else if (this.tipodereturn == Type_dxnry.BREAK) {

                return { value: null, type: Type_dxnry.BREAK };

            } else if (this.tipodereturn == Type_dxnry.CONTINUE) {

                return { value: null, type: Type_dxnry.CONTINUE };

            }

        }
        return { value: null, type: Type_dxnry.RETURN }
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //generar el nombre del nodo
        const nodo = `nodoReturn${id.toString()}`;
        let rama = ''

        if (this.tipodereturn == Type_dxnry.RETURN) {

            rama += `${nodo}[label="Return"];\n`

        } else if (this.tipodereturn == Type_dxnry.BREAK) {

            rama += `${nodo}[label="Break"];\n`

        } else if (this.tipodereturn == Type_dxnry.CONTINUE) {

            rama += `${nodo}[label="Continue"];\n`

        }


        return { rama: rama, nodo: nodo };
    }


}