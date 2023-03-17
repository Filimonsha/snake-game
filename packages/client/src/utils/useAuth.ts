import { useEffect, useState } from 'react'
import { useGetUserInfoQuery } from '../store/api/yadnex/auth/authApi'
import { useGetThemeQuery } from '../store/api/backend/theme/themeApi'

type TLoadingStatus = 'loading' | 'success' | 'error'

export const useAuth = () => {
  const { isSuccess, isError, isLoading } = useGetUserInfoQuery()
  const [loadingStatus, setLoadingStatus] = useState<TLoadingStatus>('loading')
  const {data} = useGetThemeQuery(undefined,{skip:loadingStatus !=='success'})
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

  useEffect(()=>{
    if (data){
      document.documentElement.className = data.theme
    }
  },[data])
  return loadingStatus
}
