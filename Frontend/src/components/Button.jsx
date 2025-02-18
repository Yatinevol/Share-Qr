import React from 'react'
// here children is a fancy word but it refers to the text passed for btn .
function Button({
    children,
    type='button',
    bgColor = '',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${textColor}`}{...props}>
        {children}
    </button>
  )
}

export default Button