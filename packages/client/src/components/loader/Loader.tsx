import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Loader;