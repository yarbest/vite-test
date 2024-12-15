import React from 'react'

interface AuthContextType {
  isLogin: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
})
