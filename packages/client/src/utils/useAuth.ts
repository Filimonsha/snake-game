import { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '../store/api/yadnex/auth/authApi'

type TLoadingStatus = 'loading' | 'success' | 'error'

export const useAuth = () => {
  const { isSuccess, isError, isLoading } = useGetUserInfoQuery()
  const [loadingStatus, setLoadingStatus] = useState<TLoadingStatus>('loading')

  useEffect(() => {
    if (isSuccess) {
      setLoadingStatus('success')
    }
    
    if (isError) {
      setLoadingStatus('error')
    }
    
    if (isLoading) {
      setLoadingStatus('loading')
    }
  }, [isSuccess, isError, isLoading])

  return loadingStatus
}
