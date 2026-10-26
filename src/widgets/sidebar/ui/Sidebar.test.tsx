import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import {
  selectIsAuthenticated,
  sessionReducer,
  setSession,
} from '@/entities/session';
import { Sidebar } from './Sidebar';

const renderSidebar = () => {
  const store = configureStore({ reducer: { session: sessionReducer } });
  store.dispatch(setSession('demo@example.com'));
  const router = createMemoryRouter([{ path: '*', element: <Sidebar /> }], {
    initialEntries: ['/cards/preview'],
  });
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  return { store, user: userEvent.setup() };
};

describe('Sidebar', () => {
  beforeEach(() => localStorage.clear());

  it('expands and collapses, and remembers the choice', async () => {
    const { user } = renderSidebar();

    await user.click(
      await screen.findByRole('button', { name: 'Expand menu' })
    );

    const collapse = screen.getByRole('button', { name: 'Collapse menu' });
    expect(collapse).toHaveAttribute('aria-expanded', 'true');
    expect(localStorage.getItem('sidebar-expanded')).toBe('true');

    await user.click(collapse);

    expect(screen.getByRole('button', { name: 'Expand menu' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(localStorage.getItem('sidebar-expanded')).toBe('false');
  });

  it('marks Cards as the current page on the whole cards section', async () => {
    renderSidebar();

    expect(await screen.findByRole('link', { name: /Cards/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('asks for confirmation before logging out', async () => {
    const { store, user } = renderSidebar();

    await user.click(await screen.findByRole('button', { name: /Logout/ }));
    expect(
      screen.getByRole('dialog', { name: 'Log out?' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(selectIsAuthenticated(store.getState())).toBe(true);

    await user.click(screen.getByRole('button', { name: /Logout/ }));
    await user.click(screen.getByRole('button', { name: 'Log out' }));
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });
});
