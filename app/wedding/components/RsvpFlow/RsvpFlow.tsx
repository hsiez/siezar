'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './RsvpFlow.module.css';

type RsvpStatus = 'pending' | 'attending' | 'declined';
export type FlowStep = 'lookup' | 'attendance' | 'dietary' | 'note' | 'closing' | 'success';

// Time for the envelope to seal — card slides in (~620ms) then the flap folds
// (~420ms after). Keep in sync with the transitions in RsvpFlow.module.css.
const SEAL_MS = 1000;

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
  note?: string | null;
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
  const [note, setNote] = useState(initialReservation?.note ?? '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Transient "rsvp submitted" toast — decoupled from `step` so its fade-out
  // timer isn't torn down as the flow moves on.
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const resetTimer = useRef<number | undefined>(undefined);
  // Remembers the last error text so the error toast keeps its message while it
  // fades out (after `error` is cleared) instead of blanking mid-transition.
  const lastError = useRef('');
  useEffect(() => () => {
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(resetTimer.current);
  }, []);

  const attendingPeople = useMemo(
    () => people.filter((person) => person.rsvpStatus === 'attending'),
    [people],
  );
  const hasAnsweredEveryone = people.length > 0 && people.every((person) => person.rsvpStatus !== 'pending');
  // `closing` is a CLOSED state so the envelope seals (card slides in, flap
  // folds) before landing on `success`.
  const isOpen = step === 'attendance' || step === 'dietary' || step === 'note';
  const envelopeState = isOpen ? styles.envelopeOpen : styles.envelopeClosed;

  // Once a reservation loads, the card stays mounted (it just hides in the
  // pocket when closed) so it slides in/out instead of unmounting mid-animation.
  // `panelStep` remembers the last panel so the content never disappears while
  // the envelope is sealing.
  const [panelStep, setPanelStep] = useState<'attendance' | 'dietary' | 'note'>('attendance');
  useEffect(() => {
    if (step === 'attendance' || step === 'dietary' || step === 'note') {
      setPanelStep(step);
    }
  }, [step]);

  // We only reach `success` once the seal animation has finished AND the submit
  // is confirmed. Hold the sealed envelope, float the confirmation above it,
  // then hand back a fresh lookup form so another invitation can be found.
  useEffect(() => {
    if (step !== 'success') {
      return;
    }
    setShowToast(true);
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(resetTimer.current);
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2600);
    resetTimer.current = window.setTimeout(() => {
      setStep('lookup');
      setPhone('');
      setReservation(null);
      setPeople([]);
      setNote('');
      setError('');
    }, 3000);
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
      setNote(nextReservation.note ?? '');
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

    // Seal the envelope right away and run the submit in parallel — the
    // confirmation only appears once the animation has finished AND the submit
    // is confirmed (whichever lands last).
    const openPanel = panelStep;
    setStep('closing');
    const sealed = new Promise<void>((resolve) => window.setTimeout(resolve, SEAL_MS));

    if (devMode) {
      // no network — land on success as soon as the seal animation settles
      await sealed;
      setStep('success');
      return;
    }

    setIsLoading(true);

    try {
      const confirmed = fetch('/api/wedding/rsvp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          reservationId: reservation.id,
          note: note.trim() || undefined,
          people: people.map((person) => ({
            id: person.id,
            displayName: person.nameEditable ? person.displayName : undefined,
            rsvpStatus: person.rsvpStatus,
            vegetarianMeal: person.vegetarianMeal,
            nutAllergy: person.nutAllergy,
          })),
        }),
      }).then(async (response) => {
        const payload = await response.json();
        if (!response.ok || !payload.reservation) {
          throw new Error(payload.error ?? 'Unable to submit your RSVP.');
        }
      });

      // wait for BOTH the seal animation and the submit confirmation
      await Promise.all([confirmed, sealed]);
      setStep('success');
    } catch (submitError) {
      // let the seal settle, then reopen the panel so the RSVP can be retried
      await sealed;
      setStep(openPanel);
      setError(
        submitError instanceof Error && submitError.message
          ? submitError.message
          : 'Something went wrong submitting your RSVP.',
      );
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
    // Close the envelope first, THEN reveal the lookup form: hold on `closing`
    // (envelope sealed, no form) while it slides back up and the flap folds,
    // then switch to `lookup` so the search only appears once the envelope is
    // back in position. Reservation/people stay mounted meanwhile.
    setError('');
    setStep('closing');
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStep('lookup'), 1150);
  }

  if (error) {
    lastError.current = error;
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
                            <p className={styles.personName}>{firstName(person.displayName)}</p>
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
                      disabled={!hasAnsweredEveryone}
                      onClick={() => setStep(attendingPeople.length > 0 ? 'dietary' : 'note')}
                    >
                      Next
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
                          <p className={styles.personName}>{firstName(person.displayName)}</p>
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
                    <button className={styles.primaryButton} type="button" onClick={() => setStep('note')}>
                      Next
                    </button>
                  </div>
                </div>
              )}

              {panelStep === 'note' && (
                <div className={styles.stepPanel}>
                  <textarea
                    className={styles.textarea}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={4}
                    maxLength={200}
                    placeholder="A note for the couple (optional)"
                    aria-label="A note for the couple"
                  />

                  <div className={styles.actions}>
                    <button
                      className={styles.secondaryButton}
                      type="button"
                      onClick={() => setStep(attendingPeople.length > 0 ? 'dietary' : 'attendance')}
                    >
                      Back
                    </button>
                    <button className={styles.primaryButton} type="button" disabled={isLoading} aria-busy={isLoading} onClick={handleSubmit}>
                      <span className={isLoading ? styles.buttonLabelLoading : undefined}>Submit RSVP</span>
                      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
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
                <button className={styles.primaryButton} type="submit" disabled={isLoading} aria-busy={isLoading}>
                  <span className={isLoading ? styles.buttonLabelLoading : undefined}>Find Invite</span>
                  {isLoading && <span className={styles.spinner} aria-hidden="true" />}
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

      <div
        className={`${styles.toast} ${styles.toastError} ${error ? styles.toastShow : ''}`}
        role="alert"
        aria-live="assertive"
      >
        <span>{error || lastError.current}</span>
      </div>
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

// Display just the first name to save horizontal space in the card rows.
function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
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
