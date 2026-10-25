import { createBrowserRouter, Navigate } from 'react-router';

import { AppLayout } from './AppLayout';
import { GuestRoute } from './GuestRoute';
import {
  CardFormPage,
  CardPreviewPage,
  LoginPage,
  NotFoundPage,
  RatesPage,
} from './pages';
import { ProtectedRoute } from './ProtectedRoute';
import { RootLayout } from './RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [{ path: '/login', element: <LoginPage /> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/', element: <Navigate to="/rates" replace /> },
              { path: '/rates', element: <RatesPage /> },
              { path: '/cards/new', element: <CardFormPage /> },
              { path: '/cards/preview', element: <CardPreviewPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
