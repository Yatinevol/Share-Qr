import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../services/auth.js'
import { logout } from '../../features/authSlice.js'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = async()=>{
        await logoutUser()
        .then(()=> dispatch(logout()))
    }
  return (
<button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
    Logout
</button>
  )
}

export default LogoutBtn