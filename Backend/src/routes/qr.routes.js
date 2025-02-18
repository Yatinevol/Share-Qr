import {Router} from "express"
import {deleteQr, deleteUserQr, getAllQr, getUserQr, healthCheck, uploadQr} from "../controllers/qr.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middlwares.js"
const router = Router()
// router.use(verifyJWT)
router.route("/").get(getAllQr)
router.route("/upload").patch(verifyJWT,upload.single("messqr"), uploadQr)
router.route("/myqr").get(verifyJWT,getUserQr)
router.route("/:messqrId").delete(verifyJWT,deleteUserQr)
router.route("/v2/:messqrId").delete(verifyJWT,deleteQr)
router.route("/health").get(healthCheck)
export default router