import {Router} from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlwares.js"
const router = Router()

router.route("/register").post(registerUser)
router.route("/logIn").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)


export default router