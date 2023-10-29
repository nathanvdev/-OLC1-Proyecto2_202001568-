import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Statement from "./Statement.js";

export default class If extends Instruction{
    private condition: Expression
    private codeIf: Statement
    private codeElse: Statement

    constructor(condition: Expression, codeIf: Statement, codeElse: Statement){
        super()
        this.condition = condition
        this.codeIf = codeIf
        this.codeElse = codeElse
    }
    
    public execute(env: Environment) {
        const condicion = this.condition.execute(env);
        if (condicion.type == Type_dxnry.BOOLEAN) {
            if (condicion.value) {
                const element = this.codeIf.execute(env, env.nombre + " If");

                if (element != null || element != undefined) {

                    if (element.type == Type_dxnry.BREAK) {
                        return element;
                        
                    } else if (element.type == Type_dxnry.CONTINUE) {
                        return element;

                    } else if (element.type == Type_dxnry.RETURN) {
                        return element;
                    }
                }

            } else {
                if (this.codeElse != null) {
                    const element2 = this.codeElse.execute(env, env.nombre + " Else");
                    if (element2 != null || element2 != undefined) {
                        if (element2.type == Type_dxnry.BREAK) {
                            return element2;

                        } else if (element2.type == Type_dxnry.CONTINUE) {
                            return element2;

                        }
                    }

                }

            }

        }

    }

    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //generar el nombre del nodo
        const nodo = `nodoif${id.toString()}`;

        let rama = '';

        const codecondicion: { rama: string, nodo: string } = this.condition.GetDOT();
        rama += codecondicion.rama;
        const codeif: { rama: string, nodo: string } = this.codeIf.GetDOT();
        console.log(codeif);
        rama += codeif.rama;
        if (this.codeElse != null) {
            const codeelse: { rama: string, nodo: string } = this.codeElse.GetDOT();
            rama += codeelse.rama;
            rama += `${nodo} -> ${codeelse.nodo};\n`
        }

        rama += `${nodo}[label="IF"];\n`;
        rama += `${nodo} -> ${codecondicion.nodo};\n`;
        rama += `${nodo} -> ${codeif.nodo};\n`;




        return { rama: rama, nodo: nodo };
    }
}