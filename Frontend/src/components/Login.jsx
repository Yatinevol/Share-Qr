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
            // console.log("session in Login :",session);
            if(session.data.accessToken){
                localStorage.setItem("token",session.data.accessToken)
                // console.log("session token: ",session.data.accessToken);
            }
            if(session){
               const userData = await getCurrentUser()
              //  console.log("userData: ",userData);
               if(userData) dispatch(loginAuth({userData}))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }       
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[oklch(0.26_0.03_256.32)]">
    <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
      <div className="flex flex-col md:flex-row">
        {/* Left side: Login Form */}
        <div className="md:w-1/2 p-8 lg:p-12">
          <div className="space-y-8">
            {/* Logo and Header */}
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 transform transition-transform duration-300 hover:scale-110">
                  <Logo width="100%" height="100%" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 underline-offset-2 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              <div className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      },
                    })}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                Sign in to your account
              </Button>
            </form>

            {/* Optional: Additional Links */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>

        {/* Right side: Optional Decorative Panel */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-12">
          <div className="h-full flex flex-col justify-center text-white space-y-6">
            <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
            <p className="text-indigo-100">
              Sign in to access your account and continue your journey with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login