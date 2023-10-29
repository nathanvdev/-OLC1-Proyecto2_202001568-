import Environment from "../abstrac/Environment.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";

export default class Statement {
    private body: Array<Instruction>
    constructor(body: Array<Instruction>) {
        this.body = body
    }


    public execute(env: Environment, id: string) {
        const newEntorno = new Environment(env, id)

        for (const instrucciones of this.body) {
            try {
                const ret = instrucciones.execute(newEntorno)

                // si la instruccion es tipo break/continuo devuelve el objeto
                if(ret != null && ret != undefined){
                    if (ret.type == Type_dxnry.BREAK) {
                        break;
                    } else if (ret.type == Type_dxnry.CONTINUE) {
                        break;
                    } else if (ret.type == Type_dxnry.RETURN) {
                        return ret;
                    }
                }

            } catch (e) {
                console.log("Error al ejecutar instrucciones")
            }

        }
        return null
    }
 
    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `instrucciones${id.toString()}`;
        
        let rama = '';
        rama += `${nodo}[label="Instrucciones"];\n`
        for(const instrucciones of this.body){
            const instruc = instrucciones.GetDOT();
            rama += `${instruc.rama}\n`;
            rama += `${nodo} -> ${instruc.nodo}\n`;
        }
    

        return{rama: rama, nodo: nodo};
    }



}