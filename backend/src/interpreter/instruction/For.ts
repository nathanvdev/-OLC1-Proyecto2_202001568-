import Environment from "../abstrac/Environment.js";
import Instruction from "../abstrac/Instruction.js";
import { Return } from "../abstrac/Return.js";
import Variable from "../expression/Variable.js";
import Statement from "./Statement.js";

export default class For extends Instruction {
    private ID: Variable
    private start: number
    private end: number
    private Statement: Statement

    constructor(ID: Variable, start: number, end: number, Statement: Statement) {
        super()
        this.ID = ID
        this.start = start
        this.end = end
        this.Statement = Statement
    }

    public execute(env: Environment): any {
        let variable = this.ID.execute(env)
        if (variable.type != 0) {
            throw new Error("La variable debe ser de tipo number")
        }
        for (let i = this.start; i < this.end; i++) {
            variable.value = variable.value + 1
            this.Statement.execute(env, env.nombre+"For")
        }



    }

}