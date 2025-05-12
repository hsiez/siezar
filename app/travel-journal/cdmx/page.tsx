import styles from "./page.module.css";
import FieldNoteCard from "@/app/components/field-notes/field-note-card";
import ceviche from "../../../public/cdmx/ceviche.jpeg";
import jazzClub from "../../../public/cdmx/jazz-club.jpeg";
import tlecan from "../../../public/cdmx/tlecan.jpeg";
import valle from "../../../public/cdmx/valle.jpeg";
import niceCoffee from "../../../public/cdmx/nice-day-coffee.jpeg";
import castle2 from "../../../public/cdmx/castle-2.jpeg";
import lardo from "../../../public/cdmx/lardo.jpeg";
import churro from "../../../public/cdmx/churro.jpeg";
import tono from "../../../public/cdmx/tono.jpeg";
import almanegra from "../../../public/cdmx/almanegra.jpeg";
import plaza from "../../../public/cdmx/plaza-rio-de-janeiro.jpeg";
import xinu from "../../../public/cdmx/xinú.jpeg";
import mue from "../../../public/cdmx/mue.jpeg";
import gaba from "../../../public/cdmx/gaba.jpeg";
import lucha from "../../../public/cdmx/lucha.jpeg";
import { PhotoDetail } from "../../components/field-notes/photo-grid/photo-grid";
import AudioWidget from "../../components/field-notes/audio-widget/audio-widget";
import { Metadata } from 'next';
import Entries from "../../components/field-notes/entries/entries";


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
    images: ["/cdmx/open-graph.png"], // Replace with your Twitter image path
  },
};

export default function CDMX() {

  const day1PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: ceviche, alt: "Ceviche at Balandra", caption: "Balandra", imageClassName: styles.portrait },
      { id: 2, src: jazzClub, alt: "Jazzatlán Capital", caption: "Jazzatlán" }
    ],
    [
      { id: 3, src: tlecan, alt: "Tlecan Bar", caption: "Tlecan", objectFit: "contain" as const },
      { id: 4, src: valle, alt: "Tacos de Valle", caption: "Tacos de Valle" }
    ]
  ];

  const day2PhotoRowsCorrected: PhotoDetail[][] = [
    [
      { id: 1, src: niceCoffee, alt: "Nice Day Coffee", caption: "Nice Day" },
      { id: 2, src: castle2, alt: "Chapultepec Castle view", caption: "Castle" },
      { id: 3, src: lardo, alt: "Lardo Restaurant", caption: "Lardo", objectFit: "contain" as const }
    ],
    [
      { id: 4, src: churro, alt: "El Moro Churros", caption: "El Moro" },
      { id: 2, src: tono, alt: "Toño's Restaurant", caption: "Toño's" }
    ]
  ];

  const day3PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: almanegra, alt: "Almanegra Coffee", caption: "Almanegra" },
      { id: 2, src: plaza, alt: "Plaza Rio de Janeiro", caption: "Plz Janeiro" },
      { id: 2, src: xinu, alt: "Xinú Perfumes", caption: "Xinú" }
    ],
    [
      { id: 3, src: mue, alt: "Muebles Gابه", caption: "Mue", objectFit: "contain" as const },
      { id: 4, src: gaba, alt: "Gaba Restaurant", caption: "Gaba" },
      { id: 2, src: lucha, alt: "Lucha Libre", caption: "Lucha" }
    ]
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AudioWidget />
        <section className={styles.sectionSmaller}>
          <FieldNoteCard location="CDMX" dates={["04/02/2025", "04/06/2025"]} />
        </section>
        <Entries day1PhotoRows={day1PhotoRows} day2PhotoRowsCorrected={day2PhotoRowsCorrected} day3PhotoRows={day3PhotoRows} day4PhotoRows={day1PhotoRows} />
      </main>
    </div>
  );
}
