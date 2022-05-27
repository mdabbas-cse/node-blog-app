import { Router } from "express"
import dashboardController from "../controllers/dashboardController.js"
import { isAuthencated } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", isAuthencated, dashboardController)

export default router