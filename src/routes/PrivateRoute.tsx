import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { paths } from './paths'
import { AuthContext } from 'src/context/auth/AuthContext'

interface PrivateRouteProps {
  children: React.ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation()
  const { isLogin } = useContext(AuthContext)

  if (!isLogin) {
    // state allows to pass data to the next route,
    // and on login page (after successful login) we can redirect back to the page
    // which was initially requested before login
    return <Navigate to={paths.login} state={location} replace />
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoute
