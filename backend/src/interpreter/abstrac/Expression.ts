import Environment from "./Environment.js"
import { Return } from "./Return.js"

export default abstract class Expression {

  constructor() {}

  public abstract execute(env: Environment): Return

  public abstract GetDOT(): {rama: string, nodo: string};
}
