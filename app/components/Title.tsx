import React from 'react'

const Title = ({children, dark}: {children: React.ReactNode, dark?: boolean}) => {
  return (
    <h1
        className={`text-5xl font-jakarta font-bold text-center ${dark ? "text-foreground" : "text-[#FFE6D0]"}`}
    >
        {children}
    </h1>
  )
}

export default Title