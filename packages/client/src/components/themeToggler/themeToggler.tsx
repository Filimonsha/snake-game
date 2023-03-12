import styles from './themeToggler.module.scss'
import { useGetThemeQuery, useUpdateThemeMutation } from '../../store/api/backend/theme/themeApi'
import { ThemeTypes } from '../../types/theme'


const ThemeToggler = () => {
  const { data } = useGetThemeQuery()

  const [updateTheme] = useUpdateThemeMutation()
  // фетчим тему

  const toggleTheme = () => {
    if (data) {
      console.log(data,"data")
      if (data.theme === ThemeTypes.DARK) {
        updateTheme({ theme: ThemeTypes.LIGHT })
      } else {
        updateTheme({ theme: ThemeTypes.DARK })
      }
      document.documentElement.className = data.theme
    }
  }

  return (
    <div className={styles.themeToggler}>
      <p className={styles.themeDescription}>
        Theme: {data?.theme}
      </p>
      <button
        onClick={toggleTheme}
        className={styles.themeButton}
      >
        Change
      </button>
    </div>
  )
}

export default ThemeToggler
