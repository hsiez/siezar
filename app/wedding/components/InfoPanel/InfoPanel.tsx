'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconNav, type SectionId } from '../IconNav/IconNav';
import styles from './InfoPanel.module.css';

// Placeholder content - replace with real data
const content: Record<SectionId, { title: string; body: React.ReactNode }> = {
  location: {
    title: 'Location',
    body: (
      <>
        <p className={styles.venueName}>Grand Gimeno</p>
        <p className={styles.address}>
          146 N Grand St<br />
          Orange, CA 92866
        </p>
        <a
          href="https://maps.app.goo.gl/RCpy4sffawJxQWGC8"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Map
        </a>
      </>
    ),
  },
  dresscode: {
    title: 'Dress Code',
    body: (
      <>
        <p className={styles.dressTitle}>Formal Attire</p>
        <p className={styles.dressDescription}>
          Floor-length gowns or cocktail dresses for women.
          <br />
          Suits or tuxedos for men.
        </p>
      </>
    ),
  },
  itinerary: {
    title: 'Itinerary',
    body: (
      <ul className={styles.timeline}>
        <li className={styles.timelineItem}>
          <span className={styles.time}>4:00 PM</span>
          <span className={styles.event}>Ceremony</span>
        </li>
        <li className={styles.timelineItem}>
          <span className={styles.time}>5:00 PM</span>
          <span className={styles.event}>Cocktail Hour</span>
        </li>
        <li className={styles.timelineItem}>
          <span className={styles.time}>6:30 PM</span>
          <span className={styles.event}>Dinner</span>
        </li>
        <li className={styles.timelineItem}>
          <span className={styles.time}>8:00 PM</span>
          <span className={styles.event}>Dancing</span>
        </li>
      </ul>
    ),
  },
  faq: {
    title: 'FAQ',
    body: (
      <dl className={styles.faqList}>
        <div className={styles.faqItem}>
          <dt className={styles.question}>Can I bring a plus one?</dt>
          <dd className={styles.answer}>
            Please refer to your invitation for details on your party size.
          </dd>
        </div>
        <div className={styles.faqItem}>
          <dt className={styles.question}>Is there parking available?</dt>
          <dd className={styles.answer}>
            Yes, complimentary valet parking will be provided.
          </dd>
        </div>
        <div className={styles.faqItem}>
          <dt className={styles.question}>What about gifts?</dt>
          <dd className={styles.answer}>
            Your presence is the greatest gift. If you wish to honor us with a
            gift, a registry link will be provided.
          </dd>
        </div>
      </dl>
    ),
  },
};

const sections: SectionId[] = ['location', 'dresscode', 'itinerary', 'faq'];

export function InfoPanel() {
  const [activeSection, setActiveSection] = useState<SectionId>('location');
  const [openAccordion, setOpenAccordion] = useState<SectionId | null>('location');

  return (
    <section className={styles.panel}>
      {/* Desktop: tabs + content */}
      <div className={styles.desktopLayout}>
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.contentInner}
            >
              <h2 className={styles.title}>{content[activeSection].title}</h2>
              <div className={styles.body}>{content[activeSection].body}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.nav}>
          <IconNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className={styles.mobileLayout}>
        {sections.map((id) => {
          const isOpen = openAccordion === id;
          return (
            <div key={id} className={styles.accordionItem}>
              <button
                className={`${styles.accordionTrigger} ${isOpen ? styles.accordionTriggerActive : ''}`}
                onClick={() => setOpenAccordion(isOpen ? null : id)}
                aria-expanded={isOpen}
              >
                {content[id].title}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={styles.accordionContent}
                  >
                    <div className={styles.accordionBody}>
                      {content[id].body}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
