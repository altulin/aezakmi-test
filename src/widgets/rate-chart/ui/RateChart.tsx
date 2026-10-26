import { lazy, Suspense } from 'react';
import {
  BASE_CURRENCY,
  CurrencyFlag,
  PERIODS,
  PERIOD_LABELS,
  useGetRateHistoryQuery,
  getChangeDirection,
  getPercentChange,
  formatPercentChange,
  formatRate,
  type CurrencyCode,
  type Period,
} from '@/entities/currency';
import { Button, Skeleton } from '@/shared/ui';
import styles from './RateChart.module.scss';

const RateAreaChart = lazy(() =>
  import('./RateAreaChart').then((m) => ({ default: m.RateAreaChart }))
);

interface RateChartProps {
  currency: CurrencyCode;
  period: Period;
  onPeriodChange: (period: Period) => void;
  onClose: () => void;
}

export const RateChart = ({
  currency,
  period,
  onPeriodChange,
  onClose,
}: RateChartProps) => {
  const {
    data: history,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetRateHistoryQuery({
    currency,
    period,
  });

  const lastValue =
    history && history.length > 0
      ? history[history.length - 1].value
      : undefined;
  const firstValue =
    history && history.length > 0 ? history[0].value : undefined;

  const percentChange =
    firstValue !== undefined && lastValue !== undefined
      ? getPercentChange(firstValue, lastValue)
      : undefined;

  const direction =
    percentChange !== undefined ? getChangeDirection(percentChange) : 'flat';
  const formattedPercent =
    percentChange !== undefined ? formatPercentChange(percentChange) : '—';

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>
            <CurrencyFlag currency={currency} />
            {currency} / {BASE_CURRENCY}
          </h2>
          <p className={styles.subtitle}>{PERIOD_LABELS[period]}</p>
        </div>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close panel"
        >
          ✕
        </button>
      </header>

      {isError ? (
        <div className={styles.errorWrapper} role="alert">
          <p className={styles.errorTitle}>Failed to load data</p>
          <Button onClick={() => refetch()} isLoading={isFetching}>
            Try again
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.rateInfo}>
            {isLoading ? (
              <>
                <Skeleton className={styles.skeletonRate} />
                <Skeleton className={styles.skeletonBadge} />
              </>
            ) : (
              <>
                <div className={styles.currentRate}>
                  {lastValue !== undefined ? formatRate(lastValue) : '—'}
                </div>
                <div
                  className={`${styles.badge} ${styles[`badge_${direction}`]}`}
                >
                  {direction === 'up' && '▲ '}
                  {direction === 'down' && '▼ '}
                  {formattedPercent}
                </div>
              </>
            )}
          </div>

          <div className={styles.chartArea}>
            {isLoading ? (
              <Skeleton className={styles.chartSkeleton} />
            ) : history && history.length > 0 ? (
              <Suspense
                fallback={<Skeleton className={styles.chartSkeleton} />}
              >
                <RateAreaChart data={history} direction={direction} />
              </Suspense>
            ) : null}
          </div>

          <div className={styles.periods}>
            {(Object.keys(PERIODS) as Period[]).map((p) => (
              <button
                key={p}
                type="button"
                className={`${styles.periodBtn} ${p === period ? styles.periodBtnActive : ''}`.trim()}
                onClick={() => onPeriodChange(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
};
