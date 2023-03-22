import styles from './themeToggler.module.scss'
import { useGetThemeQuery, useUpdateThemeMutation } from '../../store/api/backend/theme/themeApi'
import { ThemeTypes } from '../../types/theme'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'


const ThemeToggler = () => {
  const { data } = useGetThemeQuery()

  const [updateTheme] = useUpdateThemeMutation()

  const toggleTheme = async () => {
    if (data) {
      if (data.theme === ThemeTypes.DARK) {
        await updateTheme({ theme: ThemeTypes.LIGHT })
        document.documentElement.className = ThemeTypes.LIGHT
      } else {
        await updateTheme({ theme: ThemeTypes.DARK })
        document.documentElement.className = ThemeTypes.DARK
      }
    } else {
      toast.error('Cannot update theme');
    }
  }

  return (
    <div className={styles.themeToggler}>
      <p className={styles.themeDescription}>
        Theme:
      </p>
      <Form.Switch
        className={styles.switch}
        type="switch"
        id="custom-switch"
        label={data?.theme}
        checked={data?.theme === ThemeTypes.DARK}
        onChange={toggleTheme}
      />
    </div>
  )
}

export default ThemeToggler
