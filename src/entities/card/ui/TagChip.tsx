import type { KeyboardEvent } from 'react';
import { getTagColor } from '../lib/getTagColor';
import styles from './TagChip.module.scss';

interface TagChipProps {
  tag: string;
  onRemove?: () => void;
}

export const TagChip = ({ tag, onRemove }: TagChipProps) => {
  const className = `${styles.chip} ${styles[getTagColor(tag)]}`;

  if (!onRemove) {
    return <span className={className}>{tag}</span>;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      onRemove();
    }
  };

  return (
    <button
      type="button"
      className={`${className} ${styles.removable}`}
      onClick={onRemove}
      onKeyDown={handleKeyDown}
      aria-label={`Remove tag ${tag}`}
      title="Remove tag"
    >
      {tag}
      <span className={styles.removeIcon} aria-hidden="true">
        ✕
      </span>
    </button>
  );
};
