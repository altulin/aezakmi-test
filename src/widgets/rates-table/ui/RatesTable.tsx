import {
  CURRENCIES,
  CurrencyFlag,
  useGetLatestRatesQuery,
  getSellRate,
  getBuyRate,
  getRateChange,
  formatRate,
  formatChange,
  type CurrencyCode,
} from '@/entities/currency';
import { Button, Skeleton } from '@/shared/ui';
import { formatTime } from '@/shared/lib/date';
import styles from './RatesTable.module.scss';

const SKELETON_ROWS = Array.from({ length: 7 });

interface RatesTableProps {
  selected?: CurrencyCode;
  onSelect: (code: CurrencyCode) => void;
}

export const RatesTable = ({ selected, onSelect }: RatesTableProps) => {
  const { data, fulfilledTimeStamp, isLoading, isError, isFetching, refetch } =
    useGetLatestRatesQuery();

  if (isError) {
    return (
      <div className={styles.error} role="alert">
        <span className={styles.errorIcon} aria-hidden="true">
          ⚠️
        </span>
        <p className={styles.errorTitle}>Failed to load exchange rates</p>
        <p className={styles.errorSubtitle}>
          Check your connection and try again.
        </p>
        <Button onClick={() => refetch()} isLoading={isFetching}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <table className={styles.table} aria-busy={isLoading}>
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col" className={styles.colNumber}>
              Surrender
            </th>
            <th scope="col" className={styles.colNumber}>
              Buy
            </th>
            <th scope="col" className={styles.colNumber}>
              Course
            </th>
            {!selected && (
              <th scope="col" className={styles.colNumber}>
                Change
              </th>
            )}
            {!selected && (
              <th scope="col" className={styles.colNumber}>
                Time
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            SKELETON_ROWS.map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton className={styles.skeletonCurrency} />
                </td>
                <td className={styles.cellNumber}>
                  <Skeleton className={styles.skeletonNumber} />
                </td>
                <td className={styles.cellNumber}>
                  <Skeleton className={styles.skeletonNumber} />
                </td>
                <td className={styles.cellNumber}>
                  <Skeleton className={styles.skeletonNumber} />
                </td>
                {!selected && (
                  <td className={styles.cellNumber}>
                    <Skeleton className={styles.skeletonNumber} />
                  </td>
                )}
                {!selected && (
                  <td className={styles.cellNumber}>
                    <Skeleton className={styles.skeletonNumber} />
                  </td>
                )}
              </tr>
            ))}

          {!isLoading &&
            CURRENCIES.map((code) => {
              const course = data?.rates[code];
              if (course === undefined) return null;

              const previous = data?.previousRates[code];
              const change =
                previous !== undefined
                  ? getRateChange(course, previous)
                  : undefined;

              const isSelected = selected === code;

              return (
                <tr
                  key={code}
                  className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`.trim()}
                  onClick={() => onSelect(code)}
                >
                  <td>
                    <button
                      type="button"
                      className={styles.currencyBtn}
                      aria-pressed={isSelected}
                    >
                      <span className={styles.currency}>
                        <CurrencyFlag currency={code} />
                        {code}
                      </span>
                    </button>
                  </td>
                  <td className={styles.cellNumber}>
                    {formatRate(getSellRate(course))}
                  </td>
                  <td className={styles.cellNumber}>
                    {formatRate(getBuyRate(course))}
                  </td>
                  <td className={styles.cellNumber}>{formatRate(course)}</td>
                  {!selected && (
                    <td className={styles.cellNumber}>
                      {change !== undefined ? formatChange(change) : '—'}
                    </td>
                  )}
                  {!selected && (
                    <td className={styles.cellNumber}>
                      {fulfilledTimeStamp
                        ? formatTime(fulfilledTimeStamp)
                        : '—'}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
