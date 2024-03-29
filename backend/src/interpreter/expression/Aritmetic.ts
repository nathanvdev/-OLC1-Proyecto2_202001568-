import { Div_table, Mod_table, Neg_table, Res_table, Sum_table, Mul_table } from "../abstrac/Aritmetic_tables.js"
import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import { Return, Type_dxnry } from "../abstrac/Return.js"

export default class Aritmertic extends Expression {
  private izq: Expression
  private operator: string
  private der: Expression

  constructor(izq: Expression, operator: string, der: Expression) {
    super()
    this.izq = izq
    this.operator = operator
    this.der = der
  }

  public execute(env: Environment): Return {
    let op1: Return
    let op2: Return
    if (typeof this.izq === 'string') {
      op1 = env.getVariable(this.izq)
    } else {
      op1 = this.izq.execute(env)
    }
    if (typeof this.der === 'string') {
      op2 = env.getVariable(this.der)
    } else {
      op2 = this.der.execute(env)
    }

    switch (this.operator) {
      case "+":
        let result = this.Sum(op1, op2)
        return result

      case "-":
        let result2 = this.Res(op1, op2)
        return result2

      case "/":
        let result3 = this.Div(op1, op2)
        return result3

      case "*":
        let result6 = this.Mul(op1, op2)
        return result6

      case "%":
        let result4 = this.Mod(op1, op2)
        return result4

      case "!":
        let result5 = this.Neg(op1, op2)
        return result5

      default:
        break
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
    const nodo = `nodoArit${id.toString()}`;
    let rama = ''
    if (this.operator == "+") {
      rama += `${nodo}[label="+"];\n`;
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

    } else if (this.operator == "-") {
      rama += `${nodo}[label="-"];\n`;
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

    } else if (this.operator == "umenos") {
      rama += `${nodo}[label="-"];\n`;
      let codeop1
      if (typeof this.izq === 'string') {
        codeop1 = this.DotID(this.izq)
      } else {
        codeop1 = this.izq.GetDOT();
      }
      rama += codeop1.rama;

      rama += `${nodo} -> ${codeop1.nodo};\n`;

    } else if (this.operator == "*") {
      rama += `${nodo}[label="*"];\n`;
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

    } else if (this.operator == "/") {
      rama += `${nodo}[label="/"];\n`;
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
    } else if (this.operator == "^") {
      rama += `${nodo}[label="^"];\n`;
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

    } else if (this.operator == "%") {
      rama += `${nodo}[label="%"];\n`;
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
    }

    return { rama: rama, nodo: nodo };

  }


  private Sum(op1, op2): Return {
    const Result_type: Type_dxnry = Sum_table[op1.type][op2.type]

    switch (Result_type) {

      case Type_dxnry.INT:
        if (op1.type == Type_dxnry.STRING) {
          op1.value = parseInt(op1.value)

        }
        if (op2.type == Type_dxnry.STRING) {
          op2.value = parseInt(op2.value)

        }
        return { value: parseInt(op1.value) + parseInt(op2.value), type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        if (op1.type == Type_dxnry.STRING) {
          op1.value = parseInt(op1.value)
        }
        if (op2.type == Type_dxnry.STRING) {
          op2.value = parseInt(op2.value)
        }
        return { value: parseFloat(op1.value) + parseFloat(op2.value), type: Type_dxnry.DOUBLE }

      case Type_dxnry.DATE:
        let date: Date
        let to_add: number
        if (op1.type == Type_dxnry.DATE) {
          date = new Date(op1.value)
          to_add = parseInt(op2.value)

        } else if (op2.type == Type_dxnry.DATE) {
          date = new Date(op2.value)
          to_add = parseInt(op1.value)

        } else if (op1.type = Type_dxnry.STRING) {
          to_add = parseInt(op1.value)

        } else if (op2.type = Type_dxnry.STRING) {
          to_add = parseInt(op2.value)
        }

        const result = date.setDate(date.getDate() + to_add)
        return { value: result, type: Type_dxnry.DATE }

      case Type_dxnry.STRING:
        return { value: op1.value + op2.value, type: Type_dxnry.STRING }

      default:
        return { value: null, type: Type_dxnry.NULL }
    }
  }

  private Res(op1, op2): Return {
    const Result_type: Type_dxnry = Res_table[op1.type][op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: op1.value - op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: op1.value - op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }

  private Div(op1, op2): Return {
    const Result_type: Type_dxnry = Div_table[op1.type][op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: op1.value / op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: op1.value / op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }
    }
  }

  private Mul(op1, op2): Return {
    const Result_type: Type_dxnry = Mul_table[op1.type][op2.type]

    switch (Result_type) {

      case Type_dxnry.INT:
        return { value: op1.value * op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: op1.value * op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }

  private Mod(op1, op2): Return {
    const Result_type: Type_dxnry = Mod_table[op1.type][op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: op1.value % op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: op1.value % op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }

  private Neg(op1, op2): Return {
    const Result_type: Type_dxnry = Neg_table[op1.type][0]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: -op1.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: -op1.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }


}
