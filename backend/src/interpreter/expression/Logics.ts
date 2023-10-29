import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";
import { Node_table } from "../abstrac/Table_SQL.js";
import Relational from "./Relational.js";
import Primitive from "./primitives.js";

export default class Logics extends Expression {
    public izq: Expression
    public operator: string
    public der: Expression
    constructor(izq: Expression, operator: string, der: Expression) {
        super();
        this.izq = izq
        this.operator = operator;
        this.der = der
    }

    public execute(env: Environment): Return {
        const op1 = this.izq.execute(env)
        const op2 = this.der.execute(env)

        if (op1.type == Type_dxnry.BOOLEAN && op2.type == Type_dxnry.BOOLEAN) {
            switch (this.operator) {
                case "AND":
                    return { value: op1.value && op2.value, type: Type_dxnry.BOOLEAN };
                case "OR":
                    return { value: op1.value || op2.value, type: Type_dxnry.BOOLEAN };
                case "NOT":
                    return { value: !op1.value, type: Type_dxnry.BOOLEAN };
                default:
                    return { value: null, type: Type_dxnry.NULL };
            }
        } else {
            return { value: null, type: Type_dxnry.NULL };
        }


    }


    public execute_where(env: Environment, row: Node_table[]): Return {
        const izq = this.izq as Relational | Logics;
        const der = this.der as Relational | Logics; 

        const result1 = izq.execute_where(env, row)
        const result2 = der.execute_where(env, row)

        const tmp1 = new Primitive(result1.value, result1.type)
        const tmp2 = new Primitive(result2.value, result2.type)

        const result = new Logics(tmp1, this.operator, tmp2).execute(env)
        return { value: result.value, type: Type_dxnry.BOOLEAN };
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodolog${id.toString()}`;

        let rama = ``
        switch(this.operator){

           case "OR":
               rama+= `${nodo}[label="||"];\n`
               const codeop1: { rama: string; nodo: string; } = this.izq.GetDOT();
               const codeop2: { rama: string; nodo: string; } = this.der.GetDOT();
               rama += codeop1.rama;
               rama += codeop2.rama;

               rama += `${nodo} -> ${codeop1.nodo};\n`;
               rama += `${nodo} -> ${codeop2.nodo};\n`;  

               break;
           case "AND":
               rama+= `${nodo}[label="&&"];\n`;
               const codeop3: { rama: string; nodo: string; } = this.izq.GetDOT();
               const codeop4: { rama: string; nodo: string; } = this.der.GetDOT();
               rama += codeop3.rama;
               rama += codeop4.rama;

               rama += `${nodo} -> ${codeop3.nodo};\n`;
               rama += `${nodo} -> ${codeop4.nodo};\n`;  
               break;
           case "NOT":
               rama+= `${nodo}[label="!"];\n`;
               const codeop5: { rama: string; nodo: string; } = this.izq.GetDOT();
               const codeop6: { rama: string; nodo: string; } = this.der.GetDOT();
               rama += codeop5.rama;
               rama += codeop6.rama;

               rama += `${nodo} -> ${codeop5.nodo};\n`;
               rama += `${nodo} -> ${codeop6.nodo};\n`;  
               break;
           default:
               
       }

       return{rama: rama, nodo:nodo};
   }
}