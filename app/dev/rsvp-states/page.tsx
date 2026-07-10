'use client';

// Dev harness: step through every RSVP phase with a mock reservation, no real
// lookup/submit required. Pick a phase to jump into it; once mounted you can
// click the real buttons (Next / Submit / Back) to watch the transitions.
import { useState } from 'react';
import { RsvpFlow, type FlowStep, type Reservation } from '@/app/wedding/components/RsvpFlow/RsvpFlow';

const MOCK: Reservation = {
  id: 'DEV-1',
  householdName: 'The Siezar Household',
  rsvpStatus: 'pending',
  submittedAt: null,
  people: [
    { id: 'p1', displayName: 'Joshua Bae', nameEditable: false, rsvpStatus: 'attending', mealChoice: null, vegetarianMeal: false, nutAllergy: false, dietaryNotes: null },
    { id: 'p2', displayName: 'Alexa Dizon', nameEditable: false, rsvpStatus: 'attending', mealChoice: null, vegetarianMeal: false, nutAllergy: false, dietaryNotes: null },
  ],
};

const PHASES: { step: FlowStep; label: string; note: string }[] = [
  { step: 'lookup', label: 'lookup', note: 'sealed envelope + phone form' },
  { step: 'attendance', label: 'attendance', note: 'open · going / can’t make it' },
  { step: 'dietary', label: 'dietary', note: 'open · vegetarian / nut allergy' },
  { step: 'note', label: 'note', note: 'open · optional message for the couple' },
  { step: 'closing', label: 'closing', note: 'sealing animation (card in → flap folds)' },
  { step: 'success', label: 'success', note: 'sealed · rsvp submitted!' },
];

export default function RsvpStates() {
  const [phase, setPhase] = useState<FlowStep>('attendance');
  const active = PHASES.find((p) => p.step === phase)!;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', gap: 8, background: 'linear-gradient(180deg,#fffff7,#fbfaf2)', fontFamily: 'var(--font-geist-mono), monospace' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {PHASES.map((p) => (
          <button
            key={p.step}
            type="button"
            onClick={() => setPhase(p.step)}
            style={{
              padding: '8px 14px',
              border: '1px solid rgba(20,20,20,0.12)',
              borderRadius: 6,
              background: phase === p.step ? 'rgba(20,20,20,0.86)' : '#fff',
              color: phase === p.step ? '#fff' : 'rgba(20,20,20,0.7)',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#a9a99f', margin: 0 }}>{active.note}</p>

      <div style={{ width: 'min(100%, 700px)', display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        {/* key forces a fresh mount at the chosen phase; devMode skips the API
            so the real buttons (Find Invite / Next / Submit / Back) animate the
            transitions on mock data */}
        <RsvpFlow key={phase} initialStep={phase} initialReservation={MOCK} devMode />
      </div>
    </main>
  );
}
