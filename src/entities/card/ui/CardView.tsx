import type { Card } from '../model/types';
import { TagChip } from './TagChip';
import { formatDate } from '@/shared/lib/date';
import styles from './CardView.module.scss';

interface CardViewProps {
  card: Card;
}

export const CardView = ({ card }: CardViewProps) => {
  const hasAssigneeOrDeadline = card.assignee || card.deadline;

  return (
    <article className={styles.card}>
      <div className={styles.badges}>
        {card.status && (
          <span className={`${styles.badge} ${styles.status}`}>
            {card.status}
          </span>
        )}
        <span
          className={`${styles.badge} ${styles[`priority${card.priority}`]}`}
        >
          {card.priority === 'High' && '🔥 '}
          {card.priority}
        </span>
      </div>

      <h2 className={styles.title}>{card.title}</h2>
      <p className={styles.description}>{card.description}</p>

      {hasAssigneeOrDeadline && (
        <>
          <hr className={styles.divider} />
          <div className={styles.meta}>
            {card.assignee && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Assignee</span>
                <span className={styles.metaValue}>{card.assignee}</span>
              </div>
            )}
            {card.deadline && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Deadline</span>
                <span className={styles.metaValue}>
                  {formatDate(card.deadline)}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {card.tags.length > 0 && (
        <div className={styles.tags}>
          {card.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      {card.images.length > 0 && (
        <div className={styles.images}>
          {card.images.map((img) => (
            <img
              key={img.id}
              className={styles.image}
              src={img.url}
              alt={img.name}
            />
          ))}
        </div>
      )}
    </article>
  );
};
