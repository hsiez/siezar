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
                            <p>We buy tickets online to skip box office line. The castle&apos;s architecture is beautiful. My favorite spot is the staircase with 3 murals and stained-glass windows. The stained glass hallway is a close 2nd.</p>
                            <p>Haylee and I stroll the upstairs garden. We run into a school field trip. The grounds keeper scolds a few kids messing around in the fountain.</p>
                            <p>In the restroom, I head to the sink. Two kids are scuffling over who gets to use the hand dryer. The third kid looks at me and hit me with the most comical smile and shrug. I&apos;m so happy for them.</p>
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
                            <p>Churros are on the brain. It&apos;s a dessert before dinner kind of night. IMO, <em>EL Morro</em> is worth the hype. I&apos;m left wanting more.</p>
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
                            <p>It&apos;s a mixed crowd of local, expats and a large group of frat dudes. Once again the night ends with Tacos de Valle.</p>
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
                            <p>Almanegra is today&apos;s cortado provider. The staff is super friendy; we chat for a while about the cafe passport booklets. <br /><br /><em>I can&apos;t stamp your real passport lol.</em><br /><br />The coffee is memorable.<br /> <br /> </p>
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
                            <p>Casa Denim is the main target. I spend less time there than expected. The staff is welcoming and the selection is good. I&apos;m just too hot to try anything on lol. Uber there next time.</p>
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
                            <p>This place is mostly ambiance. It&apos;s a pass.</p>
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
                            <p>Beer is flowing, bags of chips being tossed, no english is spoken. I don&apos;t feel like a tourist here. LFG <br /><br /></p>
                            <p>After the event, we explore the swampmeet outside. Tons of wrestling merch for sale. I refrain from buying an Eddy Guerrero action figure. I regret it later.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(4, 5)}
                    activePhoto={activePhotoRow3}
                    onPhotoHover={setActivePhotoRow3}
                />

                <SubEntry
                  title="Street Tacos"
                  content={
                      <div>
                          <p> Ten minutes from the arena is a taco stand called Tacos El Paisa. The walk isn&apos;t sketchy but I&apos;m aware of my surroundings. <br /><br /></p>
                          <p>Ton&apos;s of green flags: no tourists, no vacancy at the L-shaped bar, the crowd is older, cash only.
                              It&apos;s a pick-an-organ type of joint. All of the meat options are stewing together in a wide metal pot.</p>
                          <p>Two guys running the show, bartender style. They take your order, make your plate, and cash you out. Hands going from knife, meat, cash, towel, back to food.<br /><br /></p>
                          <p>We accept the risk <br /><br /></p>
                          <p><em>&quot;cuatro tacos de luenga con todo&quot;</em> <br /><br /></p>
                          <p>I hand him the cash and ask for no change. He points at me and smiles. We go our separate ways. <br /><br /></p>
                          <p>The tacos keep it simple. Meat, onion, cilantro, salsa. They let the meat do the talking. The luenga itself is juicey, tender, and packed with flavor. <br /><br /></p>
                          <p>These are the cheapest and best tacos I&apos;ve ever had. I would have paid double.<br /><br /></p>
                      </div>
                  }
                  photoRows={[]}
                  activePhoto={null}
                  onPhotoHover={() => {}}
                />      
            </section>

            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>April 5, 2025 - Day 4</h1>
                <SubEntry
                    title="Ese Café"
                    content={
                        <div>
                            <p>Ese Café is a small coffee shop inside a bike shop/club. They are playing one of my favorite albums, &quot;Hiding in Plain Sight&quot;; They are priming me. <br /><br /></p>
                            <p>The shop owner and I chat about music and beans while the lattes are being made. He invites me to try the house roast. We both bite into a coffee bean. 
                              Of couse the texture is bad but the flavor is proven. I buy a bag. <br /><br /></p>
                            <p>We sit at the concret slab bar that exposed to the outside. We get to enjoy the breeze and people watch.<br /><br /></p>
                            <p>The coffee is perfect. Our favorite of the trip.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(0, 1)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />
                <SubEntry
                    title="Brunch at Xuxu"
                    content={
                        <div>
                          <p>Solid place. No wait. The huevos rancheros with braised pork was good. Happy with this last minute choice.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(1, 2)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Biblioteca Vasconcelos"
                    content={
                        <div>
                          <p>Pictures don&apos;t do it justice. It is such a creative space. An engineering feat.</p>
                          <p>Haylee and I spend a looooong time here. Going through all the floors and aisles. Window shopping books and art.</p>
                          <p>All perfect place to kill time and get lost. <br /><br /></p>
                          <p>A swampmeet wraps the outside of the building. We walk a bit to find a clear spot to be picked up.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(2, 3)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Mercado San Juan"
                    content={
                        <div>
                          <p>I believe there are better markets in the city. This one is just convenient for our location and schedule. <br /><br /></p>
                          <p>We don&apos;t eat here but buy some honey and bug salt. The produce is picture perfect. We should gone here at the end of the day to pick up some groceries. <br /><br /></p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(3, 4)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Dinner at Pargot"
                    content={
                        <div>
                          <p>Our finial Michilan Guide spot.<br /><br /></p>
                          <p>This place is ...unique<br /><br /></p>
                          <p>It feels like the visual presentation is the main attraction. This puts me off a bit. I feel pretentious eating here.<br /><br /></p>
                          <p>There is nothing wrong with the food. It is good. It doesn&apos;t leave us wanting more.<br /><br /></p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(4, 5)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Enjoying the Sunset"
                    content={
                        <div>
                            <p>Time to walk off the food. We wonder north to Plaza Luis Cabrera.<br /><br /></p>
                            <p>
                                Haylee and I claim on of the benches orbiting the main water fountain. So many cute pups. A large rotweiler is playing fetch near us. We pray for the ball to come our way.
                                A woman lets her dog off leash. It immediatly jumps into the fountain. She spend the next 10 minutes negotiating the dogs exit. 
                            </p>
                            <p>
                                The sun is setting. Blue, orange, and pink hues overhead. Perfect start to the night.
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(5, 6)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Start of the Night"
                    content={
                        <div>
                            <p>
                                The night before, we secured a reservation at Tokyo Music Bar. It&apos;s around the corner from our airbnb.
                                It&apos;s pretty early so the place is sparsely populated. The bar is almost full, but only one table is occupied.
                            </p>
                            <p>
                                We are seated at a table near a couple who is aboslutely going at it. Full on make out session. No lack of passion. <br /><br />
                                The drinks are tasty but pricey. The music selection is a mixed bag. We leave after 1 round of drinks. Not missing much. <br /><br />
                            </p>
                            <p>
                                Onto the next spot. <br /><br />
                            </p>
                            <p>
                                We try to catch a house show at Fünk. The line wrappes the block and it is not moving. After closer inspection, we notice the crowd looks REALLY young. It&apos;s a bust. <br /><br />
                            </p>
                            <p>
                                &quot;<em>Departamento?</em>&quot; <br /><br />
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(6, 7)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />

                <SubEntry
                    title="Departamento Round 2"
                    content={
                        <div>
                            <p>
                                It&apos;s Saturday night so we pay a cover. We head to the 3rd floor rooftop but this time it&apos;s overcrowded. 
                                The second floor has it&apos;s own bar and dance floor. The crowd is more manageable so we stay.
                            </p>
                            <p>
                                We grab a drink and make our way into the crowd. After a couple songs, we are at the front. The DJ puts on an amazing set. Mostly funk and latin disco.
                                The set design of the DJ booth is pretty sick. It looks like a recoding studio with a pyramid sky light with dynamic lighting.
                            </p>
                            <p>
                               A group of douche guys are trying to get people&apos;s attention from the VIP section. They eventually get kicked out for getting to close to the DJ booth. They get laughed at.
                            </p>
                            <p>
                                We leave around 1am. Exhausted from dancing. We head home and call it a night.
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(7, 8)}
                    activePhoto={activePhotoRow4}
                    onPhotoHover={setActivePhotoRow4}
                />
            </section>
        </div>
    );
}
