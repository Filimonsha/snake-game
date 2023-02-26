import styles from './themeToggler.module.scss';


const ThemeToggler = () => {
  
  // фетчим тему
  const currentTheme = 'light';
  
  const toggleTheme = () => {
    console.log('Toggle');
  }
  
  return (
    <div className={styles.themeToggler}>
      <p className={styles.themeDescription}>
        Theme: {currentTheme}
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

export default ThemeToggler;
