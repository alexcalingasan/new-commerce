import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}
const AuthLayout = ({children}:Props) => {
  return (
    <div className='h-screen flex items-center w-full'>{children}</div>
  )
}

export default AuthLayout;