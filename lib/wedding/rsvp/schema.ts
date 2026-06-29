import { z } from 'zod';

export const rsvpStatusSchema = z.enum(['pending', 'attending', 'declined']);

export const lookupRequestSchema = z.object({
  phone: z.string().min(7),
});

export const submitPersonSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().trim().min(1).max(120).optional(),
  rsvpStatus: rsvpStatusSchema.exclude(['pending']),
  mealChoice: z.string().trim().max(120).optional(),
  vegetarianMeal: z.boolean().optional(),
  nutAllergy: z.boolean().optional(),
  dietaryNotes: z.string().trim().max(500).optional(),
});

export const submitRequestSchema = z.object({
  phone: z.string().min(7),
  reservationId: z.string().min(1),
  people: z.array(submitPersonSchema).min(1),
});

export type RsvpStatus = z.infer<typeof rsvpStatusSchema>;
export type LookupRequest = z.infer<typeof lookupRequestSchema>;
export type SubmitRequest = z.infer<typeof submitRequestSchema>;
