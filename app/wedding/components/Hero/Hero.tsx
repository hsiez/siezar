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
GCAL_URL.searchParams.set('dates', '20261002T170000/20261002T230000');
GCAL_URL.searchParams.set('location', 'Grand Gimeno, 146 N Grand St, Orange, CA 92866');
GCAL_URL.searchParams.set(
  'details',
  'Please arrive by 5:00 PM.\n\nItinerary:\n5:30 PM — Ceremony Begins\n6:00 PM — Cocktail Hour\n7:00 PM — Dinner\n8:00 PM — Dancing\n\nVenue Address:\nGrand Gimeno\n146 N Grand St\nOrange, CA 92866\n\nParking Address:\n157 N Grand St\nOrange, CA 92866',
);

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
            data-tooltip="Add to calendar"
            aria-label="Add to calendar"
        >
          {date}
        </a>
        <a href="#rsvp" className={styles.rsvpButton}>
          RSVP
        </a>
      </div>
    </section>
  );
}
