import { Sum_table }  from "../abstrac/Aritmetic_tables.js";
import  Environment  from "../abstrac/Environment.js";
import  Expression  from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";
import  Primitive  from "./primitives.js";

export default class Aritmertic extends Expression {
  private op1: Return;
  private operator: string;
  private op2: Return;

  constructor(op1: Primitive, operator: string, op2: Primitive, line: number, column: number) {
    super(line, column);
    this.op1 = op1.execute();
    this.operator = operator;
    this.op2 = op2.execute();
  }
  public execute(env: Environment): Return {
    const Result_type: Type_dxnry = Sum_table[this.op1.type][this.op2.type];

    switch (Result_type) {
      case Type_dxnry.INT:
        if (this.op1.type == Type_dxnry.STRING) {
          let ascci:string
          for (let i = 0; i < this.op1.value.length; i++) {
            ascci += this.op1.value.charCodeAt(i);
          }
          let NumAscci = parseInt(ascci)
          return { value: NumAscci + this.op2.value, type: Type_dxnry.INT }

        }else if (this.op2.type == Type_dxnry.STRING) {
          let ascci:string
          for (let i = 0; i < this.op2.value.length; i++) {
            ascci += this.op2.value.charCodeAt(i);
          }
          let NumAscci = parseInt(ascci)
          return { value: this.op1.value + NumAscci, type: Type_dxnry.INT }

        }else{
          return{value: null, type: Type_dxnry.NULL}
        }
        

      case Type_dxnry.DOUBLE:
        if (this.op1.type == Type_dxnry.DATE) {
          let date = new Date(this.op1.value);
          return { value: date.setDate(date.getDate() + this.op2.value), type: Type_dxnry.DATE }
        } else if (this.op2.type == Type_dxnry.DATE) {
          let date = new Date(this.op2.value);
          return { value: date.setDate(date.getDate() + this.op1.value), type: Type_dxnry.DATE }
        }
        return { value: this.op1.value + this.op2.value, type: Type_dxnry.DOUBLE }

      case Type_dxnry.DATE:
        if (this.op1.type == Type_dxnry.INT || this.op1.type == Type_dxnry.BOOLEAN) {
          let date = new Date(this.op2.value);
          return { value: date.setDate(date.getDate() + this.op1.value), type: Type_dxnry.DATE }
        } else if (this.op2.type == Type_dxnry.INT || this.op2.type == Type_dxnry.BOOLEAN) {
          let date = new Date(this.op1.value);
          return { value: date.setDate(date.getDate() + this.op2.value), type: Type_dxnry.DATE }
        } else if (this.op1.type == Type_dxnry.STRING) {
          let date = new Date(this.op2.value);
          this.op1.value = this.op1.value.charCodeAt(0)
          this.op1.type = Type_dxnry.INT;
          return { value: date.setDate(date.getDate() + this.op1.value), type: Type_dxnry.DATE };
        } else if (this.op2.type == Type_dxnry.STRING) {
          let date = new Date(this.op1.value);
          this.op2.value = this.op2.value.charCodeAt(0)
          this.op2.type = Type_dxnry.INT;
          return { value: date.setDate(date.getDate() + this.op2.value), type: Type_dxnry.DATE };
        }

      case Type_dxnry.STRING:
        return { value: this.op1.value + this.op2.value, type: Type_dxnry.STRING };

      default:
        return { value: null, type: Type_dxnry.NULL };
        break;
    }
  }
}
