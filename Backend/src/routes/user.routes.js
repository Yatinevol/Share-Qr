import {Router} from "express"
import { registerUser, loginUser, logoutUser,getCurrentUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlwares.js"
import { get } from "mongoose"
const router = Router()

router.route("/register").post(registerUser)
router.route("/logIn").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/me").get(verifyJWT,getCurrentUser)

export default router