import { getTagColor } from '../lib/getTagColor';
import styles from './TagChip.module.scss';

interface TagChipProps {
  tag: string;
  onRemove?: () => void;
}

export const TagChip = ({ tag, onRemove }: TagChipProps) => {
  const color = getTagColor(tag);

  return (
    <span className={`${styles.chip} ${styles[color]}`}>
      {tag}
      {onRemove && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label={`Remove tag ${tag}`}
        >
          ✕
        </button>
      )}
    </span>
  );
};
