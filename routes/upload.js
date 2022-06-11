import { Router } from "express"
import { uploadController } from "../controllers/uploadController.js"
import { isAuthencated } from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js"

const router = Router()

router.post('/profile-pic', isAuthencated, upload.single('profilePicture'), uploadController)

export default router