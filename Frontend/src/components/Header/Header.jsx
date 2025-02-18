import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Container, Logo} from '../index.js'
import {LogoutBtn} from '../index.js'
import { Menu, X } from 'lucide-react'
function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state)=>state.auth.status)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navItems = [
    {
      name : "MyQr",
      slug : "/myqr",
      active : true
    },
    {
      name : "Qrs",
      slug : "/qr",
      active : true
    },
    {
      name : "upload",
      slug : "/",
      active : true
    }
  ]
  
  return (
    <header className="py-4" style={{backgroundColor : "oklch(0.26 0.03 256.32)"}}>
      <Container>
        <nav className="flex items-center justify-between bg-gray-100 rounded-full px-6 py-2">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex-shrink-0">
              <Logo className="w-10 h-10" />
            </Link>
            <ul className="hidden md:flex items-center space-x-2">
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:block">
            {authStatus ? (
              <LogoutBtn className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200" />
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="px-4 mx-2 py-2 bg-[#00a35c] font-semibold text-white rounded-full hover:bg-[#29714a] transition duration-200"
              >
                Sign Up
              </button>
            )}
            {!authStatus && <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-[#00a35c] font-semibold text-white rounded-full hover:bg-[#29714a] transition duration-200"
              >
                Login
              </button>}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-gray-100 rounded-lg p-4">
            <ul className="space-y-2">
              {navItems.map((eachItem) =>
                eachItem.active ? (
                  <li key={eachItem.name}>
                    <button
                      onClick={() => {
                        navigate(eachItem.slug);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-full transition duration-200"
                    >
                      {eachItem.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <div className="mt-4 space-y-2">
              {authStatus ? (
                <LogoutBtn className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200" />
              ) : (
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 font-semibold bg-[#00a35c] text-white rounded-full hover:bg-[#29714a] transition duration-200 "
                >
                  Sign Up
                </button>
              )}
              {!authStatus && (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-[#00a35c] text-white rounded-full hover:bg-[#29714a] transition duration-200 font-semibold"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header