import mongoose,{Schema} from "mongoose";

const qrSchema = new Schema({
    sendBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    messqr:{
        type:String
    },
    floor : {
        type : String,
        enum : ["ff", "gf"],
        required : true
    }
},{timestamps:true})

export const Qr = mongoose.model("Qr",qrSchema)