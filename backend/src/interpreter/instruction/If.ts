import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";
import { Type_dxnry } from "../abstrac/Return.js";
import Statement from "./Statement.js";

export default class If extends Instruction{
    private condition: Expression
    private codeIf: Statement
    private codeElse: Statement

    constructor(condition: Expression, codeIf: Statement, codeElse: Statement){
        super()
        this.condition = condition
        this.codeIf = codeIf
        this.codeElse = codeElse
    }
    
    public execute(env: Environment) {
        const condicion = this.condition.execute(env);
        if (condicion.type == Type_dxnry.BOOLEAN) {
            if (condicion.value) {
                const element = this.codeIf.execute(env, env.nombre + " If");
                if (element != null || element != undefined) {
                    if (element.type == Type_dxnry.RETURN) {
                        console.log(element.value);
                        return element;

                    } else if (element.type == Type_dxnry.BREAK) {
                        return element;

                    } else if (element.type == Type_dxnry.CONTINUE) {
                        return element;

                    }
                }

            } else {
                if (this.codeElse != null) {
                    const element2 = this.codeElse.execute(env, env.nombre + " Else");
                    if (element2 != null || element2 != undefined) {
                        if (element2.type == Type_dxnry.RETURN) {
                            // console.log(element2.value,"hajsdflka");
                            return element2;

                        } else if (element2.type == Type_dxnry.BREAK) {
                            return element2;

                        } else if (element2.type == Type_dxnry.CONTINUE) {
                            return element2;

                        }
                    }

                }

            }

        }

    }
}