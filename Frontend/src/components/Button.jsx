import React from 'react'
// here children is a fancy word but it refers to the text passed for btn .
function Button({
    children,
    type='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}{...props}>
        {children}
    </button>
  )
}

export default Button