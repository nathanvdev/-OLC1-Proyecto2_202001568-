import Expression from "../abstrac/Expression.js";

export default class Group extends Expression{
    private expr: Expression

    constructor(expr: Expression){
        super()
        this.expr = expr
    }

    public execute(env: any) {
        return this.expr.execute(env)
    }

    public GetDOT(): { rama: string; nodo: string; } {
        const id = Math.floor(Math.random() * (100-0)+0);
        //genero el nodoname
        const NodoPrincipal = `nodoGroup ${id.toString()}`;
        let rama = `${NodoPrincipal} [label="Group"];\n`
        const codigorama: { rama: string; nodo: string; } = this.expr.GetDOT()
        rama += codigorama.rama;

        rama += `${NodoPrincipal} -> ${codigorama.nodo};\n`

        return{rama: rama, nodo: NodoPrincipal};
    }
}