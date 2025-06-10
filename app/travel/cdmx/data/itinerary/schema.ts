import { z } from 'zod';

// Schema for individual place/venue
export const PlaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  "google-link": z.string().url("Must be a valid URL")
});

// Schema for the complete itinerary structure
export const ItineraryDataSchema = z.object({
  itinerary: z.object({
    coffee: z.array(PlaceSchema),
    eats: z.array(PlaceSchema),
    sights: z.array(PlaceSchema),
    nightlife: z.array(PlaceSchema)
  })
});

// TypeScript types generated from schemas
export type Place = z.infer<typeof PlaceSchema>;
export type ItineraryData = z.infer<typeof ItineraryDataSchema>;

// Validation function
export function validateItineraryData(data: unknown): ItineraryData {
  const result = ItineraryDataSchema.safeParse(data);
  
  if (!result.success) {
    console.error("Itinerary data validation failed:", result.error);
    throw new Error(`Invalid itinerary data: ${result.error.message}`);
  }
  
  return result.data;
} 