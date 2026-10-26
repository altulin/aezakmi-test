import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { selectIsAuthenticated, sessionReducer } from '@/entities/session';
import { LoginForm } from './LoginForm';

const renderForm = () => {
  const store = configureStore({ reducer: { session: sessionReducer } });
  render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
  return { store, user: userEvent.setup() };
};

const fillAndSubmit = async (
  user: ReturnType<typeof userEvent.setup>,
  email: string,
  password: string
) => {
  await user.type(screen.getByLabelText('Email address'), email);
  await user.type(screen.getByLabelText('Password'), password);
  await user.click(screen.getByRole('button', { name: 'Login' }));
};

describe('LoginForm', () => {
  it('shows field errors and marks fields invalid', async () => {
    const { store, user } = renderForm();

    await fillAndSubmit(user, 'not-an-email', '123');

    expect(
      await screen.findByText('Please enter a valid email address')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Password must be at least 6 characters')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });

  it('logs in with the demo credentials', async () => {
    const { store, user } = renderForm();

    await fillAndSubmit(user, 'demo@example.com', 'demo123');

    await waitFor(
      () => expect(selectIsAuthenticated(store.getState())).toBe(true),
      { timeout: 2000 }
    );
  });

  it('shows an error for wrong credentials', async () => {
    const { store, user } = renderForm();

    await fillAndSubmit(user, 'demo@example.com', 'wrong-password');

    expect(
      await screen.findByRole('alert', {}, { timeout: 2000 })
    ).toHaveTextContent('Invalid email or password');
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });
});
