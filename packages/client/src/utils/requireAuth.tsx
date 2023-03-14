import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { SIGN_IN_ROUTE } from '../const/route'
import { ReactNode, useEffect } from 'react'
import { useGetThemeQuery } from '../store/api/backend/theme/themeApi'

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const {data} = useGetThemeQuery()

  return (
    <div>
      {children}
    </div>)
}

const  RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isLogged = useAuth()

  if (isLogged === 'loading') {
    return <h2>Loading</h2>
  }

  if (isLogged === 'error') {
    navigate(SIGN_IN_ROUTE, { state: { from: location.pathname } })
  }


  return isLogged === 'success' ? children : null

}

export default RequireAuth
