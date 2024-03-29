import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import Instruction from "../abstrac/Instruction.js"
import { Type_dxnry } from "../abstrac/Return.js"

export default class CallFunction extends Instruction {
    private id: string
    private Params: Array<Expression>

    constructor(id: string, params: Array<Expression>) {
        super()
        this.id = id
        this.Params = params
    }

    public execute(env: Environment): any {

        const funcion = env.getFuncion(this.id);

        if (funcion == null) {
            console.log("Error: No existe la funcion: " + this.id);
            return
        }

        const envFUNC = new Environment(env.getGlobal(), this.id);

        if (funcion.params.length == this.Params.length) {

            for (let i = 0; i < funcion.params.length; i++) {

                const valor = this.Params[i].execute(env);
                const param = funcion.params[i].execute(env);

                if (valor.type == param.type) {
                    envFUNC.Save(param.value, valor.value, valor.type);
                } else {
                    console.log("Error: el parametro: " + param.value + " no es del tipo: " + valor.type);
                }

            }
            //Aqui ejecutamos todo lo que esta dentro de la funcion y ademas se crea el nuevo entorno en la clase statement
            const element = funcion.statement.execute(envFUNC, this.id);
            const tipo_funcion = funcion.type;

            if (element != null || element != undefined) {
                if (element.type == Type_dxnry.RETURN) {
                    if (tipo_funcion == Type_dxnry.INT) {
                        element.type = Type_dxnry.INT;

                    } else if (tipo_funcion == Type_dxnry.DOUBLE) {
                        element.type = Type_dxnry.DOUBLE

                    } else if (tipo_funcion == Type_dxnry.BOOLEAN) {
                        element.type = Type_dxnry.BOOLEAN

                    } else if (tipo_funcion == Type_dxnry.STRING) {
                        element.type = Type_dxnry.STRING
                        
                    } else if (tipo_funcion == Type_dxnry.NULL) {
                        return null;
                    }
                    console.log("aqui"+element.value);
                    return element;
                    
                }
            }


        } else {
            console.log("Error: No existe la funcion: " + this.id);
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