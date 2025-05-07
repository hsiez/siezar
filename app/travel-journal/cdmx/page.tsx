"use client";
import styles from "./page.module.css";
import FieldNoteCard from "@/app/components/field-notes/field-note-card";
import Image from "next/image";
import { useState } from "react";
import Waveform from "@/app/components/waveform/waveform";
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
import PhotoGridDisplay, { PhotoDetail } from "../../components/field-notes/photo-grid";


export default function CDMX() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

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
        <section className={styles.section + " " + styles.fieldNoteSection}>
          <FieldNoteCard location="CDMX" dates={["04/02/2025", "04/06/2025"]} />
        </section>
        <section className={styles.section}>
          <div className={styles.paragraph}> 
            <h2>
              Day 1 <br/>
            </h2>
            <p>
              Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.
              <br/>
              <br/>
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(1)} onMouseLeave={() => setActivePhoto(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(2)} onMouseLeave={() => setActivePhoto(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
              The place is vibrantly alive.
              <br/>
              <br/>

              The band starts.
              <br/>
              The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.
              <br/>
              <br/>
              <br/>
              Tlecan?
            </p>

            <p>
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(3)} onMouseLeave={() => setActivePhoto(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day1PhotoRows} activePhoto={activePhoto} />
        </section>

        <section className={styles.section}>
          <div className={styles.paragraph}> 
            <h2>
              Day 2 <br/>
            </h2>
            <p>
              Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.
              <br/>
              <br/>
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(1)} onMouseLeave={() => setActivePhoto(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(2)} onMouseLeave={() => setActivePhoto(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
              The place is vibrantly alive.
              <br/>
              <br/>

              The band starts.
              <br/>
              The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.
              <br/>
              <br/>
              <br/>
              Tlecan?
            </p>

            <p>
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(3)} onMouseLeave={() => setActivePhoto(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day2PhotoRowsCorrected} activePhoto={activePhoto} />
        </section>

        <section className={styles.section}>
          <div className={styles.paragraph}> 
            <h2>
              Day 3 <br/>
            </h2>
            <p>
              Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.
              <br/>
              <br/>
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(1)} onMouseLeave={() => setActivePhoto(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(2)} onMouseLeave={() => setActivePhoto(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
              The place is vibrantly alive.
              <br/>
              <br/>

              The band starts.
              <br/>
              The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.
              <br/>
              <br/>
              <br/>
              Tlecan?
            </p>

            <p>
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(3)} onMouseLeave={() => setActivePhoto(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day3PhotoRows} activePhoto={activePhoto} />
        </section>

        <section className={styles.section}>
          <div className={styles.paragraph}> 
            <h2>
              Day 1 <br/>
            </h2>
            <p>
              Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.
              <br/>
              <br/>
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(1)} onMouseLeave={() => setActivePhoto(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(2)} onMouseLeave={() => setActivePhoto(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
              The place is vibrantly alive.
              <br/>
              <br/>

              The band starts.
              <br/>
              The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.
              <br/>
              <br/>
              <br/>
              Tlecan?
            </p>

            <p>
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(3)} onMouseLeave={() => setActivePhoto(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day1PhotoRows} activePhoto={activePhoto} />
        </section>

        <section className={styles.smallSection}>
            <div className={styles.waveformContainer}>
              <h1 className={styles.title}>
                      Sounds Collected in the Field
              </h1>
              <Waveform/>
            </div>
        </section>
      </main>
    </div>
  );
}
