'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconNav, type SectionId } from '../IconNav/IconNav';
import { ArrowDoodle } from '../ArrowDoodle/ArrowDoodle';
import styles from './InfoPanel.module.css';

const VENUE_MAP_URL = 'https://maps.app.goo.gl/RCpy4sffawJxQWGC8';
const PARKING_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=157+N+Grand+St%2C+Orange%2C+CA+92866';

const sections: SectionId[] = ['location', 'dresscode', 'itinerary', 'travelers', 'faq'];

const faqItems = [
  { q: 'Can I bring a date/plus-one?', a: 'All invited guests will have their names included on our formal invitations. Additional guests will not be allowed in. Thank you in advance!' },
  { q: 'Can I bring my children?', a: 'No, we\u2019ve decided to have an adults-only celebration. Thank you for making arrangements!' },
  { q: 'Will the wedding be indoors or outdoors?', a: 'Ceremony and cocktail hour will be outdoors, followed by an indoor reception.' },
  { q: 'Are the ceremony and reception locations accessible?', a: 'Yes, both spaces are wheelchair accessible.' },
  { q: 'What time should I plan to arrive for the ceremony?', a: 'Please plan to arrive at 5:00 PM, as the ceremony will begin promptly at 5:30 PM.' },
  { q: 'Will there be an open bar?', a: 'Yes, drink responsibly.' },
  { q: 'Do you have a registry?', a: 'We do not! Our home is already full of love, laughter, and furniture. If you\u2019d still like to gift us a wedding present, we\u2019d greatly appreciate a contribution towards our honeymoon or house fund. More details will be included with our formal invitation.' },
];

type InfoPanelProps = {
  initialSection?: SectionId;
  onSectionChange?: (section: SectionId) => void;
};

export function InfoPanel({
  initialSection = 'location',
  onSectionChange,
}: InfoPanelProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(initialSection);
  const [openAccordion, setOpenAccordion] = useState<SectionId | null>(initialSection);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function changeSection(section: SectionId) {
    setActiveSection(section);
    setOpenAccordion(section);
    onSectionChange?.(section);
  }

  useEffect(() => {
    setActiveSection(initialSection);
    setOpenAccordion(initialSection);
  }, [initialSection]);

  const content: Record<SectionId, { title: string; body: React.ReactNode }> = {
    location: {
      title: 'Location',
      body: (
        <>
          <p className={styles.venueName}>Grand Gimeno</p>
          <a
            href={VENUE_MAP_URL}
            className={styles.addressLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            146 N Grand St<br />
            Orange, CA 92866
          </a>
          <div className={styles.parking}>
            <p className={styles.parkingTitle}>Parking</p>
            <a
              href={PARKING_MAP_URL}
              className={styles.addressLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              157 N Grand St<br />
              Orange, CA 92866
            </a>
          </div>
        </>
      ),
    },
    dresscode: {
      title: 'Dress Code',
      body: (
        <>
          <p className={styles.dressTitle}>Formal Attire</p>
          <p className={styles.dressDescription}>
            A well-tailored suit, tuxedo, ankle to floor length dress. Please avoid wearing dress colors similar to white.
          </p>
        </>
      ),
    },
    itinerary: {
      title: 'Itinerary',
      body: (
        <ul className={styles.timeline}>
          <li className={styles.timelineItem}>
            <span className={styles.time}>5:00 PM</span>
            <span className={styles.event}>Arrive</span>
          </li>
          <li className={styles.timelineItem}>
            <span className={styles.time}>5:30 PM</span>
            <span className={styles.event}>Ceremony Begins</span>
          </li>
          <li className={styles.timelineItem}>
            <span className={styles.time}>6:00 PM</span>
            <span className={styles.event}>Cocktail Hour</span>
          </li>
          <li className={styles.timelineItem}>
            <span className={styles.time}>7:00 PM</span>
            <span className={styles.event}>Dinner</span>
          </li>
          <li className={styles.timelineItem}>
            <span className={styles.time}>8:00 PM</span>
            <span className={styles.event}>Dancing</span>
          </li>
        </ul>
      ),
    },
    travelers: {
      title: 'Travelers',
      body: (
        <>
          <div className={styles.travelSection}>
            <p className={styles.travelHeading}>Nearest Airport</p>
            <p className={styles.travelName}>John Wayne Airport (SNA)</p>
          </div>
          <div className={styles.travelSection}>
            <p className={styles.travelHeading}>Hotel Recommendations</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Fera+Anaheim+CA"
              className={styles.travelLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hotel Fera
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ayres+Hotel+Orange+CA"
              className={styles.travelLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ayres Hotel Orange
            </a>
          </div>
        </>
      ),
    },
    faq: {
      title: 'FAQ',
      body: (
        <dl className={styles.faqList}>
          {faqItems.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className={styles.faqItem}>
                <dt
                  className={`${styles.question} ${isOpen ? styles.questionActive : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  role="button"
                  aria-expanded={isOpen}
                >
                  {item.q}
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      className={styles.answer}
                      initial={{ gridTemplateRows: '0fr', opacity: 0 }}
                      animate={{ gridTemplateRows: '1fr', opacity: 1 }}
                      exit={{ gridTemplateRows: '0fr', opacity: 0 }}
                      transition={{
                        gridTemplateRows: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.15, delay: 0.05 },
                      }}
                    >
                      <span className={styles.answerInner}>{item.a}</span>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>
      ),
    },
  };

  return (
    <section id="details" className={styles.panel}>
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
              <div className={styles.body}>{content[activeSection].body}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.nav}>
          <IconNav
            activeSection={activeSection}
            onSectionChange={changeSection}
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
                onClick={() => {
                  if (isOpen) {
                    setOpenAccordion(null);
                    return;
                  }

                  changeSection(id);
                }}
                aria-expanded={isOpen}
              >
                {isOpen && (
                  <motion.span
                    className={styles.accordionArrow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <ArrowDoodle direction="right" />
                  </motion.span>
                )}
                {content[id].title}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.accordionContent}
                    initial={{ gridTemplateRows: '0fr', opacity: 0 }}
                    animate={{ gridTemplateRows: '1fr', opacity: 1 }}
                    exit={{ gridTemplateRows: '0fr', opacity: 0 }}
                    transition={{
                      gridTemplateRows: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.15 },
                    }}
                  >
                    <div className={styles.accordionInner}>
                      <div className={styles.accordionBody}>
                        {content[id].body}
                      </div>
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
