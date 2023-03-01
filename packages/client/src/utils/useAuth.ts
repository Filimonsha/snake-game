import { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '../store/api/yadnex/auth/authApi'


export const useAuth = () => {
  const { data } = useGetUserInfoQuery()
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    if (!data) {
      return setIsLogged(false)
    }

    return setIsLogged(true)

  }, [data])

  return isLogged as typeof isLogged
}
