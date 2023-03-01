import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/sign-in" state={{from: location}} replace />
  }

  return children
}
