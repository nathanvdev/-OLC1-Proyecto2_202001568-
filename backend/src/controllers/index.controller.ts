import * as parser from '../interpreter/AST/parser.js'

import { Request, Response } from "express"
import Environment from "../interpreter/abstrac/Environment.js"
import { Type_dxnry } from '../interpreter/abstrac/Return.js'
const env_global = new Environment(null, "global")

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "Bienvenido a mi api" })
}

export const analizar = (req: Request, res: Response) => {
  console.log("\n-------------------------new request-------------------------")
  const { code_in } = req.body
  let ast_generated = new parser.QueryParserParser().parse(code_in)

  res.status(200).json({
    message: "Analisis Realizado",
    ast_generated: ast_generated,
  })


  for (const inst of ast_generated) {
    const response = inst.execute(env_global)
    if (response != null || response != undefined) {
        continue
    }
  }


}

