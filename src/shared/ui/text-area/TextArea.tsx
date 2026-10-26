import type { ComponentProps } from 'react';
import { FormField } from '../form-field/FormField';
import styles from './TextArea.module.scss';

export interface TextAreaProps extends ComponentProps<'textarea'> {
  error?: string;
  label?: string;
}

export const TextArea = ({
  error,
  label,
  className,
  ...props
}: TextAreaProps) => {
  return (
    <FormField label={label} error={error} className={className}>
      {(fieldProps) => (
        <div
          className={`${styles.field} ${fieldProps.hasError ? styles.fieldError : ''}`.trim()}
        >
          <textarea
            {...props}
            id={fieldProps.id}
            className={styles.input}
            aria-invalid={fieldProps['aria-invalid']}
            aria-describedby={fieldProps['aria-describedby']}
          />
        </div>
      )}
    </FormField>
  );
};
