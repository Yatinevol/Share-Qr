import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({limit:"30kb",extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


//importing all the routers :
import userRouter from "./routes/user.routes.js"
import qrRouter from "./routes/qr.routes.js"
app.use("/api/v1/user",userRouter)
app.use("/api/v1/qr",qrRouter)
export default app