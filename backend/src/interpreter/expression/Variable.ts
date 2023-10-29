import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";

export default class Variable extends Expression{

    private id: string

    constructor(id: string){
        super()
        this.id = id
    }

    public execute(env: Environment): any {
        return env.getVariable(this.id.toLowerCase())
    }

    public GetDOT(): { rama: string; nodo: string; } {

        

        const id = Math.floor(Math.random() * (100-0)+0);
        const nodo = `nodoAcces${id.toString().replace('@','')}`;
        let  rama = `${nodo}[label="Acceder"];\n`
        //const codigorama: { rama: string; nodo: string; } = this.var.arbol();
        //rama += codigorama.rama;  
        rama += `${nodo}Variable[label="${this.id.toString().replace('@','') }"]\n;`
        //rama += `${nodo}Primitivo[label="${this.var.toString()}"]\n;` 


        rama += `${nodo} -> ${nodo}Variable;\n`;
        //rama += `${nodo}Variable -> ${nodo}Primitivo;\n`;

        return { rama: rama, nodo: nodo}

    }
}