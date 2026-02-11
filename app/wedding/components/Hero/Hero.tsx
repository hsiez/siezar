import Image from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
  names: string;
  date: string;
  headline?: string;
}

const GCAL_URL = new URL('https://calendar.google.com/calendar/render');
GCAL_URL.searchParams.set('action', 'TEMPLATE');
GCAL_URL.searchParams.set('text', 'Harley & Haylee\'s Wedding');
GCAL_URL.searchParams.set('dates', '20261002T160000/20261002T230000');
GCAL_URL.searchParams.set('location', 'Grand Gimeno, 146 N Grand St, Orange, CA 92866');
GCAL_URL.searchParams.set('details', 'Ceremony begins at 4:00 PM');

export function Hero({ names, date, headline = 'We \'re Getting Married' }: HeroProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.headline}>{headline}</p>
      <div className={styles.frameContainer}>
        <div className={styles.ovalFrame}>
          <div className={styles.ovalInner}>
            <div className={styles.photoContainer}>
              <Image
                src="/wedding/IMG_1996.PNG"
                alt="Harley & Haylee"
                fill
                className={styles.photo}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h1 className={styles.names}>{names}</h1>
        <a
          href={GCAL_URL.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.date}
          title="Add to calendar"
        >
          {date}
        </a>
      </div>
    </section>
  );
}
