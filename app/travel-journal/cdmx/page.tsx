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


export default function CDMX() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

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

          {/* Photo Grid */}
          <div className={styles.photosContainer}>
            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 1 ? styles.triggeredPhoto : ""}`}>
                <Image src={ceviche} alt="Photo 1"  className={styles.photo + " " + styles.portrait}/>
                <span className={styles.photoCaption}>Balandra</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={jazzClub} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Jazzatlán</span>
              </div>
            </div>

            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 3 ? styles.triggeredPhoto : ""}`}>
                <Image src={tlecan} alt="Photo 3" className={styles.photo} objectFit="contain"/>
                <span className={styles.photoCaption}>Tlecan</span>
              </div>
              <div className={styles.photoItem}>
                <Image src={valle} alt="Photo 4" className={styles.photo}/>
                <span className={styles.photoCaption}>Tacos de Valle</span>
              </div>
            </div>
          </div>
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

          {/* Photo Grid */}
          <div className={styles.photosContainer}>
            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 1 ? styles.triggeredPhoto : ""}`}>
                <Image src={niceCoffee} alt="Photo 1"  className={styles.photo}/>
                <span className={styles.photoCaption}>Nice Day</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={castle2} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Castle</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 3 ? styles.triggeredPhoto : ""}`}>
                <Image src={lardo} alt="Photo 3" className={styles.photo} objectFit="contain"/>
                <span className={styles.photoCaption}>Lardo</span>
              </div>
            </div>

            <div className={styles.photoRow}>
              <div className={styles.photoItem}>
                <Image src={churro} alt="Photo 4" className={styles.photo}/>
                <span className={styles.photoCaption}>El Moro</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={tono} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Toño&apos;s</span>
              </div>
            </div>
          </div>
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

          {/* Photo Grid */}
          <div className={styles.photosContainer}>
            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 1 ? styles.triggeredPhoto : ""}`}>
                <Image src={almanegra} alt="Photo 1"  className={styles.photo}/>
                <span className={styles.photoCaption}>Almanegra</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={plaza} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Plz Janeiro</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={xinu} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Xinú</span>
              </div>
            </div>

            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 3 ? styles.triggeredPhoto : ""}`}>
                <Image src={mue} alt="Photo 3" className={styles.photo} objectFit="contain"/>
                <span className={styles.photoCaption}>Mue</span>
              </div>
              <div className={styles.photoItem}>
                <Image src={gaba} alt="Photo 4" className={styles.photo}/>
                <span className={styles.photoCaption}>Gaba</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={lucha} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Lucha</span>
              </div>
            </div>
          </div>
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

          {/* Photo Grid */}
          <div className={styles.photosContainer}>
            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 1 ? styles.triggeredPhoto : ""}`}>
                <Image src={ceviche} alt="Photo 1"  className={styles.photo + " " + styles.portrait}/>
                <span className={styles.photoCaption}>Balandra</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src={jazzClub} alt="Photo 2" className={styles.photo}/>
                <span className={styles.photoCaption}>Jazzatlán</span>
              </div>
            </div>

            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 3 ? styles.triggeredPhoto : ""}`}>
                <Image src={tlecan} alt="Photo 3" className={styles.photo} objectFit="contain"/>
                <span className={styles.photoCaption}>Tlecan</span>
              </div>
              <div className={styles.photoItem}>
                <Image src={valle} alt="Photo 4" className={styles.photo}/>
                <span className={styles.photoCaption}>Tacos de Valle</span>
              </div>
            </div>
          </div>
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
