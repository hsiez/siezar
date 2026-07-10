'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './RsvpFlow.module.css';

type RsvpStatus = 'pending' | 'attending' | 'declined';
export type FlowStep = 'lookup' | 'attendance' | 'dietary' | 'closing' | 'success';

export type ReservationPerson = {
  id: string;
  displayName: string;
  nameEditable: boolean;
  rsvpStatus: RsvpStatus;
  mealChoice: string | null;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
  dietaryNotes: string | null;
};

export type Reservation = {
  id: string;
  householdName: string;
  rsvpStatus: 'pending' | 'submitted';
  submittedAt: string | null;
  people: ReservationPerson[];
};

// Dev-only entry point: lets a preview mount straight into any phase with a
// mock reservation so every state is reachable without a real lookup/submit.
export type RsvpFlowDevProps = {
  initialStep?: FlowStep;
  initialReservation?: Reservation | null;
  /** skip the lookup/submit network calls so every transition plays on mock data */
  devMode?: boolean;
};

type PersonDraft = {
  id: string;
  displayName: string;
  nameEditable: boolean;
  rsvpStatus: RsvpStatus;
  vegetarianMeal: boolean;
  nutAllergy: boolean;
};

export function RsvpFlow({ initialStep, initialReservation, devMode = false }: RsvpFlowDevProps = {}) {
  const [step, setStep] = useState<FlowStep>(initialStep ?? 'lookup');
  const [phone, setPhone] = useState('');
  const [reservation, setReservation] = useState<Reservation | null>(initialReservation ?? null);
  const [people, setPeople] = useState<PersonDraft[]>(
    initialReservation ? initialReservation.people.map(personToDraft) : [],
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Transient "rsvp submitted" toast — decoupled from `step` so its fade-out
  // timer isn't torn down when we hand the envelope back to the lookup form.
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  function flashSuccess() {
    setShowToast(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2600);
  }
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const attendingPeople = useMemo(
    () => people.filter((person) => person.rsvpStatus === 'attending'),
    [people],
  );
  const hasAnsweredEveryone = people.length > 0 && people.every((person) => person.rsvpStatus !== 'pending');
  // `closing` is a CLOSED state so the envelope seals (card slides in, flap
  // folds) before landing on `success`.
  const isOpen = step === 'attendance' || step === 'dietary';
  const envelopeState = isOpen ? styles.envelopeOpen : styles.envelopeClosed;

  // Once a reservation loads, the card stays mounted (it just hides in the
  // pocket when closed) so it slides in/out instead of unmounting mid-animation.
  // `panelStep` remembers the last panel so the content never disappears while
  // the envelope is sealing.
  const [panelStep, setPanelStep] = useState<'attendance' | 'dietary'>('attendance');
  useEffect(() => {
    if (step === 'attendance' || step === 'dietary') {
      setPanelStep(step);
    }
  }, [step]);

  // Once the envelope has sealed on `success`, don't dwell in a dead-end panel:
  // flash a temporary confirmation and hand the sealed envelope back to a fresh
  // lookup form so another invitation can be found right away.
  useEffect(() => {
    if (step !== 'success') {
      return;
    }
    setStep('lookup');
    setPhone('');
    setReservation(null);
    setPeople([]);
    setError('');
    flashSuccess();
  }, [step]);

  async function handleLookup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (devMode) {
      // mock reservation is already loaded — just open the envelope
      setStep('attendance');
      return;
    }

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

    if (devMode) {
      // skip the network submit — just play the seal animation into success
      setStep('closing');
      window.setTimeout(() => setStep('success'), 1000);
      return;
    }

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
      setStep('closing');
      // hold on `closing` while the envelope seals (card slides in ~620ms, then
      // the flap folds ~420ms later), then reveal the success state
      window.setTimeout(() => setStep('success'), 1000);
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
    // Close the envelope (the card slides back into the pocket and hides). We
    // keep the reservation/people mounted so the card animates instead of
    // vanishing; a fresh lookup simply replaces them.
    setStep('lookup');
    setError('');
  }

  return (
    <div className={styles.flow}>
      <div className={`${styles.envelopeScene} ${envelopeState}`}>
        <div className={styles.envelope}>
          <div className={`${styles.envelopeBack} ${styles.grain}`} aria-hidden="true" />
          <div className={styles.cutoutShade} aria-hidden="true" />

          <div className={styles.cardSlot} aria-hidden={!isOpen}>
            {reservation && (
              <div className={styles.rsvpCard}>
              {panelStep === 'attendance' && (
                <div className={styles.stepPanel}>
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
                        <div className={styles.optionsGroup} aria-label={`${person.displayName} RSVP status`}>
                          <button
                            type="button"
                            className={`${styles.optionBox} ${person.rsvpStatus === 'attending' ? styles.optionActive : ''}`}
                            onClick={() => updatePerson(person.id, { rsvpStatus: 'attending' })}
                            aria-pressed={person.rsvpStatus === 'attending'}
                          >
                            <CheckMark />
                            <span>Going</span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.optionBox} ${person.rsvpStatus === 'declined' ? styles.optionActive : ''}`}
                            onClick={() => updatePerson(person.id, { rsvpStatus: 'declined' })}
                            aria-pressed={person.rsvpStatus === 'declined'}
                          >
                            <CheckMark />
                            <span>Can&apos;t make it</span>
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

              {panelStep === 'dietary' && (
                <div className={styles.stepPanel}>
                  <div className={styles.peopleList}>
                    {attendingPeople.map((person) => (
                      <div key={person.id} className={styles.dietaryRow}>
                        <div className={styles.personInfo}>
                          <p className={styles.personName}>{person.displayName}</p>
                        </div>
                        <div className={styles.optionsGroup} aria-label={`${person.displayName} meal details`}>
                          <button
                            type="button"
                            className={`${styles.optionBox} ${person.vegetarianMeal ? styles.optionActive : ''}`}
                            onClick={() => updatePerson(person.id, { vegetarianMeal: !person.vegetarianMeal })}
                            aria-pressed={person.vegetarianMeal}
                          >
                            <CheckMark />
                            <span>Vegetarian</span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.optionBox} ${person.nutAllergy ? styles.optionActive : ''}`}
                            onClick={() => updatePerson(person.id, { nutAllergy: !person.nutAllergy })}
                            aria-pressed={person.nutAllergy}
                          >
                            <CheckMark />
                            <span>Nut allergy</span>
                          </button>
                        </div>
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
            </div>
          )}
          </div>

          <div className={`${styles.envelopeFront} ${styles.grain}`} aria-hidden="true" />
          <div className={styles.envelopeFlap} aria-hidden="true">
            <div className={`${styles.flapFace} ${styles.grain}`} />
          </div>

          <div className={styles.envelopeBody}>
            {step === 'lookup' && (
              <form className={styles.lookupForm} onSubmit={handleLookup}>
                <label className={styles.field}>
                  <span className={styles.srOnly}>Phone number</span>
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
                  {isLoading ? 'Looking up...' : 'Find Invite'}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>

      <div
        className={`${styles.toast} ${showToast ? styles.toastShow : ''}`}
        role="status"
        aria-live="polite"
      >
        <svg className={styles.toastCheck} viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M4.25 9.15 L7.35 12.2 L13.9 5.8" />
        </svg>
        <span>rsvp submitted</span>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      className={styles.checkMark}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4.25 9.15 L7.35 12.2 L13.9 5.8" />
    </svg>
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
