import indexRoutes from "./routes/index.routes.js"
import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()

var corsOptions = {
  origin: "*",
}

app.use(morgan("dev"))
app.use(express.json())
app.use(cors(corsOptions))
app.use("/", indexRoutes)

export const appserver = app
