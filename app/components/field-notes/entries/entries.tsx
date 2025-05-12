"use client";

import styles from "./entries.module.css";
import { useState } from "react";
import PhotoGridDisplay from "../photo-grid/photo-grid";
import { PhotoDetail } from "../photo-grid/photo-grid";


export default function Entries( {day1PhotoRows, day2PhotoRowsCorrected, day3PhotoRows, day4PhotoRows}: {day1PhotoRows: PhotoDetail[][], day2PhotoRowsCorrected: PhotoDetail[][], day3PhotoRows: PhotoDetail[][], day4PhotoRows: PhotoDetail[][]}) {
    const [activePhotoRow1, setActivePhotoRow1] = useState<number | null>(null);
    const [activePhotoRow2, setActivePhotoRow2] = useState<number | null>(null);
    const [activePhotoRow3, setActivePhotoRow3] = useState<number | null>(null);
    const [activePhotoRow4, setActivePhotoRow4] = useState<number | null>(null);



    return (
        <>
            <section className={styles.section}>
                <div className={styles.paragraph}> 
                    <h2>
                        Day 1 <br/>
                    </h2>
                    <p>
                    Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.
                    <br/>
                    <br/>
                    Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow1(1)} onMouseLeave={() => setActivePhotoRow1(null)}>Balandra</span> in Roma Norte.
                    We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
                    The food is delicious. I wish I could order more. Not enough stomach real estate.
                    </p>

                    <p>
                    After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow1(2)} onMouseLeave={() => setActivePhotoRow1(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
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
                    <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow1(3)} onMouseLeave={() => setActivePhotoRow1(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
                    </p>
                </div>

                <PhotoGridDisplay photoRows={day1PhotoRows} activePhoto={activePhotoRow1} />
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
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow2(1)} onMouseLeave={() => setActivePhotoRow2(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow2(2)} onMouseLeave={() => setActivePhotoRow2(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
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
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow2(3)} onMouseLeave={() => setActivePhotoRow2(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day2PhotoRowsCorrected} activePhoto={activePhotoRow2} />
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
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow3(1)} onMouseLeave={() => setActivePhotoRow3(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow3(2)} onMouseLeave={() => setActivePhotoRow3(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
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
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow3(3)} onMouseLeave={() => setActivePhotoRow3(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day3PhotoRows} activePhoto={activePhotoRow3} />
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
              Haylee and I start off at <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow4(1)} onMouseLeave={() => setActivePhotoRow4(null)}>Balandra</span> in Roma Norte.
              We Order the Tiger milk ceviche, house ceviche with mango, and pineapple citrus juice (2 refills lol).
              The food is delicious. I wish I could order more. Not enough stomach real estate.
            </p>

            <p>
              After Balandra, we make our way to <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow4(2)} onMouseLeave={() => setActivePhotoRow4(null)}>Jazzatlán Capital</span> for a concert. We arrive a bit early, so we talk and people watch.
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
              <span className={styles.triggerWord} onMouseEnter={() => setActivePhotoRow4(3)} onMouseLeave={() => setActivePhotoRow4(null)}>Tlecan</span> is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar. ......
            </p>
          </div>

          <PhotoGridDisplay photoRows={day4PhotoRows} activePhoto={activePhotoRow4} />
        </section>
    </>
    );
}
