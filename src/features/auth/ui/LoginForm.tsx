import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@/shared/ui';
import { useAppDispatch } from '@/app/store/hooks';
import { loginSchema, type LoginFormValues } from '../model/loginSchema';
import { mockLogin } from '../api/mockLogin';

import styles from './LoginForm.module.scss';
import { setSession } from '@/entities/session';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const user = await mockLogin(values);
      dispatch(setSession(user.email));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError('root', { message });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fields}>
        <TextField
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          aria-label="Email address"
          icon={<span aria-hidden="true">✉️</span>}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          aria-label="Password"
          icon={<span aria-hidden="true">🔒</span>}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      {errors.root?.message && (
        <p className={styles.rootError} role="alert">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" isLoading={isSubmitting} className={styles.submit}>
        Login
      </Button>
    </form>
  );
};
