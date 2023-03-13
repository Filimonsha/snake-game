import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { SIGN_IN_ROUTE } from '../const/route'

const  RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const isLogged = useAuth()
  console.log(isLogged)

  if (isLogged === 'loading') {
    return <h2>Loading</h2>
  }
    
  if (isLogged === 'error') {
    navigate(SIGN_IN_ROUTE, { state: { from: location.pathname } })
  }

  return children
}

export default RequireAuth
