import { useCallback, useState } from 'react'

import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') === 'true',
  )

  const login = useCallback(() => {
    setIsLogin(true)
    localStorage.setItem('isLogin', 'true')
  }, [])

  const logout = useCallback(() => {
    setIsLogin(false)
    localStorage.removeItem('isLogin')
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
