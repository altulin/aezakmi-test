import { CURRENCY_FLAGS, type CurrencyCode } from '../config/currencies';
import styles from './CurrencyFlag.module.scss';

interface CurrencyFlagProps {
  currency: CurrencyCode;
}

export const CurrencyFlag = ({ currency }: CurrencyFlagProps) => {
  return (
    <img
      src={CURRENCY_FLAGS[currency]}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className={styles.flag}
    />
  );
};
