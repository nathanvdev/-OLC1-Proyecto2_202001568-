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

    private DotID(id_in: string): { rama: string, nodo: string } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        const nodo = `nodoID${id.toString()}`;
        let rama = `${nodo}[label="${id_in}"];\n`
        return { rama: rama, nodo: nodo }
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //id unico
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //generar el nombre del nodo
        const nodo = `nodolog${id.toString()}`;

        let rama = ``
        switch (this.operator) {

            case "==":
                rama += `${nodo}[label="=="];\n`
                let codeop1
                if (typeof this.izq === 'string') {
                    codeop1 = this.DotID(this.izq)
                } else {
                    codeop1 = this.izq.GetDOT();
                }
                let codeop2
                if (typeof this.der === 'string') {
                    codeop2 = this.DotID(this.der)
                } else {
                    codeop2 = this.der.GetDOT();
                }
                rama += codeop1.rama;
                rama += codeop2.rama;

                rama += `${nodo} -> ${codeop1.nodo};\n`;
                rama += `${nodo} -> ${codeop2.nodo};\n`;

                break;
            case "!=":
                rama += `${nodo}[label="!="];\n`;
                let codeop3
                if (typeof this.izq === 'string') {
                    codeop3 = this.DotID(this.izq)
                } else {
                    codeop3 = this.izq.GetDOT();
                }
                let codeop4
                if (typeof this.der === 'string') {
                    codeop4 = this.DotID(this.der)
                } else {
                    codeop4 = this.der.GetDOT();
                }
                rama += codeop3.rama;
                rama += codeop4.rama;

                rama += `${nodo} -> ${codeop3.nodo};\n`;
                rama += `${nodo} -> ${codeop4.nodo};\n`;
                break;
            case "<":
                rama += `${nodo}[label="<"];\n`;
                let codeop5
                if (typeof this.izq === 'string') {
                    codeop5 = this.DotID(this.izq)
                } else {
                    codeop5 = this.izq.GetDOT();
                }
                let codeop6
                if (typeof this.der === 'string') {
                    codeop6 = this.DotID(this.der)
                } else {
                    codeop6 = this.der.GetDOT();
                }
                rama += codeop5.rama;
                rama += codeop6.rama;

                rama += `${nodo} -> ${codeop5.nodo};\n`;
                rama += `${nodo} -> ${codeop6.nodo};\n`;
                break;
            case "<=":
                rama += `${nodo}[label="<="];\n`;
                let codeop7
                if (typeof this.izq === 'string') {
                    codeop7 = this.DotID(this.izq)
                } else {
                    codeop7 = this.izq.GetDOT();
                }
                let codeop8
                if (typeof this.der === 'string') {
                    codeop8 = this.DotID(this.der)
                } else {
                    codeop8 = this.der.GetDOT();
                }
                rama += codeop7.rama;
                rama += codeop8.rama;

                rama += `${nodo} -> ${codeop7.nodo};\n`;
                rama += `${nodo} -> ${codeop8.nodo};\n`;
                break;
            case ">":
                rama += `${nodo}[label=">"];\n`;
                let codeop9
                if (typeof this.izq === 'string') {
                    codeop9 = this.DotID(this.izq)
                } else {
                    codeop9 = this.izq.GetDOT();
                }
                let codeop10
                if (typeof this.der === 'string') {
                    codeop10 = this.DotID(this.der)
                } else {
                    codeop10 = this.der.GetDOT();
                }
                rama += codeop9.rama;
                rama += codeop10.rama;

                rama += `${nodo} -> ${codeop9.nodo};\n`;
                rama += `${nodo} -> ${codeop10.nodo};\n`;
                break;
            case ">=":
                rama += `${nodo}[label=">="];\n`;

                let codeop11
                if (typeof this.izq === 'string') {
                    codeop11 = this.DotID(this.izq)
                } else {
                    codeop11 = this.izq.GetDOT();
                }
                let codeop12
                if (typeof this.der === 'string') {
                    codeop12 = this.DotID(this.der)
                } else {
                    codeop12 = this.der.GetDOT();
                }


                rama += codeop11.rama;
                rama += codeop12.rama;

                rama += `${nodo} -> ${codeop11.nodo};\n`;
                rama += `${nodo} -> ${codeop12.nodo};\n`;
                break;
            default:

        }

        return { rama: rama, nodo: nodo };

    }
}