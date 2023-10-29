import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";

export default class CallProcedure extends Instruction {
    private id: string
    private Params: Array<Expression>

    constructor(id: string, params: Array<Expression>) {
        super()
        this.id = id
        this.Params = params
    }
    
    
    public execute(env: Environment) {
        const Proc = env.getProcedure(this.id);
        if (Proc == null) {
            console.log("Error: No existe la funcion: " + this.id);
            return
        }

        const envGl = new Environment(env.getGlobal(), "Global");

        if (Proc.params.length == this.Params.length) {
            for (let i = 0; i < Proc.params.length; i++) {

                const valor = this.Params[i].execute(env);
                const param = Proc.params[i].execute(env);

                if (valor.type == param.type) {
                    envGl.Save(param.value, valor.value, valor.type);
                } else {
                    console.log("Error: el parametro: " + param.value + " no es del tipo: " + valor.type);
                }
            }

            const element = Proc.statement.execute(envGl, this.id);

            if (element != null || element != undefined) {
                if (element.type == Type_dxnry.RETURN) {
                    return element;
                } 
            }
        }
        
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //generamos un id
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero a nodoname
        const NodoPrincipal = `nodoFuncion${id.toString()}`;
        const nodoid = `nodoId${id.toString()}`;
        const nodopar = `nodoPar${id.toString()}`
        
        let rama = `${NodoPrincipal}[label="Funcion"];\n`

        rama+= `${nodoid}[label="${this.id}"];\n`

        rama += `${nodopar}[label="Parametros"];\n`
        for(let i = 0; i < this.Params.length; i++){
            const para: { rama: string; nodo: string;} = this.Params[i].GetDOT();
            rama += para.rama;
            rama += `${nodopar} -> ${para.nodo}\n`
        }

        rama += `${NodoPrincipal} -> ${nodoid};\n`
        rama += `${NodoPrincipal} -> ${nodopar};\n`
        
        return{rama: rama, nodo: NodoPrincipal};
    }

}