import Expression from "../abstrac/Expression.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Environment from "../abstrac/Environment.js";

export default class Param extends Expression{
    private id: string
    private type: Type_dxnry

    constructor(id: string, type: Type_dxnry){
        super()
        this.id = id
        this.type = type
    }

    public execute(env: Environment){
        return { value: this.id, type: this.type};
    }

    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodoParametros${id.toString()}`;
        let rama = `${nodo}[label=${this.id}];\n`;


        return{rama: rama, nodo: nodo};
    }

}