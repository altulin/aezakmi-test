import { CURRENCY_FLAGS, type CurrencyCode } from '../config/currencies';
import styles from './CurrencyFlag.module.scss';

interface CurrencyFlagProps {
  currency: CurrencyCode;
}

export const CurrencyFlag = ({ currency }: CurrencyFlagProps) => {
  const country = CURRENCY_FLAGS[currency];

  return (
    <img
      src={`https://flagcdn.com/${country}.svg`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className={styles.flag}
    />
  );
};
