import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.utils.js"
import { Qr } from "../models/qr.model.js"
import ApiResponse from "../utils/ApiResponse.utils.js"
import uploadOnCloudinary from "../utils/cloudninary.js"
const uploadQr =  asyncHandler(async (req, res)=>{
    
    const senderId = req.user._id
    const messqrFilePath = req.file?.messqr
    if(!messqrFilePath){
        throw new ApiError(400,"Mess Qr is required")
    }

    try {
        const resQr = await uploadOnCloudinary(messqrFilePath)
        const createdQr = await Qr.create({
            sendBy: senderId,
            messqr: resQr.url
        })
    
        return res.status(200).json( new ApiResponse(200,createdQr,"Qr uploaded successfully!"))
    } catch (error) {
        console.log("Error while uploading on cloudinary!",error);
    }
})


export {uploadQr}