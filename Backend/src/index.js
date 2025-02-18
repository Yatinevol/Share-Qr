import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/server.db.js";
dotenv.config({path:'./env'})
import cron from "node-cron"
import axios from "axios"

cron.schedule('*/14 * * * *', async () => {
    try {
      const response = await axios.get('https://share-qr.onrender.com/api/v1/qr/health');
      console.log('Health check ping successful:', response.data);
    } catch (error) {
      console.error('Health check ping failed:', error.message);
    }
  });
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed!!",err);
})