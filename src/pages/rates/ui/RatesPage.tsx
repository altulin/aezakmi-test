import { useSearchParams } from 'react-router';
import {
  useGetLatestRatesQuery,
  isCurrencyCode,
  isPeriod,
  DEFAULT_PERIOD,
  type CurrencyCode,
  type Period,
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

  const rawPeriod = searchParams.get('period');
  const period = isPeriod(rawPeriod) ? rawPeriod : DEFAULT_PERIOD;

  const handleSelect = (code: CurrencyCode) => {
    if (selected === code) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('currency');
        return next;
      });
    } else {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('currency', code);
        if (!next.has('period')) next.set('period', DEFAULT_PERIOD);
        return next;
      });
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('period', newPeriod);
      return next;
    });
  };

  const handleClose = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('currency');
      return next;
    });
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
      {selected && (
        <RateChart
          currency={selected}
          period={period}
          onPeriodChange={handlePeriodChange}
          onClose={handleClose}
        />
      )}
    </section>
  );
};
