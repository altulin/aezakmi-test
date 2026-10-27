import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '@/widgets/sidebar';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.inner}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};
