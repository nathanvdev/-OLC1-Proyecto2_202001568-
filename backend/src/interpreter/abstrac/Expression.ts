import Environment from "./Environment.js"
import { Return } from "./Return.js"

export default abstract class Expression {
  public line: number
  public column: number
  constructor(Line: number, Column: number) {
    this.line = Line
    this.column = Column
  }

  public abstract execute(env: Environment): Return
}
