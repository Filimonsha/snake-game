import { useEffect } from 'react'
import './app.scss'
import { useGetThemeQuery } from '../store/api/backend/theme/themeApi'
import { Toast } from '../components/toast'
import { Pages } from '../components/pages'


function App() {
  const { data: themeData } = useGetThemeQuery()

  const setTheme = () => {
    if (themeData) document.documentElement.className = themeData.theme
  }

  useEffect(() => {
    setTheme()
  }, [themeData])
  
  return (
    <>
      <Toast userTheme='light' />
      <Pages/>
    </>
  )
}

export default App
