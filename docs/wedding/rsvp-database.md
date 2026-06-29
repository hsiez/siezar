# Wedding RSVP Database

The live RSVP mechanism uses a small SQL model:

- `reservations`: one row per invitation/reservation.
- `reservation_phones`: one or more phone numbers that can access a reservation.
- `reservation_people`: every person attached to a reservation.
- `rsvp_events`: audit log of every submission.

Guest PII should stay out of tracked source files. Keep seed CSVs in `.context/` or pass paths through environment variables.

## Environment

Local development defaults to:

```bash
WEDDING_RSVP_DATABASE_URL=file:.context/wedding-rsvp.db
```

Production should use the Vercel Turso integration variables:

```bash
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
```

The migration and seed scripts load `.env.local` automatically, so pulled Vercel env vars are available without wrapping commands in `vercel env run`.

## Vercel Turso Setup

Provision the resource:

```bash
vercel integration add tursocloud/database --name wedding-rsvp -m region=iad1
vercel env pull .env.local
```

If Vercel reports `integration_terms_acceptance_required`, accept the Turso marketplace terms in the browser URL printed by the CLI, then rerun the `vercel integration add` command.

Current Vercel resource:

```text
name: wedding-rsvp
product: Turso database
project: siezar
environments: production, preview, development
```

After env vars are pulled, migrate and seed:

```bash
npm run wedding:rsvp:migrate
npm run wedding:rsvp:seed
```

## Commands

```bash
npm run wedding:rsvp:migrate
npm run wedding:rsvp:seed
```

The seed command reads these CSVs by default when present:

```text
.context/rsvp-invitations-seed.csv
.context/rsvp-phones-seed.csv
.context/rsvp-people-seed.csv
```

You can override paths:

```bash
RSVP_RESERVATIONS_CSV=/path/to/reservations.csv npm run wedding:rsvp:seed
RSVP_PHONES_CSV=/path/to/phones.csv npm run wedding:rsvp:seed
RSVP_PEOPLE_CSV=/path/to/people.csv npm run wedding:rsvp:seed
```

## CSV Shapes

Reservations:

```csv
reservation_id,source_number,household_name,mailing_address,delivery_method,delivery_notes,rsvp_status,admin_notes
RES-001,1,Paul & Lisa Example,"123 Main St, Orange, CA 92866",mail,,pending,
```

The importer also accepts `invitation_id` instead of `reservation_id`, which matches the current `.context/rsvp-invitations-seed.csv`.

Phones:

```csv
phone_id,reservation_id,phone_e164,label
PHONE-001,RES-001,+15551234567,Paul
PHONE-002,RES-001,+15557654321,Lisa
```

People:

```csv
person_id,reservation_id,display_name,name_editable,rsvp_status,meal_choice,vegetarian_meal,nut_allergy,dietary_notes,sort_order
PERSON-001,RES-001,Paul Example,false,pending,,false,false,,1
PERSON-002,RES-001,Lisa Example,false,pending,,false,false,,2
PERSON-003,RES-001,Guest,true,pending,,false,false,,3
```

Use `name_editable=true` for placeholder people whose final name can be supplied during RSVP.

## API

Lookup:

```http
POST /api/wedding/rsvp/lookup
Content-Type: application/json

{"phone":"555-123-4567"}
```

Submit:

```http
POST /api/wedding/rsvp/submit
Content-Type: application/json

{
  "phone": "555-123-4567",
  "reservationId": "RES-001",
  "people": [
    {
      "id": "PERSON-001",
      "rsvpStatus": "attending",
      "vegetarianMeal": true,
      "nutAllergy": false
    },
    {"id": "PERSON-002", "rsvpStatus": "declined"},
    {
      "id": "PERSON-003",
      "displayName": "Guest Name",
      "rsvpStatus": "attending",
      "nutAllergy": true,
      "dietaryNotes": "No shellfish"
    }
  ]
}
```

Submissions are latest-write-wins. Every submission also inserts a `rsvp_events` row for history.

Dietary fields only apply to people marked `attending`. The server clears `vegetarian_meal`, `nut_allergy`, `meal_choice`, and `dietary_notes` for people marked `declined`.
