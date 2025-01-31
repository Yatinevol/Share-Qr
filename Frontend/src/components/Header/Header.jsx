import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Container} from '../index.js'
function Header() {
  const navigate = useNavigate()
  const authStatus = useSelector((state)=>state.auth.status)
  const navItems = [
    {
      name : "MyQr",
      slug : "user/me",
      active : true
    },
    {
      name : "Qrs",
      slug : "qr/",
      active : true
    },
    
  ]
  return (
    <header>
      <Container>
        <nav>
          {/* <div>
            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div> */}
          <ul className='flex'>
            {navItems.map((eachItem)=> eachItem.active ? (
              <li key={eachItem.name}>
                <button onClick={()=> navigate(eachItem.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {eachItem.name}
                </button>
              </li>
            ): null)}

            {/* { authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )} */}
             
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header