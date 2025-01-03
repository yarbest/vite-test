import { useContext } from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '@context/auth'
import { paths } from '@routes/index'
import Button from '@shared/ui/Button'

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => {
    login()
    // in location.state there is a location, which was requested before login, it is set in PrivateRoute
    navigate((location.state as Location | undefined)?.pathname ?? paths.todos, { replace: true })
  }
  return (
    <Button onClick={handleLogin} label="Login" />
  )
}

export default LoginPage
