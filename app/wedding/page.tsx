import { Hero } from './components/Hero/Hero';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import styles from './styles/wedding.module.css';

export default function WeddingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero
          names="Harley & Haylee"
          date="October 2, 2026"
        />
        <InfoPanel />
      </main>
    </div>
  );
}
