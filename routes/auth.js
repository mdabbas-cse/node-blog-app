import { Router } from "express"

import * as authController from "../controllers/authController.js"
import { isAuthencated, isLoggedIn } from "../middleware/authMiddleware.js"
import loginValidator from "../validations/auth/loginValidator.js"
import singupValidator from "../validations/auth/singupValidator.js"

const router = Router()

router.get('/singup', isLoggedIn, authController.singupGet)
router.post('/singup', isLoggedIn, singupValidator, authController.singupPost)
router.get('/login', isLoggedIn, authController.loginGet)
router.post('/login', isLoggedIn, loginValidator, authController.loginPost)
router.get('/logout', isAuthencated, authController.logout)

export default router