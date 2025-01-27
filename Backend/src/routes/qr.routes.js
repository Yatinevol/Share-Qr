import {Router} from "express"
import {getAllQr, uploadQr} from "../controllers/qr.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlwares.js"
const router = Router()
router.use(verifyJWT)
router.route("/").get(getAllQr)
router.route("/upload").patch(upload.single("messqr"), uploadQr)
export default router