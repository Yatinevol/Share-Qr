import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { login as loginAuth } from '../features/authSlice.js'
import { getCurrentUser, loginUser } from '../services/auth.js'
import {useForm} from "react-hook-form"
import {Button, Input, Logo} from "./index.js"
import { Link } from 'react-router-dom'
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
    <div>
       <div>
       <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
            <div>
                <Input
                label="Email: "
                type="email"
                placeholder="Enter your email"
                {...register("email",{
                    required : true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <Input
                label="Password"
                type="password"
                placeholder="Enter your Password"
                {...register("password",{
                    required : true
                })}
                />

                <Button
                type='submit'
                className='w-full'
                >Sign In
                </Button>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Login