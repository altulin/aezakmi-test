import {
  CURRENCIES,
  CurrencyFlag,
  useGetLatestRatesQuery,
  getSellRate,
  getBuyRate,
  getRateChange,
  getChangeDirection,
  formatRate,
  formatChange,
  type ChangeDirection,
} from '@/entities/currency';
import styles from './RatesTable.module.scss';

const changeClassMap: Record<ChangeDirection, string | undefined> = {
  up: styles.changeUp,
  down: styles.changeDown,
  flat: styles.changeNeutral,
};

export const RatesTable = () => {
  const { data } = useGetLatestRatesQuery();

  return (
    <div className={styles.card}>
      <table className={styles.table}>
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
            <th scope="col" className={styles.colNumber}>
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {CURRENCIES.map((code) => {
            const course = data?.rates[code];
            if (course === undefined) return null;

            const previous = data?.previousRates[code];
            const change =
              previous !== undefined
                ? getRateChange(course, previous)
                : undefined;

            const changeClass =
              change !== undefined
                ? changeClassMap[getChangeDirection(change)]
                : styles.changeNeutral;

            return (
              <tr key={code}>
                <td>
                  <span className={styles.currency}>
                    <CurrencyFlag currency={code} />
                    {code}
                  </span>
                </td>
                <td className={styles.cellNumber}>
                  {formatRate(getSellRate(course))}
                </td>
                <td className={styles.cellNumber}>
                  {formatRate(getBuyRate(course))}
                </td>
                <td className={styles.cellNumber}>{formatRate(course)}</td>
                <td className={`${styles.cellNumber} ${changeClass ?? ''}`}>
                  {change !== undefined ? formatChange(change) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
