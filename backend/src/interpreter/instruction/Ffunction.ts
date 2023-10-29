import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Statement from "./Statement.js";

export default class Ffunction extends Instruction{
    private id: string
    public params: Array<Expression>
    public type: Type_dxnry 
    public statement: Statement

    constructor(id: string, params: Array<Expression>, type:Type_dxnry, statement: Statement){
        super()
        this.id = id
        this.params = params
        this.type = type
        this.statement = statement
    }

    public execute(env: Environment){
        env.SaveFunction(this.id, this)
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
        for(let i = 0; i < this.params.length; i++){
            const para: { rama: string; nodo: string;} = this.params[i].GetDOT();
            rama += para.rama;
            rama += `${nodopar} -> ${para.nodo}\n`
        }

        const code: {rama: string, nodo: string} = this.statement.GetDOT();
        rama += code.rama;

        
        rama += `${NodoPrincipal} -> ${nodoid};\n`
        rama += `${NodoPrincipal} -> ${nodopar};\n`
        rama += `${NodoPrincipal} -> ${code.nodo};\n`


        return{rama: rama, nodo: NodoPrincipal};
    }
}