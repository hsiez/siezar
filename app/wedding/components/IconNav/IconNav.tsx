'use client';

import { motion } from 'framer-motion';
import styles from './IconNav.module.css';

export type SectionId = 'location' | 'dresscode' | 'itinerary' | 'faq';

interface IconNavProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const sections: { id: SectionId; label: string }[] = [
  { id: 'location', label: 'Location' },
  { id: 'dresscode', label: 'Dress Code' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'faq', label: 'FAQ' },
];

export function IconNav({ activeSection, onSectionChange }: IconNavProps) {
  return (
    <nav className={styles.nav}>
      {sections.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.button} ${activeSection === id ? styles.active : ''}`}
          onClick={() => onSectionChange(id)}
          aria-current={activeSection === id ? 'true' : undefined}
        >
          {activeSection === id && (
            <motion.span
              layoutId="tab-indicator"
              className={styles.indicator}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {label}
        </button>
      ))}
    </nav>
  );
}
