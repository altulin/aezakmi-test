import { z } from 'zod';

const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
} as const;

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email(VALIDATION_MESSAGES.EMAIL_INVALID)),
  password: z.string().min(6, VALIDATION_MESSAGES.PASSWORD_TOO_SHORT),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
