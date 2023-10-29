import { outs } from "../../out/out.js"
import Environment from "../abstrac/Environment.js"
import Expression from "../abstrac/Expression.js"
import Instruction from "../abstrac/Instruction.js"
import { Return, Type_dxnry } from "../abstrac/Return.js"
import Aritmertic from "../expression/Aritmetic.js"


export class var_list {
    public id: string
    public type: Type_dxnry
    constructor(id: string, type: Type_dxnry) {
        this.id = id
        this.type = type
    }
}

export class Declarate extends Instruction {
    private var_list: [var_list]

    constructor(var_list: [var_list]) {
        super()
        this.var_list = var_list
    }

    public execute(env: Environment): any {
        for (let i = 0; i < this.var_list.length; i++) {
            const variable = this.var_list[i]
            let tmp = variable.id.toString()
            env.Save(variable.id.toLowerCase(), null, variable.type)
        }
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //generar un id 
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoDeclarar${id.toString()}`;
        const Nodoid = `nodoId${id.toString()}`;

        //generar las ramas del ast

        let ramaDe = `${NodoPrincipal}[label="Declarar"];\n`;

        for (let i = 0; i < this.var_list.length; i++) {
            //agregar el nodo id
            ramaDe += `${Nodoid}[label="${this.var_list[i].id}"];\n`;
            //se conecta el id con el nodo principal
            ramaDe += `${NodoPrincipal} -> ${Nodoid};\n`;
        }
        return { rama: ramaDe, nodo: NodoPrincipal }


    }
}

export class Declarate_def extends Instruction {
    private id: string
    private type: Type_dxnry
    private value: Return

    constructor(id: string, type: Type_dxnry, value: Return) {
        super()
        this.id = id
        this.type = type
        this.value = value
    }

    public execute(env: Environment): any {
        env.Save_def(this.id.toLowerCase(), this.value, this.type)
    }

    public GetDOT(): { rama: string; nodo: string; } {
        //generar un id 
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoDeclarar${id.toString()}`;
        const Nodoid = `nodoId${id.toString()}`;

        //generar las ramas del ast

        const codigoAST: { rama: string, nodo: string } = { rama: this.value.value, nodo: this.value.value }
        let ramaDe = `${NodoPrincipal}[label="Declarar"];\n`
        //agregar el nodo id
        ramaDe += `${Nodoid}[label="${this.id.toString()}"];\n`
        //agregar la expresion
        ramaDe += codigoAST.rama + "\n";
        //se conecta el id con el nodo principal
        ramaDe += `${NodoPrincipal} -> ${Nodoid};\n`
        //se conecta el id a la expression
        ramaDe += `${Nodoid} -> ${codigoAST.nodo};\n`

        return { rama: ramaDe, nodo: NodoPrincipal }

    }


}

export class Set extends Instruction {
    private id: string
    private value: Return

    constructor(id: string, value: Return) {
        super()
        this.id = id
        this.value = value
    }

    public execute(env: Environment): any {
        if (this.value instanceof Aritmertic) {
            env.Set(this.id.toLowerCase(), this.value.execute(env))
            return
        }
        env.Set(this.id.toLowerCase(), this.value)
    }
    
    private DotID(id_in: string): { rama: string, nodo: string } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        const nodo = `nodoID${id.toString()}`;
        let rama = `${nodo}[label="${id_in}"];\n`
        return { rama: rama, nodo: nodo }
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoAsignar${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Asignar"];\n`
        const codigorama: { rama: string; nodo: string; } = this.DotID(this.value.value)
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return { rama: rama, nodo: NodoPrincipal };
    }
}

export class Select extends Instruction {
    private expr: Expression
    private as: Expression | null

    constructor(id: Expression, a_s:Expression|null) {
        super()
        this.expr = id
        this.as = a_s
    }

    public execute(env: Environment) {
        let result = this.expr.execute(env)
        console.log(result.value)
        let tmp = ""
        if (this.as != null) {
            let result_as = this.as.execute(env)
            tmp = `|${result_as.value}|\n|${result.value}|\n`
        }else{
            tmp = `|${result.value}| \n|${result.value}|\n`
        }

        outs.push(tmp)
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100 - 0) + 0);
        //genero el nodoname
        const NodoPrincipal = `nodoSelect${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Select"];\n`
        const codigorama: { rama: string; nodo: string; } = this.expr.GetDOT()
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return { rama: rama, nodo: NodoPrincipal };
    }
}
