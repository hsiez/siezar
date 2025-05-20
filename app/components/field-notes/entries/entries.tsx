"use client";

import styles from "./entries.module.css";
import { useState } from "react";
import SubEntry from "./sub-entry";
import { PhotoDetail } from "../photo-grid/photo-grid";

export default function Entries({ day1PhotoRows, day2PhotoRows, day3PhotoRows, day4PhotoRows }: {
    day1PhotoRows: PhotoDetail[][],
    day2PhotoRows: PhotoDetail[][],
    day3PhotoRows: PhotoDetail[][],
    day4PhotoRows: PhotoDetail[][]
}) {
    const [activePhotoRow1, setActivePhotoRow1] = useState<number | null>(null);
    const [activePhotoRow2, setActivePhotoRow2] = useState<number | null>(null);
    const [activePhotoRow3, setActivePhotoRow3] = useState<number | null>(null);
    const [activePhotoRow4, setActivePhotoRow4] = useState<number | null>(null);

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 2, 2025 - Day 1</h2>
                <SubEntry
                    title="Arrival & Balandra"
                    content={
                        <div>
                            <p>Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.</p>
                            <p>Haylee and I start off at Balandra in Roma Norte. We Order the <em>Tiger milk ceviche</em>, <em>house ceviche with mango</em>, and <em>pineapple citrus juice</em> (2 refills lol).</p>
                            <p>The food is delicious. I wish I could order more. Not enough stomach real estate.</p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(0, 1)}
                    activePhoto={activePhotoRow1}
                    onPhotoHover={setActivePhotoRow1}
                />
                <SubEntry
                    title="Jazzatlán Capital"
                    content={
                        <div>
                            <p>After Balandra, we make our way to Jazzatlán Capital for a concert. We arrive a bit early, so we talk and people watch. The place is vibrantly alive.</p>
                            <p>The band starts. The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.</p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(1, 2)}
                    activePhoto={activePhotoRow1}
                    onPhotoHover={setActivePhotoRow1}
                />
                <SubEntry
                    title="Tlecan"
                    content={
                        <div>
                            <p>Tlecan is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar.</p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(2, 3)}
                    activePhoto={activePhotoRow1}
                    onPhotoHover={setActivePhotoRow1}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 3, 2025 - Day 2</h2>
                <SubEntry
                    title="Morning Coffee"
                    content={
                        <div>
                            <p>Lots on the agenda today. We start with caffeine at <em>Nice Day Coffee</em>. One Cortado, one latte, two pastries, and a little fiber; breakfast of travelers.</p>
                            <p>Digital nomads scatter the patio. Some families having breakfast. Chill vibe.</p>
                        </div>
                    }
                    photoRows={[day2PhotoRows[0]]}
                    activePhoto={activePhotoRow2}
                    onPhotoHover={setActivePhotoRow2}
                />
                <SubEntry
                    title="Bosque De Chapultepec"
                    content={
                        <div>
                            <p>We buy tickets online to skip box office line. The castle's architecture is beautiful. My favorite spot is the staircase with 3 murals and stained-glass windows. The stained glass hallway is a close 2nd.</p>
                            <p>Haylee and I stroll the upstairs garden. We run into a school field trip. The grounds keeper scolds a few kids messing around in the fountain.</p>
                            <p>In the restroom, I head to the sink. Two kids are scuffling over who gets to use the hand dryer. The third kid looks at me and hit me with the most comical smile and shrug. I'm so happy for them.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(1, 2)}
                    activePhoto={activePhotoRow2}
                    onPhotoHover={setActivePhotoRow2}
                />
                <SubEntry
                    title="Lunch at Lardo"
                    content={
                        <div>
                            <p>We leave in a hurry to make a reservation at <em>Lardo</em>. We wait still. Group after group tries their luck with the host for a walk in table. Some are too pushy.</p>
                            <p>The food was ...good. I feel no urge to go back.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(2, 3)}
                    activePhoto={activePhotoRow2}
                    onPhotoHover={setActivePhotoRow2}
                />
                <SubEntry
                    title="Evening Delights"
                    content={
                        <div>
                            <p>Churros are on the brain. It's a dessert before dinner kind of night. IMO, <em>EL Morro</em> is worth the hype. I'm left wanting more.</p>
                            <p>For dinner, we head to <em>La Casa de Toño</em>. The Pozole HITS and the Guisado Sopes are phenomenal. Takes like my mom made them.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(3, 4)}
                    activePhoto={activePhotoRow2}
                    onPhotoHover={setActivePhotoRow2}
                />
                <SubEntry
                    title="Night Out"
                    content={
                        <div>
                            <p>The night leads to <em>Departamento</em>. The rooftop bar is packed. We hang by the bar and enjoy some Mezcal cocktails. The DJ is absolutely cooking but no one is dancing.</p>
                            <p>It's a mixed crowd of local, expats and a large group of frat dudes. Once again the night ends with Tacos de Valle.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(4, 5)}
                    activePhoto={activePhotoRow2}
                    onPhotoHover={setActivePhotoRow2}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 4, 2025 - Day 3</h2>
                <SubEntry
                    title="Coffee and Morning Stroll"
                    content={
                        <div>
                            <p>Almanegra is today's cortado provider. The staff is super friendy; we chat for a while about the cafe passport booklets. <br /><br /><em>I can't stamp your real passport lol.</em><br /><br />The coffee is memorable.<br /> <br /> </p>
                            <p>We start our walk to the shoppes in Roma Norte. The path lead us to <em>Plaza De Janerio</em>. Some are just passing thru, others claim a bench. The real vibe setters are the dogs cooling off in the fountain. We stop and watch them play for a while.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(0, 1)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />
                <SubEntry
                    title="Shopping in Roma Norte"
                    content={
                        <div>
                            <p>Casa Denim is the main target. I spend less time there than expected. The staff is welcoming and the selection is good. I'm just too hot to try anything on lol. Uber there next time.</p>
                            <p>We check out all the other boutigues but buy nothing.</p>
                            <p>Xinú is the last stop on the street. God, I love the design of this place. The entrance is a small portal to an oasis of greanery that wraps a treehouse that is the store. The design is so good I buy something.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(1, 2)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />
                <SubEntry
                    title="Lunch at Café Nin"
                    content={
                        <div>
                            <p>This place is mostly ambiance. It's a pass.</p>
                        </div>
                    }
                    photoRows={[]}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />

                <SubEntry
                    title="Museo Nacional de Antropología"
                    content={
                        <div>
                            <p>This is our second time here. First attempt was blocked due to a private event. Check the calendar next time.<br /><br /></p>
                            <p>The courtyard is awesome. Better than photos.<br /><br /></p>
                            <p>Walking through all of the exhibits is a bit much. The sun stone room is packed. A line forms to get a photo in front of it. Just seeing it is enough for me.</p>
                            <p> My favorite section is the Oxacan ancient art exhibit.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(2, 3)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />

                <SubEntry
                    title="Dinner at Gaba"
                    content={
                        <div>
                            <p></p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(3, 4)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />

                <SubEntry
                    title="Lucha Libre"
                    content={
                        <div>
                            <p>Getting in requires effort. The box office is blocked by a front of scalpers trying to sell box tickets. They are agressive. Regular tickets are about $5. What a steal. <br /><br /></p>
                            <p>The crowd is rowdy in the best way. Involved with the show. Hecklers are going in on the wrestlers. Booing at any sign of weakness.</p>
                            <p>Beer is flowing, bags of chips being tossed, no english is spoken. I don't feel like a tourist here. LFG <br /><br /></p>
                            <p>After the event, we explore the swampmeet outside. Tons of wrestling merch for sale. I refrain from buying an Eddy Guerrero action figure. I regret it later.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(4, 5)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />
            </section>

            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>April 5, 2025 - Day 4</h1>
                <SubEntry
                    title="Arrival & Balandra"
                    content={
                        <div>
                            <p>Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.</p>
                            <p>Haylee and I start off at Balandra in Roma Norte. We Order the <em>Tiger milk ceviche</em>, <em>house ceviche with mango</em>, and <em>pineapple citrus juice</em> (2 refills lol).</p>
                            <p>The food is delicious. I wish I could order more. Not enough stomach real estate.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(0, 1)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />
                <SubEntry
                    title="Jazzatlán Capital"
                    content={
                        <div>
                            <p>After Balandra, we make our way to Jazzatlán Capital for a concert. We arrive a bit early, so we talk and people watch. The place is vibrantly alive.</p>
                            <p>The band starts. The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(1, 2)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />
                <SubEntry
                    title="Tlecan"
                    content={
                        <div>
                            <p>Tlecan is easy to miss. The entrance is an unassuming door with a tiny sign. No vacancy at the L-shaped bar.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(2, 3)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />
            </section>
        </div>
    );
}
