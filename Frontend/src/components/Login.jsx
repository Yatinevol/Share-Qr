import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { login as loginAuth } from '../features/authSlice.js'
import { getCurrentUser, loginUser } from '../services/auth.js'
import {useForm} from "react-hook-form"
import {Button, Input, Logo} from "./index.js"
import { Link } from 'react-router-dom'
import image from '../ai-image.jpeg'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const login = async(data)=>{
        setError("")
        try {
            const session = await loginUser(data)
            console.log("session in Login :",session);
            if(session.data.accessToken){
                localStorage.setItem("token",session.data.accessToken)
                console.log("session token: ",session.data.accessToken);
            }
            if(session){
               const userData = await getCurrentUser()
               console.log("userData: ",userData);
               if(userData) dispatch(loginAuth({userData}))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }       
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* QR Code Image Section */}
          <div className="md:w-1/2 bg-indigo-600">
            <div className="h-full flex items-center justify-center p-6">
              <img
                src={image}
                alt="QR Code Illustration"
                width={400}
                height={400}
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
              
            </div>
          </div>

          {/* Login Form Section */}
          <div className="md:w-1/2 p-8 space-y-8">
            <div>
              <div className="mb-6 flex justify-center">
                <span className="inline-block w-20 h-20">
                  <Logo width="100%" height="100%" />
                </span>
              </div>
              <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
              <p className="mt-3 text-center text-sm text-gray-600">
                Don&apos;t have any account?&nbsp;
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Email: "
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("password", {
                    required: true,
                  })}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login