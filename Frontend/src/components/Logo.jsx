import React from 'react'
import img from "/logo.png"
function Logo({
    className ="",
    ...props
}) {
  return (
    <div>
        <img src={img} alt="" className={`${className}`} {...props}/>
    </div>
  )
}

export default Logo