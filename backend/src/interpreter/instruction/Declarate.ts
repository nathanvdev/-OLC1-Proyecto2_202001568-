import  Environment  from "../abstrac/Environment.js";
import  Instruction  from "../abstrac/Instruction.js";
import { Return, Type_dxnry } from "../abstrac/Return.js";


export class var_list{
    public id:string
    public type:Type_dxnry
    constructor(id:string, type:Type_dxnry){
        this.id = id
        this.type = type
    }
}

export class Declarate extends Instruction{
    private var_list:[var_list]

    constructor(var_list:[var_list], Line:number, Column:number){
        super(Line, Column)
        this.var_list = var_list
    }

    public execute(env:Environment):any {
        for (let i = 0; i < this.var_list.length; i++) {
            const variable = this.var_list[i]
            let tmp = variable.id.toString().replace("@","")
            env.Save(variable.id, null, variable.type)
        }
    }
}

export class Declarate_def extends Instruction{
    private id:string
    private type:Type_dxnry
    private value:Return

    constructor(id:string, type:Type_dxnry, value:Return, Line:number, Column:number){
        super(Line, Column)
        this.id = id
        this.type = type
        this.value = value
    }

    public execute(env:Environment):any {
        env.Save_def(this.id, this.value, this.type)
    }
}

export class Set extends Instruction{
    private id:string
    private value:Return

    constructor(id:string, value:Return, Line:number, Column:number){
        super(Line, Column)
        this.id = id
        this.value = value
    }

    public execute(env:Environment):any {
        env.Set(this.id, this.value)
    }
}

export class Select extends Instruction{
    private id:string

    constructor(id:string, Line:number, Column:number){
        super(Line, Column)
        this.id = id
    }

    public execute(env: Environment) {
        env.Select(this.id)
    }
}
