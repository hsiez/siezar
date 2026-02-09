'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconNav, type SectionId } from '../IconNav/IconNav';
import styles from './InfoPanel.module.css';

const VENUE_ADDRESS = '146 N Grand St, Orange, CA 92866';
const PARKING_ADDRESS = '157 N Grand St, Orange, CA 92866';

const sections: SectionId[] = ['location', 'dresscode', 'itinerary', 'travelers', 'rsvp', 'faq'];

const faqItems = [
  { q: 'Can I bring a date/plus-one?', a: 'All invited guests will have their names included on our formal invitations. Please avoid bringing additional guests if their name is not included. Thank you in advance!' },
  { q: 'Can I bring my children?', a: 'No, we\u2019ve decided to have an adults-only celebration. Thank you for making arrangements!' },
  { q: 'Will the wedding be indoors or outdoors?', a: 'Our ceremony and cocktail hour will be hosted outdoors, followed by an indoor reception.' },
  { q: 'Are the ceremony and reception locations accessible?', a: 'Yes, both spaces are wheelchair accessible.' },
  { q: 'What time should I plan to arrive for the ceremony?', a: 'Please plan to arrive at 5:00 PM, as the ceremony will begin promptly at 5:30 PM.' },
  { q: 'Will there be an open bar?', a: 'Yes.' },
  { q: 'Do you have a registry?', a: 'We do not! Celebrating with you is what we care about most; our home is already full of love, laughter, and furniture. If you\u2019d still like to gift us a wedding present, we\u2019d greatly appreciate a contribution towards our honeymoon or house fund.' },
];

export function InfoPanel() {
  const [activeSection, setActiveSection] = useState<SectionId>('location');
  const [openAccordion, setOpenAccordion] = useState<SectionId | null>('location');
  const [showCopied, setShowCopied] = useState(false);
  const [showParkingCopied, setShowParkingCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(VENUE_ADDRESS);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1500);
    } catch {
      // Fallback: silently fail
    }
  }, []);

  const copyParkingAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PARKING_ADDRESS);
      setShowParkingCopied(true);
      setTimeout(() => setShowParkingCopied(false), 1500);
    } catch {
      // Fallback: silently fail
    }
  }, []);

  const content: Record<SectionId, { title: string; body: React.ReactNode }> = {
    location: {
      title: 'Location',
      body: (
        <>
          <p className={styles.venueName}>Grand Gimeno</p>
          <div
            className={styles.address}
            onClick={copyAddress}
            role="button"
            aria-label="Copy address to clipboard"
          >
            <AnimatePresence mode="wait" initial={false}>
              {showCopied ? (
                <motion.p
                  key="copied"
                  className={styles.addressTextCentered}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  Copied to clipboard
                </motion.p>
              ) : (
                <motion.p
                  key="address"
                  className={styles.addressText}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  146 N Grand St<br />
                  Orange, CA 92866
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <a
            href="https://maps.app.goo.gl/RCpy4sffawJxQWGC8"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Map
          </a>
          <div className={styles.parking}>
            <p className={styles.parkingTitle}>Park here</p>
            <div
              className={styles.address}
              onClick={copyParkingAddress}
              role="button"
              aria-label="Copy parking address to clipboard"
            >
              <AnimatePresence mode="wait" initial={false}>
                {showParkingCopied ? (
                  <motion.p
                    key="copied"
                    className={styles.addressTextCentered}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    Copied to clipboard
                  </motion.p>
                ) : (
                  <motion.p
                    key="parkingAddress"
                    className={styles.addressText}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    157 N Grand St<br />
                    Orange, CA 92866
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=157+N+Grand+St%2C+Orange%2C+CA+92866"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Map
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
            A well-tailored suit, tuxedo, or floor-length dress.
            Please avoid wearing shades similar to white (unless it&apos;s a dress shirt).
          </p>
        </>
      ),
    },
    itinerary: {
      title: 'Itinerary',
      body: (
        <ul className={styles.timeline}>
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
            <p className={styles.travelDetail}>
              About a 15 minute drive to the venue.
            </p>
          </div>
          <div className={styles.travelSection}>
            <p className={styles.travelHeading}>Where to Stay</p>
            <p className={styles.travelName}>Hotel Fera</p>
            <p className={styles.travelDetail}>
              Located in Anaheim, CA — about 10 minutes from the venue. This is where we&apos;ll be staying.
            </p>
            <p className={styles.travelName}>Hotel Ayres Orange</p>
            <p className={styles.travelDetail}>
              Just down the street from Hotel Fera.
            </p>
          </div>
        </>
      ),
    },
    rsvp: {
      title: 'RSVP',
      body: (
        <>
          <p className={styles.comingSoon}>Coming Soon</p>
          <div className={styles.rsvpDetails}>
            <p className={styles.rsvpDetail}>
              Once you have received our formal invitation, please RSVP using the website listed on the invitation.
            </p>
            <p className={styles.rsvpDeadline}>
              Deadline: Friday, August 21st, 2026
            </p>
            <p className={styles.rsvpDetail}>
              If you have food allergies or dietary restrictions, please include this information in your RSVP.
            </p>
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
