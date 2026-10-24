import { lazy } from 'react';

export const LoginPage = lazy(() =>
  import('@/pages/login').then((m) => ({ default: m.LoginPage }))
);

export const RatesPage = lazy(() =>
  import('@/pages/rates').then((m) => ({ default: m.RatesPage }))
);

export const CardFormPage = lazy(() =>
  import('@/pages/card-form').then((m) => ({ default: m.CardFormPage }))
);

export const CardPreviewPage = lazy(() =>
  import('@/pages/card-preview').then((m) => ({ default: m.CardPreviewPage }))
);

export const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage }))
);
