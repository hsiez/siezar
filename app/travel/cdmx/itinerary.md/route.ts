import itineraryData from "../data/itinerary/itinerary-data.json";
import { validateItineraryData, Place } from "../data/itinerary/schema";

const RATING_ORDER: Record<string, number> = {
  repeat: 0,
  good: 1,
  pass: 2,
};

const SECTIONS: { key: keyof ReturnType<typeof validateItineraryData>["itinerary"]; title: string }[] = [
  { key: "coffee", title: "Coffee" },
  { key: "eats", title: "Food & Restaurants" },
  { key: "sights", title: "Sights & Attractions" },
  { key: "nightlife", title: "Nightlife" },
];

function renderPlace(place: Place): string {
  return `- **${place.name}** — ${place.location} — _${place.rating}_ — [maps](${place["google-link"]})`;
}

function renderSection(title: string, places: Place[]): string {
  const sorted = [...places].sort(
    (a, b) => (RATING_ORDER[a.rating] ?? 99) - (RATING_ORDER[b.rating] ?? 99),
  );
  return `## ${title}\n\n${sorted.map(renderPlace).join("\n")}\n`;
}

export const dynamic = "force-static";

export function GET() {
  const data = validateItineraryData(itineraryData);

  const body = [
    "# CDMX Itinerary",
    "",
    "A curated list of places in Mexico City, grouped by category. Each entry has a personal rating:",
    "",
    "- `repeat` — would go back",
    "- `good` — worth visiting",
    "- `pass` — skip it",
    "",
    ...SECTIONS.map((section) => renderSection(section.title, data.itinerary[section.key])),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
