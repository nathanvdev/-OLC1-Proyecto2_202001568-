
// const indexRoutes = require("./routes/index.routes.ts");
import indexRoutes from "./routes/index.routes.js"

import { Response } from "express";
import express from 'express'
// const express = require("express");
// const cors = require("cors");
import cors from 'cors'
// const morgan = require("morgan");
import morgan from 'morgan'

const app = express();

var corsOptions = {
  origin: "*",
};

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

// Imports rutas


app.use("/", indexRoutes);

// DEFAULT
// app.use((req: Request, res: Response):any => {
//   res.status(404).json({ message: "Not found" });
// });


export const appserver = app;