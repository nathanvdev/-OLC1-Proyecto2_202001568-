import * as parser from '../interpreter/AST/parser.js'

import { Request, Response } from "express"
import Environment from "../interpreter/abstrac/Environment.js"

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "Bienvenido a mi api" })
}

export const analizar = (req: Request, res: Response) => {
  console.log("\n-------------------------new request-------------------------")
  const { code_in } = req.body
  console.log(code_in)
  let ast_generated = new parser.QueryParserParser().parse(code_in)

  const env_global = new Environment(null)

  for (const inst of ast_generated) {
    inst.execute(env_global)
  }

  res.status(200).json({
    message: "Analisis Realizado",
    ast_generated: ast_generated,
  })
}

