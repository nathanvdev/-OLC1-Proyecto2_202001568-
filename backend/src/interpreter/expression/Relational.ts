import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class Relational extends Expression {
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

        switch (this.operator) {
            case "=":
                return { value: op1.value == op2.value, type: Type_dxnry.BOOLEAN };
            case "!=":
                return { value: op1.value != op2.value, type: Type_dxnry.BOOLEAN };
            case "<":
                return { value: op1.value < op2.value, type: Type_dxnry.BOOLEAN };
            case ">":
                return { value: op1.value > op2.value, type: Type_dxnry.BOOLEAN };
            case "<=":
                return { value: op1.value <= op2.value, type: Type_dxnry.BOOLEAN };
            case ">=":
                return { value: op1.value >= op2.value, type: Type_dxnry.BOOLEAN };
            default:
                return { value: null, type: Type_dxnry.NULL };
        }
    }
}