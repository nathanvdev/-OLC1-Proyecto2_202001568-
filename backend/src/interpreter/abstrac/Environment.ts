import { Return, Type_dxnry } from "./Return.js"
import Symbol from "./Symbol.js"

export default class Environment {
  private Variables

  constructor(private Previus: Environment | null) {
    this.Variables = new Map<string, Symbol>()
  }

  public Save(id: string, Value: any, type: Type_dxnry) {
    let env: Environment | null = this
    if (!env.Variables.has(id.toLowerCase())) {
      env.Variables.set(id.toLowerCase(), new Symbol(Value, id, type))
      let tmp = new Symbol(Value, id, type)
      console.log(`se guardo la variable ${id.toLowerCase()} con atributos[ id:${tmp.id}, valor:${tmp.value}, tipo:${tmp.type} ]`)
    } else {
      console.error(`La variable ${id} ya existe en este ambito`)
    }
  }

  public Save_def(id: string, Value: Return, type: Type_dxnry) {
    let env: Environment | null = this

    if (!env.Variables.has(id.toLowerCase())) {
      if (Value.type == type) {
        env.Variables.set(id.toLowerCase(), new Symbol(Value.value, id, type))
        let tmp = new Symbol(Value.value, id, type)
        console.log(`se guardo la variable ${id.toLowerCase()} con atributos [ id:${tmp.id}, valor:${tmp.value}, tipo:${tmp.type} ]`)
      } else {
        console.log(`Error de tipos en la variable "${id.toLowerCase()}" esperado ${type} pero se recibio ${Value.type}`)
      }
    } else {
      console.error(`La variable "${id}" ya existe en este ambito`)
    }
  }

  public Set(id: string, Value: Return) {
    let env: Environment | null = this
    if (env.Variables.has(id.toLowerCase())) {
      let tmp = env.Variables.get(id.toLowerCase())
      if (tmp?.type == Value.type) {
        env.Variables.set(id.toLowerCase(), new Symbol(Value.value, id, Value.type))
        console.log(`se guardo la variable ${id.toLowerCase()} con atributos[ id:${id}, valor:${Value.value}, tipo:${Value.type} ]`)
      } else {
        console.log(`Error de tipos en la variable "${id.toLowerCase()}" esperado ${tmp?.type} pero se recibio ${Value.type}`)
      }
    } else {
      console.error(`La variable "${id}" no existe en este ambito`)
    }
  }

  public Select(id: string) {
    let env: Environment | null = this
    if (env.Variables.has(id.toLowerCase())) {
      console.log(env.Variables.get(id.toLowerCase())?.value)
    }
  }
}
