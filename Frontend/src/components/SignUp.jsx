import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCurrentUser, registerUser } from '../services/auth.js'
import {useForm} from "react-hook-form"
import { login as loginAuth } from '../features/authSlice.js'
import {Input, Logo, Button} from "./index.js"
function SignUp() {
const [error, setError] = useState("")
// const dispatch = useDispatch()
const navigate = useNavigate()
const {register, handleSubmit} = useForm()
const SignUp = async(data)=>{
    setError("")
   try {
     const registered = await registerUser(data)
     if(registered){
        //  const userData = await getCurrentUser()
        //  if(userData) dispatch(loginAuth(userData))
         navigate("/login")
     }
   } catch (error) {
        setError(error.message)
   }
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"style={{backgroundColor:"oklch(0.26 0.03 256.32)"}}>
      <div className="w-full max-w-md rounded-xl p-10 shadow-md bg-white" >
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="90%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold mb-2">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(SignUp)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              label="Username: "
              placeholder="Enter your username"
              className = "outline-blue-300"
              {...register("username", {
                required: true,
              })}
            />

            <Input
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full cursor-pointer text-sm font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-[1px]">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp 