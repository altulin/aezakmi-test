import {
  BASE_CURRENCY,
  CurrencyFlag,
  type CurrencyCode,
} from '@/entities/currency';
import styles from './RateChart.module.scss';

interface RateChartProps {
  currency: CurrencyCode;
  onClose: () => void;
}

export const RateChart = ({ currency, onClose }: RateChartProps) => {
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
      <p className={styles.subtitle}>Monthly dynamics</p>
    </aside>
  );
};
