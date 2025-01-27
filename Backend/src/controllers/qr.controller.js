import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.utils.js"
import { Qr } from "../models/qr.model.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"
import {uploadOnCloudinary} from "../utils/cloudninary.js"

const uploadQr =  asyncHandler(async (req, res)=>{
    
    const senderId = req.user._id
    // console.log(req.file);
    // console.log(req.file?.path);
    const messqrFilePath = req.file?.path
    // console.log("path found: ", messqrFilePath);
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

const getAllQr = asyncHandler(async(req,res)=>{
    const {page=1, limit=10} = req.query

    const pageNum = JSON.parse(page,10)
    const limitNum = JSON.parse(limit,10)
    const skipAmt = (pageNum - 1) * limitNum

    try {
        const allQr = await Qr.find().sort({createdAt:-1}).skip(skipAmt).limit(limitNum)
    
        if(!allQr || allQr.length===0){
            throw new ApiError(400,"No qr found!")
        }
        const totalQr =await Qr.countDocuments()
        
        const pagination = {
            totalPages :  Math.ceil(totalQr / limitNum),
            currentPage : pageNum,
            totalQr,
            pageSize: limitNum
        }
        return res.status(200).json(new ApiResponse(200,{allQr, pagination}))
    } catch (error) {
            console.log("No qr found",error);
    }
})
export {uploadQr, getAllQr}