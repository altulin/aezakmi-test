import { useEffect, useRef } from 'react';
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
import { TABLET_QUERY } from '@/shared/config/breakpoints';
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

  useEffect(() => {
    const isBadCurrency = rawCurrency !== null && !selected;
    const isBadPeriod = rawPeriod !== null && !isPeriod(rawPeriod);
    if (!isBadCurrency && !isBadPeriod) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (isBadCurrency) {
          next.delete('currency');
          next.delete('period');
        } else {
          next.set('period', DEFAULT_PERIOD);
        }
        return next;
      },
      { replace: true }
    );
  }, [rawCurrency, rawPeriod, selected, setSearchParams]);

  const chartRef = useRef<HTMLElement>(null);
  const shouldScrollToChart = useRef(false);

  useEffect(() => {
    if (!selected || !shouldScrollToChart.current) return;
    shouldScrollToChart.current = false;

    if (!window.matchMedia(TABLET_QUERY).matches) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    chartRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [selected]);

  const handleSelect = (code: CurrencyCode) => {
    if (selected === code) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('currency');
        return next;
      });
    } else {
      shouldScrollToChart.current = true;
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
    <section
      className={`${styles.layout} ${selected ? styles.withChart : ''}`.trim()}
    >
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
          ref={chartRef}
          currency={selected}
          period={period}
          onPeriodChange={handlePeriodChange}
          onClose={handleClose}
        />
      )}
    </section>
  );
};
