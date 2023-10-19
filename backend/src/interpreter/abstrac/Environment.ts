import { Column_table } from "./Column_table.js"
import { Return, Type_dxnry } from "./Return.js"
import Symbol from "./Symbol.js"

export default class Environment {

  private Variables: Map<string, Symbol>
  private Tables: Map<string, Map<string, Column_table>>

  constructor(private Previus: Environment | null) {
    this.Variables = new Map<string, Symbol>()
    this.Tables = new Map<string, Map<string, Column_table>>
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

  public Create_Table(id: string, columns: Map<string, Column_table>) {
    let env: Environment | null = this
    if (!env.Tables.has(id.toLowerCase())) {
      env.Tables.set(id.toLowerCase(), columns)
      console.log(`se creo la tabla ${id.toLowerCase()}`)
    } else {
      console.error(`La tabla "${id.toLowerCase()}" ya existe en este ambito`)
    }
  }

  public Alter_Add(id: string, column: string, type: Type_dxnry) {
    let env: Environment | null = this
    if (env.Tables.has(id.toLowerCase())) {
      let tmp = env.Tables.get(id.toLowerCase())
      if (!tmp.has(column.toLowerCase())) {
        tmp.set(column.toLowerCase(), new Column_table(column, type))
        console.log(`se agrego la columna ${column.toLowerCase()} a la tabla ${id.toLowerCase()}`)
      }else{
        console.error(`La columna "${column.toLowerCase()}" ya existe en la tabla "${id.toLowerCase()}"`)
      }
    }
  }

  public Alter_Drop(id: string, column: string) {
    let env: Environment | null = this
    if (env.Tables.has(id.toLowerCase())) {
      let tmp = env.Tables.get(id.toLowerCase())
      if (tmp.has(column.toLowerCase())) {
        tmp.delete(column.toLowerCase())
        console.log(`se elimino la columna ${column.toLowerCase()} de la tabla ${id.toLowerCase()}`)
      }else{
        console.error(`La columna "${column.toLowerCase()}" no existe en la tabla "${id.toLowerCase()}"`)
      }
    }
  }

  public Alter_Rename_table(Table_name: string, newTable_name: string) {
    let env: Environment | null = this
    if (env.Tables.has(Table_name.toLowerCase())) {
      let tmp = env.Tables.get(Table_name.toLowerCase())
      env.Tables.delete(Table_name.toLowerCase())
      env.Tables.set(newTable_name.toLowerCase(), tmp)
      console.log(`se renombro la tabla ${Table_name.toLowerCase()} a ${newTable_name.toLowerCase()}`)
    }
  }

  public Alter_Rename_column(Table_name: string, Column_name: string, newColumn_name: string) {
    let env: Environment | null = this
    if (env.Tables.has(Table_name.toLowerCase())) {
      let tmp = env.Tables.get(Table_name.toLowerCase())
      if (tmp.has(Column_name.toLowerCase())) {
        let tmp2:Column_table = tmp.get(Column_name.toLowerCase())
        tmp2.id = newColumn_name.toLowerCase()
        tmp.delete(Column_name.toLowerCase())
        tmp.set(newColumn_name.toLowerCase(), tmp2)
        console.log(`se renombro la columna ${Column_name.toLowerCase()} a ${newColumn_name.toLowerCase()} de la tabla ${Table_name.toLowerCase()}`)
      }else{
        console.error(`La columna "${Column_name.toLowerCase()}" no existe en la tabla "${Table_name.toLowerCase()}"`)
      }
    }
  }
}

