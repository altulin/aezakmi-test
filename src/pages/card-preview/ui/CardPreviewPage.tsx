import { useNavigate } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectCurrentCard, CardView } from '@/entities/card';
import { Button } from '@/shared/ui';
import styles from './CardPreviewPage.module.scss';

export const CardPreviewPage = () => {
  const navigate = useNavigate();
  const card = useAppSelector(selectCurrentCard);

  return (
    <section className={styles.page}>
      <h1 className={styles.headerTitle}>Card Preview</h1>

      {card ? (
        <>
          <CardView card={card} />
          <div className={styles.actions}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/cards/new')}
            >
              ← Back to Form
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/cards/new')}
            >
              Edit Card
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No card yet</p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/cards/new')}
          >
            Create Card
          </Button>
        </div>
      )}
    </section>
  );
};
