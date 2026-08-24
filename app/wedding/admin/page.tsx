import type { Metadata } from 'next';
import { listRsvpReservationsForAdmin } from '@/lib/wedding/rsvp/repository';
import { ReservationEditor } from './ReservationEditor';
import styles from './admin.module.css';

export const metadata: Metadata = {
  title: 'Wedding RSVP Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function WeddingRsvpAdminPage() {
  const reservations = await listRsvpReservationsForAdmin();
  const allPeople = reservations.flatMap((reservation) => reservation.people);

  const submittedReservations = reservations.filter((reservation) => reservation.rsvpStatus === 'submitted');
  const attendingPeople = allPeople.filter((person) => person.rsvpStatus === 'attending');
  const declinedPeople = allPeople.filter((person) => person.rsvpStatus === 'declined');
  const pendingPeople = allPeople.filter((person) => person.rsvpStatus === 'pending');
  const vegetarianMeals = attendingPeople.filter((person) => person.vegetarianMeal);
  const nutAllergies = attendingPeople.filter((person) => person.nutAllergy);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Private</p>
          <h1 className={styles.title}>Wedding RSVP Admin</h1>
        </div>
        <p className={styles.updated}>Updated {formatDateTime(new Date().toISOString())}</p>
      </header>

      <section className={styles.stats} aria-label="RSVP totals">
        <Stat label="Households RSVP'd" value={`${submittedReservations.length}/${reservations.length}`} />
        <Stat label="Attending" value={String(attendingPeople.length)} />
        <Stat label="Declined" value={String(declinedPeople.length)} />
        <Stat label="Pending Guests" value={String(pendingPeople.length)} />
        <Stat label="Vegetarian" value={String(vegetarianMeals.length)} />
        <Stat label="Nut Allergies" value={String(nutAllergies.length)} />
      </section>

      <section className={`${styles.section} ${styles.householdsSection}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Households</h2>
          <p className={styles.sectionMeta}>
            {submittedReservations.length} submitted · {allPeople.length} guests
          </p>
        </div>
        <ReservationEditor initialReservations={reservations} />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function formatDateTime(value: string | null) {
  if (!value) {
    return 'Not yet';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
