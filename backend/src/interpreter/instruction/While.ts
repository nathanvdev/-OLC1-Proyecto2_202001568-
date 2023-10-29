import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Statement from "./Statement.js";

export default class While extends Instruction{
    private condition: Expression | null
    private codeWhile: Statement

    constructor(condition: Expression, codeWhile: Statement){
        super()
        this.condition = condition
        this.codeWhile = codeWhile
    }

    public execute(env: Environment){

        let contador = 0;
        while(true){
            
            const condicion = this.condition.execute(env);
            if(condicion != null && condicion != undefined){

                if(!condicion.value){
                    break;
                }
            }

            // ejecutar codigo
            const response = this.codeWhile.execute(env, " While")
            if( contador > 150){
                console.log("Error: bucle infinito while");
                break;
            }

            if (response != null || response!= undefined){
                if(response.type == Type_dxnry.BREAK){
                    break;
                }else if(response.type == Type_dxnry.CONTINUE){
                    continue;
                } else if (response.type == Type_dxnry.RETURN) {
                    return response;
                }
            }

            contador++;

        }
    }

    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodowhile${id.toString()}`;

        let rama = '';

        const codecondicion: {rama: string, nodo: string} = this.condition.GetDOT();
        rama += codecondicion.rama;
        const code: {rama: string, nodo: string} = this.codeWhile.GetDOT();
        rama += code.rama;

        rama += `${nodo}[label="WHILE"];\n`;
        rama += `${nodo} -> ${codecondicion.nodo};\n`;
        rama += `${nodo} -> ${code.nodo};\n`;


        return{rama: rama, nodo: nodo};
    }
}