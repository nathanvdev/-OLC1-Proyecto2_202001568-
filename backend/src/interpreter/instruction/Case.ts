import { outs } from "../../out/out.js";
import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import Relational from "../expression/Relational.js";

export default class Case extends Instruction {
    private expression: Expression | null
    private Cases: Expression[]
    private Default: Instruction | null
    private a_s: Expression | null

    constructor(expression: Expression, Cases: [], Default: Instruction | null, a_s: Expression | null) {
        super()
        this.expression = expression
        this.Cases = Cases
        this.Default = Default
        this.a_s = a_s
    }

    public execute(env: Environment) {
        let result = this.Default?.execute(env)
        if (this.expression != null) {
            for (const Case of this.Cases) {
                if (Case[0].execute(env).value == true) {
                   result = Case[1].execute(env)
                   break
                    
                }else if (Case[0].execute(env).value == this.expression.execute(env).value) {
                    result = Case[1].execute(env)
                    break
                 }
            }
        }else{
            for (const Case of this.Cases) {
                if (Case[0].execute(env).value == true) {
                   result = Case[1].execute(env)
                   break
                }
           }
        }
        if (this.a_s) {
            if (typeof this.a_s === 'string') {
                console.log("" + this.a_s+ " " + result.value)
                outs.push("" + this.a_s+ " " + result.value)
            }else{
                console.log("" + this.a_s.execute(env)+ " " + result.value)
                outs.push("" + this.a_s.execute(env).value+ " " + result.value)
            }
        }else{
            console.log(result.value)
            outs.push(result.value)
        }
        
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoCase${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Case"];\n`

        if (this.expression != null) {
            const codigorama: { rama: string; nodo: string; } = this.expression.GetDOT()
            rama += codigorama.rama;
            rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`
            
        }

        return{rama: rama, nodo: NodoPrincipal};
    }


}