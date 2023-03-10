import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { SIGN_IN_ROUTE } from '../const/route'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const isLogged = useAuth()
  
  if (isLogged === undefined) {
    return <h2>Loading</h2>
  }

  if (isLogged) {
    return children
  } else {
    navigate(SIGN_IN_ROUTE, { state: { from: location.pathname } })
    return null
  }
}
