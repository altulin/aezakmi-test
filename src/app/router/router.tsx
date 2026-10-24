import { createBrowserRouter, Navigate } from 'react-router';

import {
  CardFormPage,
  CardPreviewPage,
  LoginPage,
  NotFoundPage,
  RatesPage,
} from './pages';
import { RootLayout } from './RootLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';

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
          { path: '/', element: <Navigate to="/rates" replace /> },
          { path: '/rates', element: <RatesPage /> },
          { path: '/cards/new', element: <CardFormPage /> },
          { path: '/cards/preview', element: <CardPreviewPage /> },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
