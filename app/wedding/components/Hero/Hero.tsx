import Image from 'next/image';
import styles from './Hero.module.css';

interface HeroProps {
  names: string;
  date: string;
  imageSrc?: string;
  headline?: string;
}

export function Hero({ names, date, imageSrc, headline = 'We are Getting Married' }: HeroProps) {
  return (
    <section className={styles.hero}>
      <p className={styles.headline}>{headline}</p>
      <div className={styles.frameContainer}>
        <div className={styles.ovalFrame}>
          <div className={styles.ovalInner}>
            <div className={styles.photoContainer}>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Wedding"
                  fill
                  className={styles.photo}
                />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h1 className={styles.names}>{names}</h1>
        <p className={styles.date}>{date}</p>
      </div>
    </section>
  );
}
