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
}