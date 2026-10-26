import { useNavigate } from 'react-router';
import { useAppSelector } from '@/app/store/hooks';
import { selectCurrentCard } from '@/entities/card';
import { CardForm } from '@/features/card-form';
import styles from './CardFormPage.module.scss';

export const CardFormPage = () => {
  const navigate = useNavigate();
  const currentCard = useAppSelector(selectCurrentCard);

  const handleSuccess = () => {
    navigate('/cards/preview');
  };

  // Editing: Cancel returns to the untouched preview.
  // Creating: no onCancel, the form just clears itself and the user stays here.
  const handleCancel = currentCard
    ? () => navigate('/cards/preview')
    : undefined;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Create New Card</h1>
      <CardForm
        initialValues={currentCard || undefined}
        submitLabel={currentCard ? 'Save Card' : 'Create Card'}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </section>
  );
};
