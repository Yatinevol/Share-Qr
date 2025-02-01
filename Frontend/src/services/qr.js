import axios from "axios";
import base_url from "./conf.js";

const uploadUserFile = async(formData)=>{
    const token = localStorage.getItem("token")
    await axios.patch(`${base_url}/qr/upload`,formData,{
        // withCredentials : true,
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        }
    })
    
}

export {uploadUserFile}