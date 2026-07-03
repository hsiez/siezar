import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { RsvpError, submitReservationRsvp } from '@/lib/wedding/rsvp/repository';
import { submitRequestSchema } from '@/lib/wedding/rsvp/schema';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = submitRequestSchema.parse(await request.json());
    const reservation = await submitReservationRsvp(body);

    return NextResponse.json({ reservation });
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Invalid RSVP submission.' }, { status: 400 });
  }

  if (error instanceof RsvpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(error);
  return NextResponse.json({ error: 'Unable to submit RSVP reservation.' }, { status: 500 });
}

