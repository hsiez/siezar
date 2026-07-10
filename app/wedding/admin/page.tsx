import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { listRsvpReservationsForAdmin } from '@/lib/wedding/rsvp/repository';
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
        <div className={styles.householdScroll}>
          {reservations.map((reservation) => {
            const attending = reservation.people.filter((person) => person.rsvpStatus === 'attending').length;
            const declined = reservation.people.filter((person) => person.rsvpStatus === 'declined').length;
            const pending = reservation.people.filter((person) => person.rsvpStatus === 'pending').length;

            return (
              <details key={reservation.id} className={styles.householdCard}>
                <summary className={styles.householdSummary}>
                  <h3 className={styles.householdName}>{reservation.householdName}</h3>
                  <StatusBadge status={reservation.rsvpStatus} />
                </summary>

                <div className={styles.householdBody}>
                  <div className={styles.householdMeta}>
                    <MetaItem label="Reservation" value={reservation.id} />
                    <MetaItem label="Submitted" value={formatDateTime(reservation.submittedAt)} />
                    <MetaItem
                      label="Guests"
                      value={(
                        <GuestSummary
                          attending={attending}
                          declined={declined}
                          pending={pending}
                        />
                      )}
                    />
                    <MetaItem label="Phone" value={reservation.phoneNumbers.join(', ') || 'None'} />
                    <MetaItem label="Notes" value={reservation.adminNotes || reservation.deliveryNotes || 'None'} />
                    <MetaItem label="Message" value={reservation.note || 'None'} />
                  </div>

                  <div className={styles.guestGrid}>
                    <div className={styles.guestGridHeader}>Guest</div>
                    <div className={styles.guestGridHeader}>RSVP</div>
                    <div className={styles.guestGridHeader}>Dietary</div>
                    {reservation.people.map((person) => (
                      <div key={person.id} className={styles.guestRow}>
                        <div>
                          <span className={styles.primaryText}>{person.displayName}</span>
                          {person.nameEditable && <span className={styles.secondaryText}>Editable guest</span>}
                        </div>
                        <div><StatusBadge status={person.rsvpStatus} /></div>
                        <div>
                          <DietarySummary
                            mealChoice={person.mealChoice}
                            vegetarianMeal={person.vegetarianMeal}
                            nutAllergy={person.nutAllergy}
                            dietaryNotes={person.dietaryNotes}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
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

function MetaItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: 'pending' | 'submitted' | 'attending' | 'declined' }) {
  return <span className={`${styles.status} ${styles[status]}`}>{statusLabel(status)}</span>;
}

function GuestSummary({
  attending,
  declined,
  pending,
}: {
  attending: number;
  declined: number;
  pending: number;
}) {
  return (
    <span className={styles.guestSummary}>
      <span>{attending} yes</span>
      <span>{declined} no</span>
      <span>{pending} pending</span>
    </span>
  );
}

function DietarySummary({
  mealChoice,
  vegetarianMeal,
  nutAllergy,
  dietaryNotes,
}: {
  mealChoice: string | null;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
  dietaryNotes: string | null;
}) {
  const details = [
    mealChoice,
    vegetarianMeal ? 'Vegetarian' : null,
    nutAllergy ? 'Nut allergy' : null,
    dietaryNotes,
  ].filter(Boolean);

  return details.length > 0 ? details.join(', ') : 'None';
}

function statusLabel(status: 'pending' | 'submitted' | 'attending' | 'declined') {
  if (status === 'submitted') {
    return 'Submitted';
  }

  if (status === 'attending') {
    return 'Attending';
  }

  if (status === 'declined') {
    return 'Declined';
  }

  return 'Pending';
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
