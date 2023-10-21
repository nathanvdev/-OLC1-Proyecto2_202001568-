import Logics from "../expression/Logics.js"
import Relational from "../expression/Relational.js"
import Primitive from "../expression/primitives.js"
import { Column_table } from "./Column_table.js"
import Expression from "./Expression.js"
import { Return, Type_dxnry } from "./Return.js"
import Symbol from "./Symbol.js"
import { Table_SQL } from "./Table_SQL.js"

export default class Environment {

  private Variables: Map<string, Symbol>
  private Tables: Map<string, Table_SQL>

  constructor(private Previus: Environment | null) {
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
    if (env.Variables.has(id)) {
      let tmp = env.Variables.get(id)
      if (tmp?.type == Value.type) {
        env.Variables.set(id, new Symbol(Value.value, id, Value.type))
        console.log(`se guardo la variable ${id} con atributos[ id:${id}, valor:${Value.value}, tipo:${Value.type} ]`)
      } else {
        console.log(`Error de tipos en la variable "${id}" esperado ${tmp?.type} pero se recibio ${Value.type}`)
      }
    } else {
      console.error(`La variable "${id}" no existe en este ambito`)
    }
  }

  public Select(id: string) {
    let env: Environment | null = this
    if (env.Variables.has(id)) {
      console.log(env.Variables.get(id)?.value)
    } else {
      console.error(`La variable "${id}" no existe en este ambito`)
    }
  }

  public NewTable(name:string, table:Table_SQL){
    this.Tables.set(name, table)
  }

  public FindTable(name:string):Table_SQL | null{
    let env: Environment | null = this
    if (env.Tables.has(name)) {
      return env.Tables.get(name)
    } else {
      return null
    }
  }

  public Rename_table(Table_name:string, New_name:string){
    let env: Environment | null = this
    if (env.Tables.has(Table_name)) {
      let tmp = env.Tables.get(Table_name)
      tmp.Rename_table(New_name)
      env.Tables.delete(Table_name)
      env.Tables.set(New_name, tmp)
      console.log(`se renombro la tabla ${Table_name} a ${New_name}`)
    } else {
      console.log(`La tabla "${Table_name}" no existe`)
    }

  }

  public DeleteTable(Table_name:string){
    let env: Environment | null = this
    if (env.Tables.has(Table_name)) {
      env.Tables.delete(Table_name)
      console.log(`se elimino la tabla ${Table_name}`)
    } else {
      console.log(`La tabla "${Table_name}" no existe`)
    }
  }

  // public Create_Table(id: string, columns: Map<string, Column_table>) {
  //   let env: Environment | null = this
  //   if (!env.Tables.has(id)) {
  //     env.Tables.set(id, columns)
  //     console.log(`se creo la tabla ${id}`)
  //   } else {
  //     console.error(`La tabla "${id}" ya existe en este ambito`)
  //   }
  // }

  // public Alter_Add(id: string, column: string, type: Type_dxnry) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(id)) {
  //     let tmp = env.Tables.get(id)
  //     if (!tmp.has(column)) {
  //       tmp.set(column, new Column_table(column, type))
  //       console.log(`se agrego la columna ${column} a la tabla ${id}`)
  //     } else {
  //       console.error(`La columna "${column}" ya existe en la tabla "${id}"`)
  //     }
  //   } else {
  //     console.error(`La tabla "${id}" no existe`)
  //   }
  // }

  // public Alter_Drop(id: string, column: string) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(id)) {
  //     let tmp = env.Tables.get(id)
  //     if (tmp.has(column)) {
  //       tmp.delete(column)
  //       console.log(`se elimino la columna ${column} de la tabla ${id}`)
  //     } else {
  //       console.error(`La columna "${column}" no existe en la tabla "${id}"`)
  //     }
  //   } else {
  //     console.error(`La tabla "${id}" no existe`)
  //   }
  // }

