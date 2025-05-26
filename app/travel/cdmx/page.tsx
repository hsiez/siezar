import styles from "./page.module.css";
import FieldNoteCard from "@/app/components/field-notes/field-note-card";
import ceviche from "../../../public/cdmx/ceviche.jpeg";
import bigBite from "../../../public/cdmx/haylee-bigbite.jpeg";
import panaderiaRosetta from "../../../public/cdmx/panaderiarosetta.jpeg";
import jazzClub from "../../../public/cdmx/jazz-club.jpeg";
import tlecan from "../../../public/cdmx/tlecan.jpeg";
import valle2 from "../../../public/cdmx/valle2.jpeg";
import valleOutside from "../../../public/cdmx/valle-outside.jpeg";
import valleSelfie from "../../../public/cdmx/valle-selfie.jpeg";
import niceCoffee from "../../../public/cdmx/nice-day-coffee.jpeg";
import castle2 from "../../../public/cdmx/castle-2.jpeg";
import garden from "../../../public/cdmx/castle-garden.jpeg";
import hallway from "../../../public/cdmx/stained-glass-hallway.jpeg";
import lardo from "../../../public/cdmx/lardo.jpeg";
import lardo2 from "../../../public/cdmx/lardo2.jpeg";
import churro from "../../../public/cdmx/churro.jpeg";
import tono from "../../../public/cdmx/tono.jpeg";
import almanegra from "../../../public/cdmx/almanegra.jpeg";
import plaza from "../../../public/cdmx/plaza-rio-de-janeiro.jpeg";
import xinu from "../../../public/cdmx/xinú.jpeg";
import xinu2 from "../../../public/cdmx/xinu2.jpeg";
import mue from "../../../public/cdmx/mue.jpeg";
import mue1 from "../../../public/cdmx/museum1.jpeg";
import mue2 from "../../../public/cdmx/museum2.jpeg";
import gaba from "../../../public/cdmx/gaba.jpeg";
import gabaFish from "../../../public/cdmx/fish.jpeg";
import gabaLengua from "../../../public/cdmx/lengua.jpeg";
import lucha from "../../../public/cdmx/lucha.jpeg";
import dep from "../../../public/cdmx/dep.jpeg";
import cortado from "../../../public/cdmx/cortado.jpeg";
import eseCafe1 from "../../../public/cdmx/ese-cafe1.jpeg";
import eseCafe2 from "../../../public/cdmx/ese-cafe2.jpeg";
import xuxu from "../../../public/cdmx/xuxu.jpeg";
import lib1 from "../../../public/cdmx/lib1.jpeg";
import lib2 from "../../../public/cdmx/lib2.jpeg";
import lib3 from "../../../public/cdmx/lib3.jpeg";
import mercado from "../../../public/cdmx/mercado.jpeg";
import pargot1 from "../../../public/cdmx/pargot1.jpeg";
import pargot2 from "../../../public/cdmx/pargot2.jpeg";
import pargot3 from "../../../public/cdmx/pargot3.jpeg";
import plazalc from "../../../public/cdmx/plazalc.jpeg";
import tokyoBar from "../../../public/cdmx/tokyobar.jpeg";
import dept2 from "../../../public/cdmx/dept2.jpeg";
import dripCoffee from "../../../public/cdmx/dripcafe.jpeg";
import yellowMonkey from "../../../public/cdmx/yellowmonkey.jpeg";
import book from "../../../public/cdmx/book.jpeg";
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
      { id: 2, src: bigBite, alt: "Big Bite", caption: "Big Bite" }
    ],
    [
      { id: 4, src: panaderiaRosetta, alt: "Panaderia Rosetta", caption: "Rosetta" }
    ],
    [
      { id: 3, src: jazzClub, alt: "Jazzatlán Capital", caption: "Jazzatlán" }
    ],
    
    [
      { id: 4, src: tlecan, alt: "Tlecan Bar", caption: "Tlecan" },
    ],
    [
      { id: 5, src: valleOutside, alt: "Tacos de Valle", caption: "Tacos de Valle" },
      { id: 6, src: valleSelfie, alt: "Tacos de Valle", caption: "selfie" }
    ]
  ];

  const day2PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: niceCoffee, alt: "Nice Day Coffee", caption: "Nice Day" },
    ],
    [
      { id: 2, src: castle2, alt: "Chapultepec Castle view", caption: "Castle" },
      { id: 3, src: hallway, alt: "Stain glass hallway", caption: "Hallway" },
      { id: 4, src: garden, alt: "Castle garden", caption: "Garden" }
    ],
    [
      { id: 5, src: lardo, alt: "Lardo Restaurant", caption: "Lardo" },
      { id: 6, src: lardo2, alt: "Lardo Restaurant", caption: "Lardo" }
    ],
    [
      { id: 4, src: churro, alt: "El Moro Churros", caption: "El Moro" },
      { id: 5, src: tono, alt: "Toño's Restaurant", caption: "Toño's" }
    ],
    [
      { id: 6, src: dep, alt: "Departamento", caption: "Departamento" },
      { id: 7, src: valle2, alt: "Tacos de Valle", caption: "Valle" }
    ]
  ];

  const day3PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: almanegra, alt: "Almanegra Coffee", caption: "Almanegra" },
      { id: 2, src: cortado, alt: "Cortado", caption: "Cortado" },
      { id: 3, src: plaza, alt: "Plaza Rio de Janeiro", caption: "Plz Janeiro" },
    ],
    [
      { id: 4, src: xinu2, alt: "Xinú Entrance", caption: "Xinú" },
      { id: 5, src: xinu, alt: "Xinú Store", caption: "Xinú" }
    ],
    [
      { id: 6, src: mue, alt: "Museo Nacional de Antropología", caption: "sun stone"},
      { id: 7, src: mue1, alt: "Museo Nacional de Antropología", caption: "courtyard" },
      { id: 8, src: mue2, alt: "Museo Nacional de Antropología", caption: "courtyard 2" }
    ],
    [
      { id: 4, src: gaba, alt: "Gaba Salad", caption: "Tomato Salad" },
      { id: 5, src: gabaFish, alt: "Gaba Fish", caption: "Catch of Day" },
      { id: 6, src: gabaLengua, alt: "Gaba Lengua", caption: "Carpaccio" },
    ],
    [
      { id: 7, src: lucha, alt: "Lucha Libre", caption: "Lucha" }
    ]
  ];

  const day4PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: eseCafe1, alt: "Ese Cafe", caption: "Ese Cafe" },
      { id: 2, src: eseCafe2, alt: "Ese Cafe", caption: "Ese Cafe" }
    ],
    [
      { id: 3, src: xuxu, alt: "Xuxu", caption: "Xuxu" },
    ],
    [
      { id: 4, src: lib1, alt: "Libreria", caption: "Libreria" },
      { id: 5, src: lib2, alt: "Libreria", caption: "Libreria" },
      { id: 6, src: lib3, alt: "Libreria", caption: "Libreria" }
    ],
    [
      { id: 7, src: mercado, alt: "Mercado", caption: "Mercado" }
    ],
    [
      { id: 8, src: pargot1, alt: "Pargot", caption: "Pargot" },
      { id: 9, src: pargot2, alt: "Pargot", caption: "Pargot" },
      { id: 10, src: pargot3, alt: "Pargot", caption: "Pargot" }
    ],
    [
      { id: 11, src: plazalc, alt: "Plaza Lazaro Cardenas", caption: "Plaza Lazaro Cardenas" }
    ],
    [
      { id: 12, src: tokyoBar, alt: "Tokyo Bar", caption: "Tokyo Bar" },
    ],
    [
      { id: 13, src: dept2, alt: "Departamento", caption: "Departamento" }
    ]
  ]

  const day5PhotoRows: PhotoDetail[][] = [
    [
      { id: 1, src: dripCoffee, alt: "Drip Coffee", caption: "Drip Coffee" },
      { id: 2, src: yellowMonkey, alt: "Yellow Monkey", caption: "Yellow Monkey" },
    ],
    [
      { id: 3, src: book, alt: "Book", caption: "Book" }
    ]
  ]

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AudioWidget />
        <section className={styles.sectionSmaller}>
          <FieldNoteCard location="CDMX" dates={["04/02/2025", "04/06/2025"]} />
        </section>
        <Entries day1PhotoRows={day1PhotoRows} day2PhotoRows={day2PhotoRows} day3PhotoRows={day3PhotoRows} day4PhotoRows={day4PhotoRows} day5PhotoRows={day5PhotoRows} />
      </main>
    </div>
  );
}
