import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.utils.js"
import { Qr } from "../models/qr.model.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js"
import {uploadOnCloudinary} from "../utils/cloudninary.js"
import extractFileName from "../utils/extractFileName.js"
import mongoose from "mongoose"
import { v2 as cloudinary } from 'cloudinary';

const uploadQr =  asyncHandler(async (req, res)=>{
    
    const senderId = req.user._id
    const messqrFilePath = req.file?.path
    const floorTag = req.body.floorTag
    
    // console.log("path found: ", messqrFilePath);
    if(!messqrFilePath || !floorTag){
        throw new ApiError(400,"Mess Qr is required")
    }

    try {
        const resQr = await uploadOnCloudinary(messqrFilePath)
        const createdQr = await Qr.create({
            sendBy: senderId,
            messqr: resQr.url,
            floor : floorTag
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

const getUserQr = asyncHandler(async(req,res)=>{
    const userId = req.user._id

    const userUploadedQr = await Qr.find({
        sendBy : userId
    }).sort({createdAt:-1})

    // if(!userUploadedQr){
    //     throw new ApiError(400,"no qr uploaded by the user")
    // }

    return res.status(200).json(new ApiResponse(200,userUploadedQr,"Successfully fetched uploaded Qr!"))
})

const deleteUserQr = asyncHandler(async(req,res)=>{
    const {messqrId} = req.params
    if(!mongoose.Types.ObjectId.isValid(messqrId)) throw new ApiError(400,"messqr invalid id")
    
    const qr = await Qr.findById(messqrId)

    if(!qr) {
        throw new ApiError(404,"messqr not found")
    }

    if(qr.sendBy.toString() !== req.user._id.toString()){
        return res.status(401).json(new ApiResponse(404,"user not authorized"));
    }

    if(qr.messqr){
        try {
            const fileName = extractFileName(qr.messqr);
            // if(fileName){
            //    await uploadOnCloudinary.destroy(fileName)
            // }
            await cloudinary.uploader.destroy(fileName)
        } catch (error) {
            console.error("Cloudinary Delete Error:", error);
            throw new ApiError(500|| error,"bhai delete nhi ho pa rha :>")
        }
    }
       
    await Qr.findByIdAndDelete(messqrId)
    return res.status(200).json(new ApiResponse(200,{},"Your messqr deleted Successfully"))

})
const deleteQr = asyncHandler(async(req,res)=>{
    const {messqrId} = req.params
    console.log("messqrId:::",messqrId);
    
    if(!mongoose.Types.ObjectId.isValid(messqrId)) throw new ApiError(400,"messqr invalid id")
    
    const qr = await Qr.findById(messqrId)

    if(!qr) {
        throw new ApiError(404,"messqr not found")
    }

    if(qr.messqr){
        try {
            const fileName = extractFileName(qr.messqr);
            console.log("fileName::::::",fileName);
            await cloudinary.uploader.destroy(fileName)
        } catch (error) {
            console.error("Cloudinary Delete Error:", error);
            throw new ApiError(500|| error,"bhai delete nhi ho pa rha :>")
        }
    }
       
    await Qr.findByIdAndDelete(messqrId)
    return res.status(200).json(new ApiResponse(200,{},"Your messqr deleted Successfully"))

})
export {uploadQr, getAllQr, getUserQr,deleteUserQr, deleteQr}