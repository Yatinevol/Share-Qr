import mongoose,{Schema} from "mongoose"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        trim:true,
        required:true
    },
    pfp:{
        type:String,

    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)