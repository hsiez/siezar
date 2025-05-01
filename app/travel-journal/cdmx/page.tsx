"use client";
import styles from "./page.module.css";
import FieldNoteCard from "@/app/components/field-notes/field-note-card";
import Image from "next/image";
import { useState } from "react";
import Waveform from "@/app/components/waveform/waveform";
export default function CDMX() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.section}>
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
              "Let's get out of here?"
              <br/>
              Tlecan?
            </p>

            <p>
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhoto(3)} onMouseLeave={() => setActivePhoto(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          {/* Photo sleeve 
          <div className={styles.sleeveContainer}>
            <div className={styles.sleeve}>
              <div className={styles.pictureStack}>
                <img src="/marlin.jpg" alt="Photo 1" className={styles.pictureItem} />
                <img src="/marlin.jpg" alt="Photo 2" className={styles.pictureItem} />
                <img src="/marlin.jpg" alt="Photo 3" className={styles.pictureItem} />
              </div>d
              <span className={styles.flapShadow}>
                <div className={styles.flap} />
              </span>
            </div>
          </div>
          */}

          {/* Photo Grid */}
          <div className={styles.photosContainer}>
            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 1 ? styles.triggeredPhoto : ""}`}>
                <Image src="/cdmx/ceviche.jpeg" alt="Photo 1" width={1066} height={800} className={styles.photo}/>
                <span className={styles.photoCaption}>Balandra</span>
              </div>
              <div className={`${styles.photoItem} ${activePhoto === 2 ? styles.triggeredPhoto : ""}`}>
                <Image src="/cdmx/jazz-club.jpeg" alt="Photo 2" width={1066} height={800} className={styles.photo}/>
                <span className={styles.photoCaption}>Jazzatlán</span>
              </div>
            </div>

            <div className={styles.photoRow}>
              <div className={`${styles.photoItem} ${activePhoto === 3 ? styles.triggeredPhoto : ""}`}>
                <Image src="/cdmx/tlecan.jpeg" alt="Photo 3" className={styles.photo} width={1066} height={800} />
                <span className={styles.photoCaption}>Tlecan</span>
              </div>
              <div className={styles.photoItem}>
                <Image src="/cdmx/valle.jpeg" alt="Photo 4" className={styles.photo} width={1066} height={800} />
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
              <Waveform audioUrl="/cdmx/test.mp4" />
            </div>
        </section>
      </main>
    </div>
  );
}
