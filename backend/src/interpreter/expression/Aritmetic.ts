import { Div_table, Mod_table, Neg_table, Res_table, Sum_table } from "../abstrac/Aritmetic_tables.js"
import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import { Return, Type_dxnry } from "../abstrac/Return.js"
import Primitive from "./primitives.js"

export default class Aritmertic extends Expression {
  private op1: Return
  private operator: string
  private op2: Return

  constructor(op1: Primitive, operator: string, op2: Primitive, line: number, column: number) {
    super(line, column)
    this.op1 = op1.execute()
    this.operator = operator
    this.op2 = op2.execute()
  }
  public execute(env: Environment): Return {
    switch (this.operator) {
      case "+":
        let result = this.Sum()
        return result

      case "-":
        let result2 = this.Res()
        return result2

      case "/":
        let result3 = this.Div()
        return result3

      case "%":
        let result4 = this.Mod()
        return result4

      case "!":
        let result5 = this.Neg()
        return result5

      default:
        break
    }

  }


  private Sum(): Return {
    const Result_type: Type_dxnry = Sum_table[this.op1.type][this.op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        if (this.op1.type = Type_dxnry.STRING) {
          this.op1.value = parseInt(this.op1.value)
          console.log(this.op1.value)
        }
        if (this.op2.type = Type_dxnry.STRING) {
          this.op2.value = parseInt(this.op2.value)
          console.log(this.op2.value)
        }
        return { value: this.op1.value + this.op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        if (this.op1.type = Type_dxnry.STRING) {
          this.op1.value = parseInt(this.op1.value)
          console.log(this.op1.value)
        }
        if (this.op2.type = Type_dxnry.STRING) {
          this.op2.value = parseInt(this.op2.value)
          console.log(this.op2.value)
        }
        return { value: this.op1.value + this.op2.value, type: Type_dxnry.DOUBLE }

      case Type_dxnry.DATE:
        let date: Date
        let to_add: number
        if (this.op1.type == Type_dxnry.DATE) {
          date = new Date(this.op1.value)
          to_add = parseInt(this.op2.value)

        } else if (this.op2.type == Type_dxnry.DATE) {
          date = new Date(this.op2.value)
          to_add = parseInt(this.op1.value)

        } else if (this.op1.type = Type_dxnry.STRING) {
          to_add = parseInt(this.op1.value)

        } else if (this.op2.type = Type_dxnry.STRING) {
          to_add = parseInt(this.op2.value)
        }

        const result = date.setDate(date.getDate() + to_add)
        return { value: result, type: Type_dxnry.DATE }

      case Type_dxnry.STRING:
        return { value: this.op1.value + this.op2.value, type: Type_dxnry.STRING }

      default:
        return { value: null, type: Type_dxnry.NULL }
    }
  }

  private Res(): Return {
    const Result_type: Type_dxnry = Res_table[this.op1.type][this.op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: this.op1.value - this.op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: this.op1.value - this.op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }

  private Div(): Return {
    const Result_type: Type_dxnry = Div_table[this.op1.type][this.op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: this.op1.value / this.op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: this.op1.value / this.op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }
    }
  }

  private Mod(): Return {
    const Result_type: Type_dxnry = Mod_table[this.op1.type][this.op2.type]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: this.op1.value % this.op2.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: this.op1.value % this.op2.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }

  private Neg(): Return {
    const Result_type: Type_dxnry = Neg_table[this.op1.type][0]
    switch (Result_type) {
      case Type_dxnry.INT:
        return { value: -this.op1.value, type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: -this.op1.value, type: Type_dxnry.DOUBLE }

      default:
        return { value: null, type: Type_dxnry.NULL }

    }
  }


}
