'use client';

import { motion } from 'framer-motion';
import styles from './IconNav.module.css';

export type SectionId = 'location' | 'dresscode' | 'itinerary' | 'travelers' | 'faq';

interface IconNavProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
}

const sections: { id: SectionId; label: string }[] = [
  { id: 'location', label: 'Location' },
  { id: 'dresscode', label: 'Dress Code' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'travelers', label: 'Travelers' },
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
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            />
          )}
          {label}
        </button>
      ))}
    </nav>
  );
}
