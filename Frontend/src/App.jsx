import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import {getCurrentUser } from './services/auth.js'
import { login, logout } from './features/authSlice.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    getCurrentUser()
    .then((userData)=>{
      console.log("app.jsx mai userData kya aya : ");
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[dispatch])
  return !loading ? (
    <div className="min-h-screen flex flex-col" style={{backgroundColor : "oklch(0.26 0.03 256.32)"}}>
      <Header /> 
      
      <main className="flex-grow">
        <Outlet />  
      </main>
      
      <Footer /> 
    </div>
  ) : null
}

export default App
