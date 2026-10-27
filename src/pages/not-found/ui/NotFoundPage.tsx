import { Link } from 'react-router';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          Go to home page
        </Link>
      </div>
    </main>
  );
};
