import { Router } from "express"
import * as indexController from '../controllers/index.controller.js'

// const express_routes = require('express');
// const router = express_routes.Router();
const router = Router()

// //Imports controller
// const indexController = require('../controllers/index.controller.ts')
// // Rutas
router.get("/", indexController.index);
router.post("/analizar", indexController.analizar);
// router.post('/interpret', controller.interpret)

// // module.exports = router;
// export const router_server = router;


export default router