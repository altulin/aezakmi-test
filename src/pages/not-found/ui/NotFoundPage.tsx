import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Go to home page</Link>
    </main>
  );
};
