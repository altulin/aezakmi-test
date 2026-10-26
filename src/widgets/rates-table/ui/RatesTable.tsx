import {
  CURRENCIES,
  CurrencyFlag,
  useGetLatestRatesQuery,
  getSellRate,
  getBuyRate,
  formatRate,
} from '@/entities/currency';
import styles from './RatesTable.module.scss';

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
          </tr>
        </thead>
        <tbody>
          {CURRENCIES.map((code) => {
            const course = data?.rates[code];

            // Skip currencies missing from the API response
            if (course === undefined) return null;

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
