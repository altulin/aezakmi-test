import { useSearchParams } from 'react-router';
import {
  useGetLatestRatesQuery,
  isCurrencyCode,
  type CurrencyCode,
} from '@/entities/currency';
import { RatesTable } from '@/widgets/rates-table';
import { RateChart } from '@/widgets/rate-chart';
import { formatDate } from '@/shared/lib/date';
import { Skeleton } from '@/shared/ui';
import styles from './RatesPage.module.scss';

export const RatesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetLatestRatesQuery();

  const rawCurrency = searchParams.get('currency');
  const selected = isCurrencyCode(rawCurrency) ? rawCurrency : undefined;

  const handleSelect = (code: CurrencyCode) => {
    if (selected === code) {
      setSearchParams({});
    } else {
      setSearchParams({ currency: code });
    }
  };

  const handleClose = () => {
    setSearchParams({});
  };

  return (
    <section className={styles.layout}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Exchange rates</h1>
          {isLoading ? (
            <Skeleton className={styles.skeletonDate} />
          ) : data?.date ? (
            <span className={styles.dateBadge}>{formatDate(data.date)}</span>
          ) : null}
        </header>
        <RatesTable selected={selected} onSelect={handleSelect} />
      </div>
      {selected && <RateChart currency={selected} onClose={handleClose} />}
    </section>
  );
};