  // public Alter_Rename_table(Table_name: string, newTable_name: string) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(Table_name)) {
  //     let tmp = env.Tables.get(Table_name)
  //     env.Tables.delete(Table_name)
  //     env.Tables.set(newTable_name, tmp)
  //     console.log(`se renombro la tabla ${Table_name} a ${newTable_name}`)
  //   } else {
  //     console.log(`La tabla "${Table_name}" no existe`)
  //   }
  // }

  // public Alter_Rename_column(Table_name: string, Column_name: string, newColumn_name: string) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(Table_name)) {
  //     let tmp = env.Tables.get(Table_name)
  //     if (tmp.has(Column_name)) {
  //       let tmp2: Column_table = tmp.get(Column_name)
  //       tmp2.id = newColumn_name
  //       tmp.delete(Column_name)
  //       tmp.set(newColumn_name, tmp2)
  //       console.log(`se renombro la columna ${Column_name} a ${newColumn_name} de la tabla ${Table_name}`)
  //     } else {
  //       console.error(`La columna "${Column_name}" no existe en la tabla "${Table_name}"`)
  //     }
  //   } else {
  //     console.error(`La tabla "${Table_name}" no existe`)
  //   }
  // }

  // public DML_Insert(Table_name: string, Columns: string[], tmp_Values: Return[]) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(Table_name)) {
  //     let tmp_table = env.Tables.get(Table_name)
  //     for (let i = 0; i < Columns.length; i++) {
  //       const element = Columns[i];
  //       if (tmp_table.has(element)) {
  //         let tmp_column = tmp_table.get(element)
  //         if (tmp_column.type == tmp_Values[i].type) {
  //           tmp_column.rows.push(tmp_Values[i])
  //           console.log(`se inserto el valor ${tmp_Values[i].value} en la columna ${element} de la tabla ${Table_name}`)
  //         } else {
  //           console.log(`Error de tipos en la columna "${element}" esperado ${tmp_column.type} pero se recibio ${tmp_Values[i].type}`)
  //         }
  //       } else {
  //         console.log(`La columna "${element}" no existe en la tabla "${Table_name}"`)
  //       }
  //     }
  //   } else {
  //     console.log(`La tabla "${Table_name}" no existe`)
  //   }
  // }

  // public DML_Select(Columns: string[], Table_name: string) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(Table_name)) {
  //     let tmp_table = env.Tables.get(Table_name)
  //     let tmp_columns: Column_table[] = []
  //     for (let i = 0; i < Columns.length; i++) {
  //       const element = Columns[i];
  //       if (tmp_table.has(element)) {
  //         tmp_columns.push(tmp_table.get(element))
  //       } else {
  //         console.log(`La columna "${element}" no existe en la tabla "${Table_name}"`)
  //       }
  //     }
  //     return tmp_columns
  //   }
  //   return null
  // }

  // public DML_Select_all(Table_name: string) {
  //   let env: Environment | null = this
  //   if (env.Tables.has(Table_name)) {
  //     let tmp_table = env.Tables.get(Table_name)
  //     let tmp_columns: Column_table[] = []
  //     for (const key of tmp_table.keys()) {
  //       tmp_columns.push(tmp_table.get(key))
  //     }
  //     return tmp_columns
  //   }

  //   return null
  // }

  // public DML_Select_where(Columns: string[], Table_name: string, conditions: Relational | Logics): [] | null {
  //   let env: Environment | null = this
  //   let result: [] | null = null

  //   if (!env.Tables.has(Table_name)) {
  //     console.log(`La tabla "${Table_name}" no existe`)
  //     return null
  //   }

  //   let tmp_table = env.Tables.get(Table_name)

  //   if (conditions instanceof Relational) {
  //     conditions: Relational
  //     let Column_req = conditions.izq

  //     tmp_table.forEach((tmp_Column)=>{
  //       if (Columns.includes(tmp_Column.id)) {

  //         for (let i = 0; i < tmp_Column.rows.length; i++) {
  //           const tmp_row = tmp_Column.rows[i];
  //           let tmp:Primitive = new Primitive(tmp_row.value,3)
  //           conditions.izq = tmp

  //         }
  //       }
  //     })




  //   }
  // }

}



