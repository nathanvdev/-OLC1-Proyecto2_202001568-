import Environment from "../abstrac/Environment.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";;
import Statement from "./Statement.js";

export default class For extends Instruction {
    private ID: string
    private start: number
    private end: number
    private Statement: Statement

    constructor(ID: string, start: number, end: number, Statement: Statement) {
        super()
        this.ID = ID
        this.start = start
        this.end = end
        this.Statement = Statement
    }

    public execute(env: Environment): any {
        const local = new Environment(env, "For")
        local.Save_def(this.ID, { value: this.start, type: Type_dxnry.INT }, Type_dxnry.INT)

        for (let i = this.start; i < this.end; i++) {

            const response = this.Statement.execute(local,"For")
            local.Set(this.ID, { value: i+1, type: Type_dxnry.INT })

            if (response != null || response != undefined) {
                if (response.type == Type_dxnry.BREAK) {
                    break;
                } else if (response.type == Type_dxnry.CONTINUE) {
                    continue;
                }
            }
        }



    }

}