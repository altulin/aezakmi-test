import { useGetLatestRatesQuery } from '@/entities/currency';
import { RatesTable } from '@/widgets/rates-table';
import { formatDate } from '@/shared/lib/date';
import { Skeleton } from '@/shared/ui';
import styles from './RatesPage.module.scss';

export const RatesPage = () => {
  const { data, isLoading } = useGetLatestRatesQuery();

  return (
    <section>
      <header className={styles.header}>
        <h1 className={styles.title}>Exchange rates</h1>
        {isLoading ? (
          <Skeleton className={styles.skeletonDate} />
        ) : data?.date ? (
          <span className={styles.dateBadge}>{formatDate(data.date)}</span>
        ) : null}
      </header>
      <RatesTable />
    </section>
  );
};
