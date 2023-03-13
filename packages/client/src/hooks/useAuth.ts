import { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '../store/api/yadnex/auth/authApi'


export const useAuth = () => {
  const { isSuccess, isError, isLoading } = useGetUserInfoQuery()
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (isSuccess) {
      setIsLogged(true)
    }
    
    if (isError) {
      setIsLogged(false)
    }
    
    if (isLoading) {
      setIsLogged(undefined)
    }
  }, [isSuccess, isError, isLoading])

  return isLogged
}

