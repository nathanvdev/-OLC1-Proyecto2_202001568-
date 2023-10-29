import * as parser from '../interpreter/AST/parser.js'

import { Request, Response } from "express"
import Environment from "../interpreter/abstrac/Environment.js"
import { clearOuts, outs, Errores, clearErrores } from '../out/out.js'
import fs from 'fs';
import { exec } from "child_process";



const env_global = new Environment(null, "global")

export const index = (req: Request, res: Response) => {
  res.status(200).json({ message: "Bienvenido a mi api" })
}

export const analizar = (req: Request, res: Response) => {
  clearOuts()
  console.log("\n-------------------------new request-------------------------")
  const { code_in } = req.body
  let ast_generated = new parser.QueryParserParser().parse(code_in)

  


  for (const inst of ast_generated) {
    inst.execute(env_global)
  }

  let ASTDOT = `
  digraph G {
      nodoPrincipal[label="AST"];\n
  `

  for (const inst of ast_generated) {
    const ar = inst.GetDOT();
    ASTDOT += `${ar.rama}\n`;
    ASTDOT += `nodoPrincipal -> ${ar.nodo}\n`;
  }
  ASTDOT += "\n}";

  ASTDOT = ASTDOT.replace(/@/g, "")


  let finish_result = ""
  for (const out of outs) {
    finish_result += out + "\n"
  }
  
  let finish_errores = ""
  for (const error of Errores) {
    finish_errores += error + "\n"
  }


  const archivo = 'temp.txt'

  fs.writeFile(archivo, ASTDOT, err => {
    if (err) {
      console.error('Falló escribir el archivo ', err);
    } else console.log('archivo creado correctamente');
  });

  exec("dot -Tsvg temp.txt -o temp.svg", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })

  res.status(200).json({
    message: "Analisis Realizado",
    resultado: finish_result,
    errores: finish_errores
  })
}

