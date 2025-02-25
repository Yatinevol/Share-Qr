import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.utils.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const verifyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        
        if(!token){
            throw new ApiError("401","unauthorized request")
        }
        
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        
        if(!user){
            throw new ApiError(400,"Invalid accessToken")
        }
        
        req.user = user;
       
        next()
    } catch (error) {
        throw new ApiError(400,error?.message || "Invalid access Token")
    }
})