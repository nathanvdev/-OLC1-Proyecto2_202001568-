import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class Logics extends Expression {
    private izq: Expression
    private operator: string
    private der: Expression
    constructor(izq: Expression, operator: string, der: Expression, line: number, column: number) {
        super(line, column);
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
        }else{
            return { value: null, type: Type_dxnry.NULL };
        }

        
    }
}