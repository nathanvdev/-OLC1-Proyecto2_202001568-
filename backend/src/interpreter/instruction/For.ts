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
                } else if (response.type == Type_dxnry.RETURN) {
                    return response;
                }
            }
        }
    }

    public GetDOT(): { rama: string; nodo: string; } {

        //id unico
        const id = Math.floor(Math.random() * (100-0)+0);
        //generar el nombre del nodo
        const nodo = `nodofor${id.toString()}`;

        let rama = '';

        const declaracion: {rama:string, nodo: string} = {rama: this.ID.toString(), nodo: 'ID'};
        rama += declaracion.rama;

        const start: {rama: string, nodo: string} = {rama: this.start.toString(), nodo: 'start'};
        rama += start.rama;
        const end: {rama: string, nodo: string} = {rama: this.end.toString(), nodo: 'end'};
        rama += end.rama;
        const code: { rama: string, nodo: string} = this.Statement.GetDOT();
        rama += code.rama;

        rama+= `${nodo}[label="FOR"];\n`;
        rama+= `${nodo} -> ${declaracion.nodo};\n`;
        rama+= `${nodo} -> ${start.nodo};\n`;
        rama+= `${nodo} -> ${end.nodo};\n`;
        rama+= `${nodo} -> ${code.nodo};\n`;

        return{rama: rama, nodo: nodo};
    }

}