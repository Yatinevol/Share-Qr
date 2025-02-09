import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Protected({authentication=true,children}) {
    // this authentication we are getting is from the user; there is also an easy by directly using authStatus.
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, authentication, navigate])

  return loader ? <div>Loading.....</div> : <>{children}</>
}

export default Protected