import { Suspense } from 'react';
import { Outlet } from 'react-router';

export const RootLayout = () => (
  <Suspense fallback={<p>Loading…</p>}>
    <Outlet />
  </Suspense>
);
