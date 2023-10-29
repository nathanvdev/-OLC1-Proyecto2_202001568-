import { outs } from "../../out/out.js"
import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import Instruction from "../abstrac/Instruction.js"
import { Type_dxnry } from "../abstrac/Return.js"

export default class Print extends Instruction {
  private expression: Expression
  constructor(expression: Expression) {
    super()
    this.expression = expression
  }

  public execute(env: Environment) {
    const value = this.expression.execute(env)

    if (value.type == Type_dxnry.DATE) {
      let date = new Date(value.value)
      console.log(date.toLocaleDateString("es-ES"))
      outs.push(date.toLocaleDateString("es-ES"))
    } else {
      console.log(value.value, "TIPO:", value.type)
      outs.push(value.value)
    }
  }

  public GetDOT(): { rama: string; nodo: string; } {
    //id unico
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    //generar el nombre del nodo
    const nodo = `nodoPrint${id.toString()}`;
    let rama = `${nodo}[label="Print"];\n`
    const codigorama: { rama: string; nodo: string; } = this.expression.GetDOT();
    rama += codigorama.rama;

    rama += `${nodo} -> ${codigorama.nodo};\n`;

    return { rama: rama, nodo: nodo }
  }
}
