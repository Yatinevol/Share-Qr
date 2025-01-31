import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import {getCurrentUser } from './services/auth.js'
import { login, logout } from './features/authSlice.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import {  Routes,Route } from 'react-router-dom'
import Login from './components/Login.jsx'
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
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
     
        <main>
          <Routes>  {/* ✅ Only use Routes, since BrowserRouter is in main.jsx */}
            <Route path="/" element={<Header />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null
}

export default App
