import type { ComponentProps } from 'react';
import { FormField } from '../form-field/FormField';
import styles from './Select.module.scss';

export interface SelectProps extends Omit<ComponentProps<'select'>, 'size'> {
  options: readonly string[];
  placeholder?: string;
  error?: string;
  label?: string;
  size?: 'md' | 'lg';
}

export const Select = ({
  options,
  placeholder,
  error,
  label,
  size = 'lg',
  className,
  ...props
}: SelectProps) => {
  return (
    <FormField label={label} error={error} className={className}>
      {(fieldProps) => (
        <div
          className={`${styles.field} ${styles[size]} ${fieldProps.hasError ? styles.fieldError : ''}`.trim()}
        >
          <select
            {...props}
            id={fieldProps.id}
            className={styles.select}
            aria-invalid={fieldProps['aria-invalid']}
            aria-describedby={fieldProps['aria-describedby']}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className={styles.arrow} aria-hidden="true">
            ▾
          </span>
        </div>
      )}
    </FormField>
  );
};
