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
import { RouteError } from './RouteError';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
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
              {
                errorElement: <RouteError />,
                children: [
                  { path: '/', element: <Navigate to="/rates" replace /> },
                  { path: '/rates', element: <RatesPage /> },
                  { path: '/cards/new', element: <CardFormPage /> },
                  { path: '/cards/preview', element: <CardPreviewPage /> },
                ],
              },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
