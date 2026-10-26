import { CardForm } from '@/features/card-form';
import styles from './CardFormPage.module.scss';

export const CardFormPage = () => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Create New Card</h1>
      <CardForm />
    </section>
  );
};
