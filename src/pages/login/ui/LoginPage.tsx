import { LoginForm } from '@/features/auth';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Log in</h1>
          <p className={styles.subtitle}>Welcome Back</p>
        </header>
        <LoginForm />
      </div>
    </main>
  );
};
