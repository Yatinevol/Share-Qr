import {Router} from "express"
import {getAllQr, uploadQr} from "../controllers/qr.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
const router = Router()

router.route("/").get(getAllQr)
router.route("/upload").patch(upload.single("messqr"), uploadQr)
export default router