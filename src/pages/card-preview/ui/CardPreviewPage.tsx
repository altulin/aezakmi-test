import { useNavigate } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectCurrentCard, TagChip } from '@/entities/card';
import { formatDate } from '@/shared/lib/date';
import styles from './CardPreviewPage.module.scss';

export const CardPreviewPage = () => {
  const navigate = useNavigate();
  const card = useAppSelector(selectCurrentCard);

  if (!card) {
    return (
      <section className={styles.page}>
        <p>No card data found.</p>
        <button onClick={() => navigate('/cards/new')}>Go back</button>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Card Preview</h1>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/cards/new')}
        >
          ← Edit card
        </button>
      </header>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{card.title}</h2>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Priority:</span>
            <span
              className={`${styles.badge} ${styles[`priority${card.priority}`]}`}
            >
              {card.priority}
            </span>
          </div>

          {card.status && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Status:</span>
              <span className={styles.value}>{card.status}</span>
            </div>
          )}

          {card.assignee && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Assignee:</span>
              <span className={styles.value}>{card.assignee}</span>
            </div>
          )}

          {card.deadline && (
            <div className={styles.metaItem}>
              <span className={styles.label}>Deadline:</span>
              <span className={styles.value}>{formatDate(card.deadline)}</span>
            </div>
          )}
        </div>

        <p className={styles.description}>{card.description}</p>

        {card.tags.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tags</h3>
            <div className={styles.tags}>
              {card.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {card.images.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Images ({card.images.length})
            </h3>
            <div className={styles.images}>
              {card.images.map((img) => (
                <img key={img.id} src={img.url} alt={img.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
