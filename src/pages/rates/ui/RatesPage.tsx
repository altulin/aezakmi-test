import { useGetLatestRatesQuery } from '@/entities/currency';
import styles from './RatesPage.module.scss';

export const RatesPage = () => {
  const { data, isLoading, isError } = useGetLatestRatesQuery();

  return (
    <section>
      <h1 className={styles.title}>Rates</h1>

      {/* ВРЕМЕННЫЙ БЛОК ДЛЯ ПРОВЕРКИ — удалить после тестов */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          background: '#f0f0f0',
          borderRadius: 8,
          fontFamily: 'monospace',
        }}
      >
        <p>
          <strong>isLoading:</strong> {String(isLoading)}
        </p>
        <p>
          <strong>isError:</strong> {String(isError)}
        </p>
        <p>
          <strong>Data:</strong>
        </p>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {data ? JSON.stringify(data, null, 2) : 'no data'}
        </pre>
      </div>
    </section>
  );
};
