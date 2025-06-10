import { z } from 'zod';

// Define the Zod schema for trip data
export const TripEntrySchema = z.object({
  title: z.string(),
  content: z.array(z.string()),
  photoRowStart: z.number().nullable(),
  photoRowEnd: z.number().nullable(),
});

export const TripDaySchema = z.object({
  dayNumber: z.number(),
  date: z.string(),
  title: z.string(),
  entries: z.array(TripEntrySchema),
});

export const TripDataSchema = z.object({
  trip: z.object({
    days: z.array(TripDaySchema),
  }),
});

// Automatically generate TypeScript types from the schema
export type TripEntry = z.infer<typeof TripEntrySchema>;
export type TripDay = z.infer<typeof TripDaySchema>;
export type TripData = z.infer<typeof TripDataSchema>;

// Validation function
export function validateTripData(data: unknown): TripData {
  return TripDataSchema.parse(data);
} 