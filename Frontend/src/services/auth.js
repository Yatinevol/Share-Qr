import axios from "axios";
import base_url  from "./conf.js";

const registerUser = async(userData)=>{
    const response = await axios.post(`${base_url}/user/register`,userData)
    return response.data
}

const loginUser = async(userData)=>{
    const response = await axios.post(`${base_url}/user/login`,userData)
    return response.data
}

export {registerUser, loginUser}