import { Return, Type_dxnry } from "./Return.js"
import Symbol from "./Symbol.js"
import { Table_SQL } from "./Table_SQL.js"

export default class Environment {


  private Variables: Map<string, Symbol>
  private Tables: Map<string, Table_SQL>
  public nombre: string;;

  constructor(private Previus: Environment | null, nombre: string) {
    this.Variables = new Map<string, Symbol>()
    this.Tables = new Map<string, Table_SQL>
  }

  public Save(id: string, Value: any, type: Type_dxnry) {
    let env: Environment | null = this
    if (!env.Variables.has(id)) {
      env.Variables.set(id, new Symbol(Value, id, type))
      let tmp = new Symbol(Value, id, type)
      console.log(`se guardo la variable ${id} con atributos[ id:${tmp.id}, valor:${tmp.value}, tipo:${tmp.type} ]`)
    } else {
      console.error(`La variable ${id} ya existe en este ambito`)
    }
  }

  public Save_def(id: string, Value: Return, type: Type_dxnry) {
    let env: Environment | null = this

    if (!env.Variables.has(id)) {
      if (Value.type == type) {
        env.Variables.set(id, new Symbol(Value.value, id, type))
        let tmp = new Symbol(Value.value, id, type)
        console.log(`se guardo la variable ${id} con atributos [ id:${tmp.id}, valor:${tmp.value}, tipo:${tmp.type} ]`)
      } else {
        console.log(`Error de tipos en la variable "${id}" esperado ${type} pero se recibio ${Value.type}`)
      }
    } else {
      console.error(`La variable "${id}" ya existe en este ambito`)
    }
  }

  public Set(id: string, Value: Return) {
    let env: Environment | null = this
    while (env != null) {
      if (env.Variables.has(id)) {
        let tmp = env.Variables.get(id)
        if (tmp?.type == Value.type) {
          env.Variables.set(id, new Symbol(Value.value, id, Value.type))
          console.log(`se guardo la variable ${id} con atributos[ id:${id}, valor:${Value.value}, tipo:${Value.type} ]`)
          break
        } else {
          console.log(`Error de tipos en la variable "${id}" esperado ${tmp?.type} pero se recibio ${Value.type}`)
          break
        }
      }
      env = env.Previus
    }
  }

  public Select(id: string) {
    let env: Environment | null = this
    while (env != null) {
      if (env.Variables.has(id)) {
        return env.Variables.get(id)?.value
      }
      env = env.Previus
    }
    console.log(`La variable "${id}" no existe`)
  }

  public NewTable(name: string, table: Table_SQL) {
    this.Tables.set(name, table)
  }

  public FindTable(name: string): Table_SQL | null {
    let env: Environment | null = this
    while (env != null) {
      if (env.Tables.has(name)) {
        return env.Tables.get(name)
      }
      env = env.Previus
    }
    return null
  }

  public Rename_table(Table_name: string, New_name: string) {
    let env: Environment | null = this
    while (env != null) {
      if (env.Tables.has(Table_name)) {
        let tmp = env.Tables.get(Table_name)
        tmp.Rename_table(New_name)
        env.Tables.delete(Table_name)
        env.Tables.set(New_name, tmp)
        console.log(`se renombro la tabla ${Table_name} a ${New_name}`)
        break
      }
      env = env.Previus
    }
    console.log(`La tabla "${Table_name}" no existe`)


  }

  public DeleteTable(Table_name: string) {
    let env: Environment | null = this
    while (env != null) {
      if (env.Tables.has(Table_name)) {
        env.Tables.delete(Table_name)
        console.log(`se elimino la tabla ${Table_name}`)
        break
      }
      env = env.Previus
    }
    console.log(`La tabla "${Table_name}" no existe`)

  }

  getVariable(arg0: string) {
    let env: Environment | null = this
    while (env != null) {
      if (env.Variables.has(arg0)) {
        return env.Variables.get(arg0)
      }
      env = env.Previus
    }
  }


  

}



