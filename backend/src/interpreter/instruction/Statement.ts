import Environment from "../abstrac/Environment.js";
import Instruction from "../abstrac/Instruction.js";

export default class Statement {


    constructor(private body: Array<Instruction>) {

    }


    public execute(env: Environment, id: string) {
        const newEntorno = new Environment(env, id)

        for (const instrucciones of this.body) {

            try {
                const ret = instrucciones.execute(newEntorno)

                // si la instruccion es tipo return deberia retornar el valor
                if (ret != null && ret != undefined) {
                    return ret
                }

            } catch (e) {
                console.log("Error al ejecutar instrucciones")
            }

        }
        return null

    }

}