export enum Type_dxnry {
  INT = 0,
  DOUBLE = 1,
  DATE = 2,
  STRING = 3,
  BOOLEAN = 4,
  NULL = 5,
  BREAK = 6,
  CONTINUE = 7,
  RETURN = 8
}

export type Return = {
  value: any
  type: Type_dxnry
}
