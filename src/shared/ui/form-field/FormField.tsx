import type { ReactNode } from 'react';
import { useId } from 'react';
import styles from './FormField.module.scss';

export interface FormFieldProps {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  children: (props: {
    id: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    hasError: boolean;
  }) => ReactNode;
}

export const FormField = ({
  label,
  error,
  id,
  className = '',
  children,
}: FormFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${hasError ? styles.labelError : ''}`.trim()}
        >
          {label}
        </label>
      )}

      {children({
        id: inputId,
        'aria-invalid': hasError || undefined,
        'aria-describedby': hasError ? errorId : undefined,
        hasError,
      })}

      {hasError && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
