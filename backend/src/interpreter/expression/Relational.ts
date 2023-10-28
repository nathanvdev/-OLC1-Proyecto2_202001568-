import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";
import { Node_table } from "../abstrac/Table_SQL.js";

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

    public execute_where(env: Environment, row: Node_table[]): Return {
        let result: Return = { value: false, type: Type_dxnry.BOOLEAN }
        for (const node of row) {
            const result1 = this.Verify(this.izq, "=", node.getColumnName())
            const result2 = this.Verify(node.getValue(), this.operator, this.der.execute(env).value)

            if (result1 && result2) {
                result = { value: true, type: Type_dxnry.BOOLEAN }
            }
        }
        return result
    }

    private Verify(izq: any, operator: string, der: any): boolean {
        switch (operator) {
            case "=":
                if (izq == der) {
                    return true
                } else {
                    return false
                }

            case "!=":
                if (izq != der) {
                    return true
                } else {
                    return false
                }
            case "<":
                if (izq < der) {
                    return true
                } else {
                    return false
                }
            case ">":
                if (izq > der) {
                    return true
                } else {
                    return false
                }
            case "<=":
                if (izq <= der) {
                    return true
                } else {
                    return false
                }
            case ">=":
                if (izq >= der) {
                    return true
                } else {
                    return false
                }
            default:
                return false
        }
    }
}