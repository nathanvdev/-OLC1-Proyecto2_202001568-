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
            const element = this.codeWhile.execute(env, env.nombre+" While")
            if( contador > 150){
                console.log("Error: bucle infinito while");
                break;
            }

            if (element != null || element!= undefined){
                if(element.type == Type_dxnry.RETURN){
                    return element; 

                }else if(element.type == Type_dxnry.BREAK){
                    console.log("el break");
                    break;

                }else if(element.type == Type_dxnry.CONTINUE){
                    continue;

                }
            }

            contador++;


        }


    }
}