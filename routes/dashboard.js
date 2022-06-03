import { Router } from "express"
import * as dashboardController from "../controllers/dashboardController.js"
import { isAuthencated } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/", isAuthencated, dashboardController.index)

router.get("/create-profile", isAuthencated, dashboardController.createProfileGet)
router.post("/create-profile", isAuthencated, dashboardController.createProfilePost)
router.get("/edit-profile", isAuthencated, dashboardController.editProfileGet)
router.post("/edit-profile", isAuthencated, dashboardController.editProfilePost)

export default router