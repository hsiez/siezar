import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { RsvpError, updateReservationRsvpFromAdmin } from '@/lib/wedding/rsvp/repository';
import { adminUpdateRequestSchema } from '@/lib/wedding/rsvp/schema';

export const runtime = 'nodejs';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ reservationId: string }> },
) {
  try {
    const { reservationId } = await context.params;
    const input = adminUpdateRequestSchema.parse(await request.json());
    const reservation = await updateReservationRsvpFromAdmin(reservationId, input);

    return NextResponse.json({ reservation });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid reservation update.' }, { status: 400 });
    }

    if (error instanceof RsvpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error(error);
    return NextResponse.json({ error: 'Unable to save reservation.' }, { status: 500 });
  }
}
