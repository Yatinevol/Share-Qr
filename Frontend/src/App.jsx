import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import {useDispatch} from "react-redux"
import { loginUser, registerUser } from './services/auth.js'
function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(()=>{

  },[])
  return (
    <>
     
    </>
  )
}

export default App
