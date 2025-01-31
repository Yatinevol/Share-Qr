import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import {getCurrentUser } from './services/auth.js'
import { login, logout } from './features/authSlice.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{
    getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  return !loading ? (
    <div>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
       {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>  
    </div>
  ) : null
}

export default App
