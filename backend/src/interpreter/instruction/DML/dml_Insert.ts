import Environment from "../../abstrac/Environment.js";
import Instruction from "../../abstrac/Instruction.js";
import Primitive from "../../expression/primitives.js";

export default class dml_Insert extends Instruction{
    private Table_name: string;
    private Columns: []
    private Values:Primitive []

    constructor(Table_name: string, Columns: [], Values: []) {
        super();
        this.Table_name = Table_name;
        this.Columns = Columns;
        this.Values = Values;
    }

    public execute(env: Environment){
        let Table = env.FindTable(this.Table_name);
        if (!Table) {
            console.error(`La tabla "${this.Table_name}" no existe`)
            return
        }if (this.Columns.length != this.Values.length) {
            console.error(`La cantidad de columnas no coincide con la cantidad de valores`)
            return
        }
        
        let toInsert = []
        for (let i = 0; i < this.Columns.length; i++) {
            let tmp_value = this.Values[i].execute(env)
            toInsert.push([this.Columns[i], tmp_value])
        }


        Table.InsertRow(toInsert)

    }
}