import React from 'react'

interface Auth {
    loading: boolean,
    loggedIn: boolean,
    isAdmin: boolean,
}

const useAuth = () : Auth => {
  return  {
    loading: false,
    loggedIn: true,
    isAdmin: false,
  }
}

export default useAuth;