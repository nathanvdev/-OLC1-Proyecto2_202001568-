import  Expression  from "../abstrac/Expression.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";

export default class Primitive extends Expression {
  constructor(Line: number, Column: number, private value: any, private type: Type_dxnry) {
    super(Line, Column);
  }
  public execute(): Return {
    switch (this.type) {
      case Type_dxnry.INT:
        return { value: parseInt(this.value), type: Type_dxnry.INT };
      case Type_dxnry.DOUBLE:
        return { value: parseFloat(this.value), type: Type_dxnry.DOUBLE };
      case Type_dxnry.DATE:
        let date: Date = new Date(this.value);
        date.setDate(date.getDate() + 1)
        return { value: date, type: Type_dxnry.DATE };
      case Type_dxnry.STRING:
        return { value: this.value, type: Type_dxnry.STRING };
      case Type_dxnry.BOOLEAN:
        if (this.value.toString().toLowerCase() === "true") {
          return { value: true, type: Type_dxnry.BOOLEAN };
        }
        return { value: false, type: Type_dxnry.BOOLEAN };
      default:
        return { value: null, type: Type_dxnry.NULL };
    }
  }
}
