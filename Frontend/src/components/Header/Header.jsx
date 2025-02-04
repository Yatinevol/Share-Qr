import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Container, Logo} from '../index.js'
import {LogoutBtn} from '../index.js'
function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state)=>state.auth.status)
  const navItems = [
    {
      name : "MyQr",
      slug : "/signup",
      active : true
    },
    {
      name : "Qrs",
      slug : "/qr",
      active : true
    },
    {
      name : "SignUp",
      slug : "/signup",
      active : true
    },
    {
      name : "LogIn",
      slug : "/login",
      active : true
    },
    {
      name : "upload",
      slug : "/home",
      active : true
    }
    
  ]
  
  return (
<header className="bg-white shadow-md py-4">
      <Container>
        <nav className="flex items-center justify-between bg-gray-100 rounded-full px-6 py-2">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex-shrink-0">
              <Logo className="w-10 h-10" />
            </Link>
            <ul className="flex items-center space-x-2">
              {navItems.map((eachItem) =>
                eachItem.active ? (
                  <li key={eachItem.name}>
                    <button
                      onClick={() => navigate(eachItem.slug)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-full transition duration-200"
                    >
                      {eachItem.name}
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
          <div>
            {authStatus ? (
              <LogoutBtn className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200" />
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header