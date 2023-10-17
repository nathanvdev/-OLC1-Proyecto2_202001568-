import { Return, Type_dxnry } from "./Return.js";

export default class Symbol {
  public value: any;
  public id: string;
  public type: Type_dxnry;

  constructor(Value: any, id: string, type: Type_dxnry) {
    this.value = Value;
    this.id = id.toLowerCase();
    this.type = type;
  }
}
