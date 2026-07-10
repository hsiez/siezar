'use client';

// Envelope lab — building the envelope up layer by layer against the reference photo.
import { useState } from 'react';
import styles from './envelope-lab.module.css';

function Pocket({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <div className={styles.stackFrame}>
      <div
        className={styles.stack}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen((v) => !v)}
      >
        <div className={`${styles.base} ${styles.grain}`} />
        <div className={styles.cutoutShade} />
        <div className={`${styles.card} ${open ? styles.cardOpen : ''} ${styles.grain}`} />
        <div className={`${styles.sleeve} ${styles.grain}`} />
        <div className={`${styles.flap} ${open ? styles.flapOpen : ''}`}>
          <div className={`${styles.flapFace} ${styles.grain}`} />
        </div>
      </div>
    </div>
  );
}

export default function EnvelopeLab() {
  return (
    <main className={styles.stage}>
      <div className={styles.row}>
        <div className={styles.cell}>
          <span className={styles.caption}>reference</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.ref} src="/dev/envelope-ref-crop.png" alt="reference envelope" />
        </div>
        <div className={styles.cell}>
          <span className={styles.caption}>closed / sealed (click to open)</span>
          <Pocket initialOpen={false} />
        </div>
        <div className={styles.cell}>
          <span className={styles.caption}>open — flap up, card out</span>
          <Pocket initialOpen />
        </div>
      </div>
    </main>
  );
}
