import Environment from "./Environment.js"

export default abstract class Instruction {
  public line: number
  public column: number
  constructor(Line: number, Column: number) {
    this.line = Line
    this.column = Column
  }

  public abstract execute(env: Environment): any
}
