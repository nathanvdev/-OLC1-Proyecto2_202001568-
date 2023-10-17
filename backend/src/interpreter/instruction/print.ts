import  Environment  from "../abstrac/Environment.js";
import  Expression  from "../abstrac/Expression.js";
import  Instruction  from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";

export default class Print extends Instruction {
  constructor(Line: number, Column: number, private expression: Expression) {
    super(Line, Column);
  }
public execute(env: Environment) {
    const value = this.expression.execute(env);

    if (value.type == Type_dxnry.DATE) {
        let date = new Date(value.value);
        var dias = 5; // Número de días a agregar
        date.setDate(date.getDate() + dias);
        console.log(date.toLocaleDateString("es-ES"));
    } else {
        console.log(value.value, "TIPO:", value.type);
    }
}
}
