import {ApiError} from "../utils/ApiError.utils.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.utils.js";

const generateAccessTokenPlease=asyncHandler(async(userId)=>{
    const user =await  User.findById(userId)
    const accessToken = await user.generateAccessToken();
    user.refreshToken= accessToken
    await user.save({validBeforeSave:false})
    return accessToken
})

const options = {
    httpOnly: true,
    secure:process.env.NODE_ENV ==='production',
    sameSite:"strict"
}

const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body

    if([username, email,password].some((field)=>{
         field === ""
    })
     )   {
            throw new ApiError(400,"All fields are required!")
    }

    const registeredUser = await User.findOne({
        $or:[{email}, {username}]
    })

    if(registeredUser){
        throw new ApiError("User already exists!")
    }
    const user = await User.create({
        username,
        email,
        password

    })

    if(!user){
        throw new ApiError(500,"error while creating the user")
    }
    return res.status(200).json(new ApiResponse(200,user,"User registered Successfully!"))
})

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new ApiError(400,"All fields are required")
    }

    const emailFound = await User.findOne({email})
    if(!emailFound){
        throw new ApiError(400,"Email or password is incorrect")
    }
    const passwordCheck = await emailFound.isPasswordCorrect(password)
    if(!passwordCheck){
        throw new ApiError(400,"Email or password is incorrect")
    }

    const accessToken =  generateAccessTokenPlease(emailFound._id)

    const loggedInUser = await User.findById(emailFound._id).select("-password -refreshToken")

    return res.status(200).cookie("accessToken",accessToken,options).json(new ApiResponse(200,{
        user: loggedInUser, accessToken
    },
    "Logged In Successfully!!!"))
})

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200).clearCookie("accessToken",options)
           .json(new ApiResponse(200,{},"successfully logged out!!"))

})


export {registerUser, loginUser, logoutUser}