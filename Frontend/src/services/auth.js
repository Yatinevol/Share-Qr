import axios from "axios";
import base_url  from "./conf.js";

const registerUser = async({email,username,password})=>{
    const response = await axios.post(`${base_url}/user/register`,{email,username,password})
    return response.data
}

const loginUser = async({email, password})=>{
    const response = await axios.post(`${base_url}/user/login`,{email,password})
    return response.data
}

const logoutUser = async()=>{
     await axios.post(`${base_url}/user/logout`)
    return null
}
const getCurrentUser = async()=>{
    const token = localStorage.getItem("token");
    const response  = await axios.get(`${base_url}/user/me`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

export {registerUser, loginUser, getCurrentUser, logoutUser}