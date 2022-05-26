import { Router } from "express"

import * as authController from "../controllers/authController.js"
import loginValidator from "../validations/auth/loginValidator.js"
import singupValidator from "../validations/auth/singupValidator.js"

const router = Router()

router.get('/singup', authController.singupGet)
router.post('/singup', singupValidator, authController.singupPost)
router.get('/login', authController.loginGet)
router.post('/login', loginValidator, authController.loginPost)
router.get('/logout', authController.logout)

export default router