import Environment from "../abstrac/Environment.js";
import Expression from "../abstrac/Expression.js";
import Instruction from "../abstrac/Instruction.js";

export default class Case extends Instruction {
    private expression: Expression | null
    private Cases: Expression[]
    private Default: Instruction | null
    private a_s: Expression | null

    constructor(expression: Expression, Cases: [], Default: Instruction | null, a_s: Expression | null) {
        super()
        this.expression = expression
        this.Cases = Cases
        this.Default = Default
        this.a_s = a_s
    }

    public execute(env: Environment) {
        let result = this.Default?.execute(env)
        if (this.expression != null) {
            for (const Case of this.Cases) {
                 if (Case[0].execute(env).value == this.expression.execute(env).value) {
                    result = Case[1].execute(env)
                    break
                 }
            }
        }else{
            for (const Case of this.Cases) {
                if (Case[0].execute(env).value == true) {
                   result = Case[1].execute(env)
                   break
                }
           }
        }
        if (this.a_s) {
            console.log("" + this.a_s.execute(env)+ " " + result.value)
        }else{
            console.log(result.value)
        }
        
    }


}