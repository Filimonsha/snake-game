import styles from './error.module.scss';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from '../../const/route';

interface IErrorPage {
  title: string,
  code: string,
}

const ErrorPage: React.FC<IErrorPage> = ({ title, code }) => (
  <div className={styles.errorPage}>
    <div className={styles.errorPageContainer}>
      <h1 className={styles.errorPageTitle}>
        {title}
      </h1>
      <p className={styles.errorPageCode}>
        {code}
      </p>
      <Link
        to={MAIN_ROUTE}
        className={styles.errorPageLink}
      >
        Go to the main page
      </Link>
    </div>
  </div>
);

export default ErrorPage;
