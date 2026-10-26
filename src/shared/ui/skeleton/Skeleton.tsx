import type { ComponentProps } from 'react';
import styles from './Skeleton.module.scss';

export type SkeletonProps = ComponentProps<'span'>;

export const Skeleton = ({ className = '', ...props }: SkeletonProps) => {
  return (
    <span
      {...props}
      className={`${styles.skeleton} ${className}`.trim()}
      aria-hidden="true"
    />
  );
};
