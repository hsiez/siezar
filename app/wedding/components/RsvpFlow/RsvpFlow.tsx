'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './RsvpFlow.module.css';

type RsvpStatus = 'pending' | 'attending' | 'declined';
type FlowStep = 'lookup' | 'attendance' | 'dietary' | 'success';

type ReservationPerson = {
  id: string;
  displayName: string;
  nameEditable: boolean;
  rsvpStatus: RsvpStatus;
  mealChoice: string | null;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
  dietaryNotes: string | null;
};

type Reservation = {
  id: string;
  householdName: string;
  rsvpStatus: 'pending' | 'submitted';
  submittedAt: string | null;
  people: ReservationPerson[];
};

type PersonDraft = {
  id: string;
  displayName: string;
  nameEditable: boolean;
  rsvpStatus: RsvpStatus;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
};

export function RsvpFlow() {
  const [step, setStep] = useState<FlowStep>('lookup');
  const [phone, setPhone] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [people, setPeople] = useState<PersonDraft[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const attendingPeople = useMemo(
    () => people.filter((person) => person.rsvpStatus === 'attending'),
    [people],
  );
  const hasAnsweredEveryone = people.length > 0 && people.every((person) => person.rsvpStatus !== 'pending');

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/wedding/rsvp/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.reservation) {
        setError('We could not find an invitation for that phone number.');
        return;
      }

      const nextReservation = payload.reservation as Reservation;
      setReservation(nextReservation);
      setPeople(nextReservation.people.map(personToDraft));
      setStep('attendance');
    } catch {
      setError('Something went wrong looking up your invitation.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit() {
    if (!reservation) {
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/wedding/rsvp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          reservationId: reservation.id,
          people: people.map((person) => ({
            id: person.id,
            displayName: person.nameEditable ? person.displayName : undefined,
            rsvpStatus: person.rsvpStatus,
            vegetarianMeal: person.vegetarianMeal,
            nutAllergy: person.nutAllergy,
          })),
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.reservation) {
        setError(payload.error ?? 'Unable to submit your RSVP.');
        return;
      }

      const nextReservation = payload.reservation as Reservation;
      setReservation(nextReservation);
      setPeople(nextReservation.people.map(personToDraft));
      setStep('success');
    } catch {
      setError('Something went wrong submitting your RSVP.');
    } finally {
      setIsLoading(false);
    }
  }

  function updatePerson(id: string, updates: Partial<PersonDraft>) {
    setPeople((currentPeople) => currentPeople.map((person) => {
      if (person.id !== id) {
        return person;
      }

      const nextPerson = { ...person, ...updates };

      if (updates.rsvpStatus === 'declined') {
        nextPerson.vegetarianMeal = false;
        nextPerson.nutAllergy = false;
      }

      return nextPerson;
    }));
  }

  function resetLookup() {
    setStep('lookup');
    setReservation(null);
    setPeople([]);
    setError('');
  }

  return (
    <div className={styles.flow}>
      {step === 'lookup' && (
        <form className={styles.lookupForm} onSubmit={handleLookup}>
          <label className={styles.field}>
            <span className={styles.label}>Phone number</span>
            <input
              className={styles.input}
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(555) 123-4567"
              required
            />
          </label>
          <button className={styles.primaryButton} type="submit" disabled={isLoading}>
            {isLoading ? 'Looking up...' : 'Find Invitation'}
          </button>
        </form>
      )}

      {step === 'attendance' && reservation && (
        <div className={styles.stepPanel}>
          <div className={styles.stepHeader}>
            <p className={styles.kicker}>Invitation</p>
            <p className={styles.household}>{reservation.householdName}</p>
          </div>

          <div className={styles.peopleList}>
            {people.map((person) => (
              <div key={person.id} className={styles.personRow}>
                <div className={styles.personInfo}>
                  {person.nameEditable ? (
                    <label className={styles.editableName}>
                      <span className={styles.label}>Name</span>
                      <input
                        className={styles.input}
                        value={person.displayName}
                        onChange={(event) => updatePerson(person.id, { displayName: event.target.value })}
                      />
                    </label>
                  ) : (
                    <p className={styles.personName}>{person.displayName}</p>
                  )}
                </div>
                <div className={styles.segmentedControl} aria-label={`${person.displayName} RSVP status`}>
                  <button
                    type="button"
                    className={`${styles.segmentButton} ${person.rsvpStatus === 'attending' ? styles.segmentActive : ''}`}
                    onClick={() => updatePerson(person.id, { rsvpStatus: 'attending' })}
                  >
                    Going
                  </button>
                  <button
                    type="button"
                    className={`${styles.segmentButton} ${person.rsvpStatus === 'declined' ? styles.segmentActive : ''}`}
                    onClick={() => updatePerson(person.id, { rsvpStatus: 'declined' })}
                  >
                    Cannot make it
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryButton} type="button" onClick={resetLookup}>
              Back
            </button>
            <button
              className={styles.primaryButton}
              type="button"
              disabled={!hasAnsweredEveryone || isLoading}
              onClick={() => attendingPeople.length > 0 ? setStep('dietary') : handleSubmit()}
            >
              {attendingPeople.length > 0 ? 'Next' : 'Submit RSVP'}
            </button>
          </div>
        </div>
      )}

      {step === 'dietary' && reservation && (
        <div className={styles.stepPanel}>
          <div className={styles.stepHeader}>
            <p className={styles.kicker}>Dietary</p>
            <p className={styles.household}>{reservation.householdName}</p>
          </div>

          <div className={styles.peopleList}>
            {attendingPeople.map((person) => (
              <div key={person.id} className={styles.dietaryRow}>
                <p className={styles.personName}>{person.displayName}</p>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={person.vegetarianMeal}
                    onChange={(event) => updatePerson(person.id, { vegetarianMeal: event.target.checked })}
                  />
                  Vegetarian meal
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={person.nutAllergy}
                    onChange={(event) => updatePerson(person.id, { nutAllergy: event.target.checked })}
                  />
                  Nut allergy
                </label>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryButton} type="button" onClick={() => setStep('attendance')}>
              Back
            </button>
            <button className={styles.primaryButton} type="button" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && reservation && (
        <div className={styles.success}>
          <p className={styles.kicker}>RSVP Received</p>
          <p className={styles.household}>{reservation.householdName}</p>
          <button className={styles.secondaryButton} type="button" onClick={resetLookup}>
            Look Up Another Invitation
          </button>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.deadline}>Deadline: Friday, August 21st, 2026</p>
    </div>
  );
}

function personToDraft(person: ReservationPerson): PersonDraft {
  return {
    id: person.id,
    displayName: person.displayName,
    nameEditable: person.nameEditable,
    rsvpStatus: person.rsvpStatus,
    vegetarianMeal: person.vegetarianMeal,
    nutAllergy: person.nutAllergy,
  };
}
