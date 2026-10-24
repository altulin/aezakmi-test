const MOCK_DELAY_MS = 800;

export const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123',
} as const;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
}

export const mockLogin = ({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isEmailValid =
        email.toLowerCase() === DEMO_CREDENTIALS.email.toLowerCase();
      const isPasswordValid = password === DEMO_CREDENTIALS.password;

      if (isEmailValid && isPasswordValid) {
        resolve({ email: email.toLowerCase() });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, MOCK_DELAY_MS);
  });
};
