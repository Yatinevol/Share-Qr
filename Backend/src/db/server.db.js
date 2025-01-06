import mongoose from "mongoose";
import DB_NAME from "../constant.js";
const connectDB =async function(){
   try {
     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log("MongoDB connected successfully!!!",connectionInstance.connection.host);
   } catch (error) {
        console.log("MongoDB Connection failed :<",error);
   }
}
export default connectDB