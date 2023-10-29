import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import { Return, Type_dxnry } from "../abstrac/Return.js"

export default class Primitive extends Expression {

  private value
  private type

  constructor(value: any, type: Type_dxnry) {
    super()
    this.value = value
    this.type = type
  }


  public execute(env: Environment): Return {
    switch (this.type) {
      case Type_dxnry.INT:
        return { value: parseInt(this.value), type: Type_dxnry.INT }

      case Type_dxnry.DOUBLE:
        return { value: parseFloat(this.value), type: Type_dxnry.DOUBLE }

      case Type_dxnry.DATE:
        let date: Date = new Date(this.value)
        date.setDate(date.getDate() + 1)
        return { value: date, type: Type_dxnry.DATE }

      case Type_dxnry.STRING:
        return { value: this.value, type: Type_dxnry.STRING }

      case Type_dxnry.BOOLEAN:
        if (this.value.toString().toLowerCase() === "true") {
          return { value: true, type: Type_dxnry.BOOLEAN }
        }
        return { value: false, type: Type_dxnry.BOOLEAN }

      case Type_dxnry.BREAK:
        return { value: null, type: Type_dxnry.BREAK }

      case Type_dxnry.CONTINUE:
        return { value: null, type: Type_dxnry.CONTINUE }

      default:
        return { value: null, type: Type_dxnry.NULL }
    }
  }

  public GetDOT(): { rama: string; nodo: string; } {
    //generar el id unidco 
    const id = Math.floor(Math.random() * (100 - 0) + 0);
    //generar el nombre del nodo
    const nodo = `nodoPrimitivo${id.toString()}`;

    let va = this.value;
    if (this.type == Type_dxnry.STRING) {
      va = va.replace(new RegExp('"', "g"), "");
    }

    const ramaP = `${nodo}[label="Primitivo"];\n
     nodoPrimitivo${nodo}[label="${va}"];\n
     ${nodo} -> nodoPrimitivo${nodo};\n`;


    return { rama: ramaP, nodo: nodo };
  }
}
