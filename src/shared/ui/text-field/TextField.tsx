import { type ComponentProps, type ReactNode, useId } from 'react';
import styles from './TextField.module.scss';

export interface TextFieldProps extends ComponentProps<'input'> {
  icon?: ReactNode;
  error?: string;
  label?: string;
}

export const TextField = ({
  icon,
  error,
  label,
  id,
  className = '',
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const hasError = Boolean(error);

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={`${styles.field} ${hasError ? styles.fieldError : ''}`.trim()}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          {...props}
          id={inputId}
          className={styles.input}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
        />
      </div>
      {hasError && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
