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
                    }
                }

            } catch (e) {
                console.log("Error al ejecutar instrucciones")
            }

        }
        return null

    }


}