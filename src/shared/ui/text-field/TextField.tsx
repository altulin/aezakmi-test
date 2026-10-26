import type { ComponentProps, ReactNode } from 'react';
import { FormField } from '../form-field/FormField';
import styles from './TextField.module.scss';

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
  icon?: ReactNode;
  error?: string;
  label?: string;
  size?: 'md' | 'lg';
  isEmpty?: boolean;
}

export const TextField = ({
  icon,
  error,
  label,
  size = 'lg',
  isEmpty = false,
  className,
  ...props
}: TextFieldProps) => {
  return (
    <FormField label={label} error={error} className={className}>
      {(fieldProps) => (
        <div
          className={`${styles.field} ${styles[size]} ${fieldProps.hasError ? styles.fieldError : ''}`.trim()}
        >
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            {...props}
            id={fieldProps.id}
            className={`${styles.input} ${isEmpty ? styles.empty : ''}`.trim()}
            aria-invalid={fieldProps['aria-invalid']}
            aria-describedby={fieldProps['aria-describedby']}
          />
        </div>
      )}
    </FormField>
  );
};
