import {
  BASE_CURRENCY,
  CurrencyFlag,
  PERIODS,
  PERIOD_LABELS,
  useGetRateHistoryQuery,
  getPercentChange,
  formatPercentChange,
  type CurrencyCode,
  type Period,
} from '@/entities/currency';
import styles from './RateChart.module.scss';

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
    refetch,
  } = useGetRateHistoryQuery({
    currency,
    period,
  });

  const firstThree = history?.slice(0, 3);
  const lastThree = history?.slice(-3);

  const percentChange =
    history && history.length >= 2
      ? getPercentChange(history[0].value, history[history.length - 1].value)
      : undefined;

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <CurrencyFlag currency={currency} />
          {currency} / {BASE_CURRENCY}
        </h2>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close panel"
        >
          ✕
        </button>
      </header>

      <p className={styles.subtitle}>{PERIOD_LABELS[period]}</p>

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

      {isLoading && <p className={styles.debug}>Loading history...</p>}

      {isError && (
        <div className={styles.debug}>
          <p>Error loading history.</p>
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && history && (
        <div className={styles.debug}>
          <p>
            <strong>Percent change:</strong>{' '}
            {percentChange !== undefined
              ? formatPercentChange(percentChange)
              : '—'}
          </p>

          <p>
            <strong>First 3 points:</strong>
          </p>
          <pre>{JSON.stringify(firstThree, null, 2)}</pre>

          <p>
            <strong>Last 3 points:</strong>
          </p>
          <pre>{JSON.stringify(lastThree, null, 2)}</pre>
        </div>
      )}
    </aside>
  );
};
