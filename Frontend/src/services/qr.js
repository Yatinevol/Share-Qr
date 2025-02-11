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

const getAllQrs = async()=>{
    const token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/qr/`,{
        headers:{
            "Authorization" : `Bearer ${token}`,

        }
    })
    return response.data
}

const getUserQr = async()=>{
    const token = localStorage.getItem("token")
    const response = await axios.get(`${base_url}/qr/myqr`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    return response.data
}
export {uploadUserFile, getAllQrs, getUserQr}