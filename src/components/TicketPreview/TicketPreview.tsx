import { FC } from 'react';

import styles from './TicketPreview.module.scss';
import {
  TAviasalesTicket,
  TAviasalesTicketWithId,
} from '@/types/aviasales/IAvisalesTicket';

type LineProps = TAviasalesTicket['segments'][0];

const Line: FC<LineProps> = ({
  origin,
  destination,
  date,
  stops,
  duration,
}) => {
  function addZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  const stopsLength = stops.length;
  let transfersTitle = 'Без пересадок';

  if (stopsLength === 1) {
    transfersTitle = '1 пересадка';
  }

  if (stopsLength > 1) {
    transfersTitle = `${stopsLength.toString()} пересадки`;
  }

  const timeStart = new Date(date);
  const hour = addZero(timeStart.getHours());
  const minute = addZero(timeStart.getMinutes());

  const timeEnd = new Date(timeStart.getTime() + duration * 60 * 1000);

  const hourEnd = addZero(timeEnd.getHours());
  const minuteEnd = addZero(timeEnd.getMinutes());

  const minutesInDay = 60 * 24;
  const days = Math.floor(duration / minutesInDay);
  const hours = Math.floor((duration % minutesInDay) / 60);
  const minutes = duration % 60;

  const travelTime = `${days ? days.toString() + 'д ' : ''}${hours ? addZero(hours) + 'ч ' : ''}${addZero(minutes)}м`;

  return (
    <div className={styles.line}>
      <div className={styles.column}>
        <span
          className={styles['column-title']}
        >{`${origin}-${destination}`}</span>
        <span
          className={styles['column-value']}
        >{`${hour}:${minute} - ${hourEnd}:${minuteEnd}`}</span>
      </div>

      <div className={styles.column}>
        <span className={styles['column-title']}>В пути</span>
        <span className={styles['column-value']}>{travelTime}</span>
      </div>

      <div className={styles.column}>
        <span className={styles['column-title']}>{transfersTitle}</span>
        <span className={styles['column-value']}>{stops.join(', ')}</span>
      </div>
    </div>
  );
};

interface TicketPreviewProps {
  ticket: TAviasalesTicketWithId;
}

const TicketPreview: FC<TicketPreviewProps> = ({
  ticket: {
    id,
    price,
    carrier,
    segments: [there, back],
  },
}) => {
  function openModalTicket() {
    console.log('open', id);
  }

  return (
    <button
      className={styles['ticket-card']}
      onClick={openModalTicket}
      onKeyDown={openModalTicket}
    >
      <div className={styles.top}>
        <span className={styles.price}>{price} Р</span>
        <img
          className={styles.carrier}
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="icon company"
        />
      </div>

      <div className={styles.description}>
        <Line {...there} />
        <Line {...back} />
      </div>
    </button>
  );
};

export default TicketPreview;
