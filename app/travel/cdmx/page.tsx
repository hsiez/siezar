import styles from "./page.module.css";
import FieldNoteCard from "@/app/components/field-notes/field-note-card";
import { PhotoDetail } from "../../components/field-notes/photo-grid/photo-grid";
import AudioWidget from "../../components/field-notes/audio-widget/audio-widget";
import { Metadata } from 'next';
import Entries from "../../components/field-notes/entries/entries";
import { validateTripData } from "./data/schema";
import tripData from "./data/journal-entries/trip-data.json";
import photos from "./data/photos";


// Validate the trip data at the page level
const validatedTripData = validateTripData(tripData);

export const metadata: Metadata = {
  title: "CDMX Travel Journal",
  description: "A travel journal detailing a trip to Mexico City (CDMX).",
  icons: {
    icon: "/globe-white.svg", // Replace with your favicon path
  },
  openGraph: {
    images: [
      { 
        url: "/cdmx/og.jpeg", // Replace with your Open Graph image path
        alt: "CDMX Travel Journal Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://siezar.vercel.app/cdmx/og.jpeg"], // Replace with your Twitter image path
  },
};

export default function CDMX() {

  const day1PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: photos.day1.ceviche, alt: "Ceviche at Balandra", caption: "Balandra", imageClassName: styles.portrait },
      { id: 2, src: photos.day1.bigBite, alt: "Big Bite", caption: "Big Bite" }
    ],
    [
      { id: 4, src: photos.day1.panaderiaRosetta, alt: "Panaderia Rosetta", caption: "Rosetta" }
    ],
    [
      { id: 3, src: photos.day1.jazzClub, alt: "Jazzatlán Capital", caption: "Jazzatlán" }
    ],
    
    [
      { id: 4, src: photos.day1.tlecan, alt: "Tlecan Bar", caption: "Tlecan" },
    ],
    [
      { id: 5, src: photos.day1.valleOutside, alt: "Tacos de Valle", caption: "Tacos de Valle" },
      { id: 6, src: photos.day1.valleSelfie, alt: "Tacos de Valle", caption: "selfie" }
    ]
  ];

  const day2PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: photos.day2.niceCoffee, alt: "Nice Day Coffee", caption: "Nice Day" },
    ],
    [
      { id: 2, src: photos.day2.castle2, alt: "Chapultepec Castle view", caption: "Castle" },
      { id: 3, src: photos.day2.hallway, alt: "Stain glass hallway", caption: "Hallway" },
      { id: 4, src: photos.day2.garden, alt: "Castle garden", caption: "Garden" }
    ],
    [
      { id: 5, src: photos.day2.lardo, alt: "Lardo Restaurant", caption: "Lardo" },
      { id: 6, src: photos.day2.lardo2, alt: "Lardo Restaurant", caption: "Lardo" }
    ],
    [
      { id: 4, src: photos.day2.churro, alt: "El Moro Churros", caption: "El Moro" },
      { id: 5, src: photos.day2.tono, alt: "Toño's Restaurant", caption: "Toño's" }
    ],
    [
      { id: 6, src: photos.day2.dep, alt: "Departamento", caption: "Departamento" },
      { id: 7, src: photos.day1.valle2, alt: "Tacos de Valle", caption: "Valle" }
    ]
  ];

  const day3PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: photos.day3.almanegra, alt: "Almanegra Coffee", caption: "Almanegra" },
      { id: 2, src: photos.day3.cortado, alt: "Cortado", caption: "Cortado" },
      { id: 3, src: photos.day3.plaza, alt: "Plaza Rio de Janeiro", caption: "Plz Janeiro" },
    ],
    [
      { id: 4, src: photos.day3.xinu2, alt: "Xinú Entrance", caption: "Xinú" },
      { id: 5, src: photos.day3.xinu, alt: "Xinú Store", caption: "Xinú" }
    ],
    [
      { id: 6, src: photos.day3.mue, alt: "Museo Nacional de Antropología", caption: "sun stone"},
      { id: 7, src: photos.day3.mue1, alt: "Museo Nacional de Antropología", caption: "courtyard" },
      { id: 8, src: photos.day3.mue2, alt: "Museo Nacional de Antropología", caption: "courtyard 2" }
    ],
    [
      { id: 4, src: photos.day3.gaba, alt: "Gaba Salad", caption: "Tomato Salad" },
      { id: 5, src: photos.day3.gabaFish, alt: "Gaba Fish", caption: "Catch of Day" },
      { id: 6, src: photos.day3.gabaLengua, alt: "Gaba Lengua", caption: "Carpaccio" },
    ],
    [
      { id: 7, src: photos.day3.lucha, alt: "Lucha Libre", caption: "Lucha" }
    ]
  ];

  const day4PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: photos.day4.eseCafe1, alt: "Ese Cafe", caption: "Ese Cafe" },
      { id: 2, src: photos.day4.eseCafe2, alt: "Ese Cafe", caption: "Ese Cafe" }
    ],
    [
      { id: 3, src: photos.day4.xuxu, alt: "Xuxu", caption: "Xuxu" },
    ],
    [
      { id: 4, src: photos.day4.lib1, alt: "Libreria", caption: "Libreria" },
      { id: 5, src: photos.day4.lib2, alt: "Libreria", caption: "Libreria" },
      { id: 6, src: photos.day4.lib3, alt: "Libreria", caption: "Libreria" }
    ],
    [
      { id: 7, src: photos.day4.mercado, alt: "Mercado", caption: "Mercado" }
    ],
    [
      { id: 8, src: photos.day4.pargot1, alt: "Pargot", caption: "Pargot" },
      { id: 9, src: photos.day4.pargot2, alt: "Pargot", caption: "Pargot" },
      { id: 10, src: photos.day4.pargot3, alt: "Pargot", caption: "Pargot" }
    ],
    [
      { id: 11, src: photos.day4.plazalc, alt: "Plaza Lazaro Cardenas", caption: "Plaza Lazaro Cardenas" }
    ],
    [
      { id: 12, src: photos.day4.tokyoBar, alt: "Tokyo Bar", caption: "Tokyo Bar" },
    ],
    [
      { id: 13, src: photos.day4.dept2, alt: "Departamento", caption: "Departamento" }
    ]
  ]

  const day5PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: photos.day5.dripCoffee, alt: "Drip Coffee", caption: "Drip Coffee" },
      { id: 2, src: photos.day5.yellowMonkey, alt: "Yellow Monkey", caption: "Yellow Monkey" },
    ],
    [
      { id: 3, src: photos.day5.book, alt: "Book", caption: "Book" }
    ]
  ]

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AudioWidget />
        <section className={styles.sectionSmaller}>
          <FieldNoteCard location="CDMX" dates={["04/02/2025", "04/06/2025"]} />
        </section>
        <Entries 
          tripData={validatedTripData}
          day1PhotoRows={day1PhotoRows} 
          day2PhotoRows={day2PhotoRows} 
          day3PhotoRows={day3PhotoRows} 
          day4PhotoRows={day4PhotoRows} 
          day5PhotoRows={day5PhotoRows} 
        />
      </main>
    </div>
  );
}
