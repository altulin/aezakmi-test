import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import { Button } from '@/shared/ui';
import styles from './RouteError.module.scss';

// After a redeploy the old chunk names are gone, and a lazy page fails to load.
// A full reload fetches the new index.html with the new chunk names.
const isChunkLoadError = (error: unknown) =>
  error instanceof Error &&
  /dynamically imported module|Importing a module script failed|Loading chunk/i.test(
    error.message
  );

const getErrorText = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }
  if (isChunkLoadError(error)) {
    return 'The app was updated or the connection dropped while loading this page.';
  }
  return 'Something went wrong while showing this page.';
};

export const RouteError = () => {
  const error = useRouteError();

  if (import.meta.env.DEV) {
    console.error(error);
  }

  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠️
      </span>
      <h1 className={styles.title}>Page failed to load</h1>
      <p className={styles.text}>{getErrorText(error)}</p>
      <div className={styles.actions}>
        <Button size="md" onClick={() => window.location.reload()}>
          Reload page
        </Button>
        <Link to="/" className={styles.homeLink}>
          Go to home page
        </Link>
      </div>
    </div>
  );
};
