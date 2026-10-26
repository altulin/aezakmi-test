import styles from './RatesPage.module.scss';
import { RatesTable } from '@/widgets/rates-table';

export const RatesPage = () => {
  return (
    <section>
      <h1 className={styles.title}>Exchange rates</h1>
      <RatesTable />
    </section>
  );
};
