import { Router } from "express"
import * as indexController from "../controllers/index.controller.js"

const router = Router()

router.get("/", indexController.index)
router.post("/analizar", indexController.analizar)

export default router
