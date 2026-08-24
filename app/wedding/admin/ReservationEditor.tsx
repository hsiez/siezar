'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminRsvpReservation } from '@/lib/wedding/rsvp/repository';
import styles from './admin.module.css';

type PersonDraft = AdminRsvpReservation['people'][number];

export function ReservationEditor({ initialReservations }: { initialReservations: AdminRsvpReservation[] }) {
  const router = useRouter();
  const [reservations, setReservations] = useState(initialReservations);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ reservationId: string; text: string; error?: boolean } | null>(null);

  function updatePerson(reservationId: string, personId: string, update: Partial<PersonDraft>) {
    setReservations((current) => current.map((reservation) => (
      reservation.id === reservationId
        ? {
          ...reservation,
          people: reservation.people.map((person) => (
            person.id === personId ? { ...person, ...update } : person
          )),
        }
        : reservation
    )));
  }

  async function saveReservation(event: FormEvent<HTMLFormElement>, reservation: AdminRsvpReservation) {
    event.preventDefault();
    setSavingId(reservation.id);
    setMessage(null);

    try {
      const response = await fetch(`/wedding/admin/api/reservations/${encodeURIComponent(reservation.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          people: reservation.people.map((person) => ({
            id: person.id,
            displayName: person.nameEditable ? person.displayName : undefined,
            rsvpStatus: person.rsvpStatus,
            mealChoice: person.mealChoice ?? undefined,
            vegetarianMeal: person.vegetarianMeal,
            nutAllergy: person.nutAllergy,
            dietaryNotes: person.dietaryNotes ?? undefined,
          })),
        }),
      });
      const body = await response.json() as { reservation?: AdminRsvpReservation; error?: string };

      if (!response.ok || !body.reservation) {
        throw new Error(body.error || 'Unable to save this reservation.');
      }

      setReservations((current) => current.map((item) => (
        item.id === reservation.id ? body.reservation! : item
      )));
      setMessage({ reservationId: reservation.id, text: 'Saved.' });
      router.refresh();
    } catch (error) {
      setMessage({
        reservationId: reservation.id,
        text: error instanceof Error ? error.message : 'Unable to save this reservation.',
        error: true,
      });
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className={styles.householdScroll}>
      {reservations.map((reservation) => (
        <details key={reservation.id} className={styles.householdCard}>
          <summary className={styles.householdSummary}>
            <span>
              <span className={styles.householdName}>{reservation.householdName}</span>
              <span className={styles.summaryMeta}>{reservation.people.length} guest{reservation.people.length === 1 ? '' : 's'}</span>
            </span>
            <StatusBadge status={reservation.rsvpStatus} />
          </summary>

          <form className={styles.householdBody} onSubmit={(event) => saveReservation(event, reservation)}>
            <div className={styles.householdMeta}>
              <MetaItem label="Reservation" value={reservation.id} />
              <MetaItem label="Submitted" value={formatDateTime(reservation.submittedAt)} />
              <MetaItem label="Phone" value={reservation.phoneNumbers.join(', ') || 'None'} />
              <MetaItem label="Notes" value={reservation.adminNotes || reservation.deliveryNotes || 'None'} />
              <MetaItem label="Message" value={reservation.note || 'None'} />
            </div>

            <div className={styles.editorIntro}>
              <div>
                <h3 className={styles.editorTitle}>RSVP & meal preferences</h3>
                <p className={styles.editorDescription}>Mark every guest, then save the household together.</p>
              </div>
            </div>

            <div className={styles.editorList}>
              {reservation.people.map((person) => {
                const isAttending = person.rsvpStatus === 'attending';
                return (
                  <fieldset key={person.id} className={styles.personEditor}>
                    <legend className={styles.personName}>{person.displayName}</legend>
                    {person.nameEditable && (
                      <label className={styles.field}>
                        <span>Guest name</span>
                        <input
                          value={person.displayName}
                          onChange={(event) => updatePerson(reservation.id, person.id, { displayName: event.target.value })}
                        />
                      </label>
                    )}
                    <label className={styles.field}>
                      <span>RSVP</span>
                      <select
                        value={person.rsvpStatus}
                        onChange={(event) => updatePerson(reservation.id, person.id, {
                          rsvpStatus: event.target.value as PersonDraft['rsvpStatus'],
                        })}
                      >
                        <option value="pending">Pending</option>
                        <option value="attending">Attending</option>
                        <option value="declined">Declined</option>
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Meal choice</span>
                      <input
                        value={person.mealChoice ?? ''}
                        disabled={!isAttending}
                        placeholder={isAttending ? 'Optional' : 'Attending only'}
                        onChange={(event) => updatePerson(reservation.id, person.id, { mealChoice: event.target.value })}
                      />
                    </label>
                    <label className={`${styles.field} ${styles.notesField}`}>
                      <span>Dietary notes</span>
                      <input
                        value={person.dietaryNotes ?? ''}
                        disabled={!isAttending}
                        placeholder={isAttending ? 'Optional' : 'Attending only'}
                        onChange={(event) => updatePerson(reservation.id, person.id, { dietaryNotes: event.target.value })}
                      />
                    </label>
                    <div className={`${styles.field} ${styles.checkboxes}`}>
                      <span>Dietary flags</span>
                      <label>
                        <input
                          type="checkbox"
                          checked={person.vegetarianMeal}
                          disabled={!isAttending}
                          onChange={(event) => updatePerson(reservation.id, person.id, { vegetarianMeal: event.target.checked })}
                        />
                        Vegetarian
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={person.nutAllergy}
                          disabled={!isAttending}
                          onChange={(event) => updatePerson(reservation.id, person.id, { nutAllergy: event.target.checked })}
                        />
                        Nut allergy
                      </label>
                    </div>
                  </fieldset>
                );
              })}
            </div>

            <div className={styles.saveRow}>
              <button className={styles.saveButton} type="submit" disabled={savingId === reservation.id}>
                {savingId === reservation.id ? 'Saving…' : 'Save reservation'}
              </button>
              {message?.reservationId === reservation.id && (
                <p className={message.error ? styles.errorMessage : styles.successMessage} role="status">
                  {message.text}
                </p>
              )}
            </div>
          </form>
        </details>
      ))}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: 'pending' | 'submitted' }) {
  return <span className={`${styles.status} ${styles[status]}`}>{status === 'submitted' ? 'Submitted' : 'Pending'}</span>;
}

function formatDateTime(value: string | null) {
  if (!value) return 'Not yet';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(new Date(value));
}
