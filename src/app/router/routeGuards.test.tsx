import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { sessionReducer, setSession } from '@/entities/session';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

const renderAt = (path: string, isLoggedIn: boolean) => {
  const store = configureStore({ reducer: { session: sessionReducer } });
  if (isLoggedIn) store.dispatch(setSession('demo@example.com'));

  const router = createMemoryRouter(
    [
      {
        element: <GuestRoute />,
        children: [{ path: '/login', element: <h1>Login page</h1> }],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/rates', element: <h1>Rates page</h1> },
          { path: '/cards/new', element: <h1>Card form</h1> },
        ],
      },
    ],
    { initialEntries: [path] }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  return { store, router };
};

describe('route guards', () => {
  it('redirects a guest from a protected page to login', async () => {
    const { router } = renderAt('/cards/new', false);

    expect(
      await screen.findByRole('heading', { name: 'Login page' })
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });

  it('returns to the requested page after login', async () => {
    const { store } = renderAt('/cards/new', false);
    await screen.findByRole('heading', { name: 'Login page' });

    act(() => {
      store.dispatch(setSession('demo@example.com'));
    });

    expect(
      await screen.findByRole('heading', { name: 'Card form' })
    ).toBeInTheDocument();
  });

  it('sends a logged in user from login to rates', async () => {
    renderAt('/login', true);

    expect(
      await screen.findByRole('heading', { name: 'Rates page' })
    ).toBeInTheDocument();
  });
});
