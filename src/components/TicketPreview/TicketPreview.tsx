import { FC } from 'react';

import styles from './TicketPreview.module.scss';
import iconCompany from '@/images/s7airlines.svg';

const TicketPreview: FC = () => {
  return (
    <article className={styles['ticket-card']}>
      <div className={styles.top}>
        <span className={styles.price}>13 400 Р</span>
        <img src={iconCompany} alt="icon company" />
      </div>

      <div className={styles.description}>
        <div className={styles.line}>
          <div className={styles.column}>
            <span className={styles['column-title']}>MOW – NKT</span>
            <span className={styles['column-value']}>10:45 – 08:00</span>
          </div>

          <div className={styles.column}>
            <span className={styles['column-title']}>В пути</span>
            <span className={styles['column-value']}>21ч 15м</span>
          </div>

          <div className={styles.column}>
            <span className={styles['column-title']}>2 пересадки</span>
            <span className={styles['column-value']}>HKG, JNB</span>
          </div>
        </div>

        <div className={styles.line}>
          <div className={styles.column}>
            <span className={styles['column-title']}>MOW – NKT</span>
            <span className={styles['column-value']}>10:45 – 08:00</span>
          </div>

          <div className={styles.column}>
            <span className={styles['column-title']}>В пути</span>
            <span className={styles['column-value']}>21ч 15м</span>
          </div>

          <div className={styles.column}>
            <span className={styles['column-title']}>2 пересадки</span>
            <span className={styles['column-value']}>HKG, JNB</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TicketPreview;
