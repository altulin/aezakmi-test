import { createBrowserRouter, Navigate } from 'react-router';

import {
  CardFormPage,
  CardPreviewPage,
  LoginPage,
  NotFoundPage,
  RatesPage,
} from './pages';
import { RootLayout } from './RootLayout';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/rates" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/rates', element: <RatesPage /> },
      { path: '/cards/new', element: <CardFormPage /> },
      { path: '/cards/preview', element: <CardPreviewPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
