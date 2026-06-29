import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { findReservationByPhone, RsvpError } from '@/lib/wedding/rsvp/repository';
import { lookupRequestSchema } from '@/lib/wedding/rsvp/schema';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = lookupRequestSchema.parse(await request.json());
    const reservation = await findReservationByPhone(body.phone);

    if (!reservation) {
      return NextResponse.json({ reservation: null }, { status: 404 });
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: 'Invalid RSVP lookup request.' }, { status: 400 });
  }

  if (error instanceof RsvpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(error);
  return NextResponse.json({ error: 'Unable to look up RSVP reservation.' }, { status: 500 });
}

