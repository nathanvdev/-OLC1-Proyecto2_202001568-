import Environment from "./Environment.js"

export default abstract class Instruction {

  constructor() {}

  public abstract execute(env: Environment): any
}
