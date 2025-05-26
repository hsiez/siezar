"use client";

import styles from "./entries.module.css";
import SubEntry from "./sub-entry";
import { PhotoDetail } from "../photo-grid/photo-grid";

export default function Entries({ day1PhotoRows, day2PhotoRows, day3PhotoRows, day4PhotoRows, day5PhotoRows }: {
    day1PhotoRows: PhotoDetail[][],
    day2PhotoRows: PhotoDetail[][],
    day3PhotoRows: PhotoDetail[][],
    day4PhotoRows: PhotoDetail[][],
    day5PhotoRows: PhotoDetail[][]
}) {
    
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 2, 2025 - Day 1</h2>
                <SubEntry
                    title="Arrival & Balandra"
                    content={
                        <div>
                            <p>Airport - Uber - Airbnb. I immediately feel like time is slipping away. So much to do, so much to see.</p>
                            <p>Haylee and I start off at Balandra in Roma Norte. We order the <em>Tiger milk ceviche</em>, <em>house ceviche with mango</em>, and <em>pineapple citrus juice</em> (2 refills lol).</p>
                            <p>On this hot day, the ceviche is a godsend. I wish I could order more. Not enough stomach real estate.</p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(0, 1)}
                />

                <SubEntry       
                    title="Panadería Rosetta"
                    content={
                        <div>
                            <p>It&apos;s pastry time. Panadería Rosetta is a 15 minute stroll from Balandra. <br /><br /></p>
                            <p>The place is busy. 30 minutes wait for a table. We get pastries to go. <br /><br /></p>
                            <p>They are out of the vanilla concha. Heartbreaking. <br /><br /></p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(1, 2)}
                />

                <SubEntry
                    title="Jazzatlán Capital"
                    content={
                        <div>
                            <p>We make our way to Jazzatlán Capital for a jazz show. We arrive a bit early, so we talk and people watch. <br />
                            The place is vibrantly alive. They guy at the table next to us has a loud infectious laugh. <br /><br /></p>
                            <p>The band starts. The drummer is totally in it. A smile breaks through at times. I am witnessing someone in their element. I feel lucky.</p>

                        </div>
                    }
                    photoRows={day1PhotoRows.slice(2, 3)}
                />
                <SubEntry
                    title="Tlecan"
                    content={
                        <div>
                            <p>Tlecan is easy to miss. The entrance is an unassuming door with a tiny sign.<br /><br /></p>
                            <p>The inside is small but decorated beautifully. The space is mostly a L-shaped bar with a thin bar running along the side wall. <br /><br /></p>
                            <p> No available seats. Staff walks us to the standing section. we order the Negroni Mezcal and the Pulque Colada. The Colada is the clear winner. They provide us with a seasoned mix of toasted seeds and bugs to pick at.<br /><br /></p>
                            <p>This a pretty great date spot. I&apos;d come back. <br /><br /></p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(3, 4)}
                />

                <SubEntry
                    title="Tacos de Valle"
                    content={
                        <div>
                            <p>Valle is a popular spot. The tacos are pricey compared to near by street vendors but the vibe is comfy and safe lol.</p>
                            <p>We wait in line for about 30 minutes. <br /><br /></p>

                            <p>We try a couple different tacos but the highlight is the Trompo de Carne Asada. They load up these bad boys with a ton of meat. The tacos are served bare. Each table has a selection of salsa and bowls of onions, cilantro, and limes. <br /><br /></p>

                            <p>As we eat, a rotation of street vendors solicit us to buy their wares.</p>
                        </div>
                    }
                    photoRows={day1PhotoRows.slice(4, 5)}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 3, 2025 - Day 2</h2>
                <SubEntry
                    title="Morning Coffee"
                    content={
                        <div>
                            <p>We start this busy day with <u>Nice Day Coffee</u>. One cortado, one latte, two pastries, and a little fiber; breakfast of travelers.<br /><br /></p>
                            <p>Digital nomads scatter the patio. Some families having breakfast. Chill vibe.<br /><br /></p>
                            <p>Quality coffee. We are put on the right path for the day.<br /><br /></p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(0, 1)}
                />
                <SubEntry
                    title="Bosque De Chapultepec"
                    content={
                        <div>
                            <p>There is a huge line for the box office. We buy tickets online and walk right in. An uphill walk takes us to the castle. <br /><br /></p>
                            <p>The castle&apos;s architecture is beautiful. My favorite spot is the staircase with three murals and stained-glass windows. The stained glass hallway is a close second. <br /><br /></p>
                            <p>Haylee and I make it up to the upstairs garden. We run into a school field trip. The groundskeeper scolds a few kids messing around in the fountain. <br /><br /></p>
                            <p>In the restroom, I head to the sink. Two kids are scuffling over who gets to use the hand dryer. The third kid looks at me and hit me with the most comical smile and shrug. I&apos;m so happy for them.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(1, 2)}
                />
                <SubEntry
                    title="Lunch at Lardo"
                    content={
                        <div>
                            <p>We leave the castle in a hurry to make a reservation at <u>Lardo</u>. We wait still. <br /><br /></p>
                            <p>Group after group tries their luck with the host for a walk-in table. Some are too pushy.<br /><br /></p>
                            <p>The food was ...good. The best part was the beet juice; it wasn't on the menu. I feel no urge to go back.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(2, 3)}
                />
                <SubEntry
                    title="Evening Delights"
                    content={
                        <div>
                            <p>Churros are on the brain. It&apos;s a dessert before dinner kind of night. <br /> <br /> </p>
                            <p><u>EL Morro</u> churros are worth the hype. Crispy on the outside, soft on the inside. I&apos;m left wanting more.<br /><br /></p>
                            <p>For dinner, we head to <em>La Casa de Toño</em>. The Pozole HITS and the Guisado Sopes are phenomenal. Tastes like my mom made them.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(3, 4)}
                />
                <SubEntry
                    title="Night Out"
                    content={
                        <div>
                            <p>The night leads to <em>Departamento</em>. <br /><br /> </p>
                            <p>The rooftop bar is reasonably occupied. It&apos;s a huge space with lounge areas, a dance floor, bar, and street food style booths. We hang by the bar and enjoy some Mezcal cocktails. <br /><br /></p> 
                            <p>The DJ is absolutely cooking but no one is dancing. <br /><br /></p>
                            <p>It&apos;s a mixed crowd of local, expats and a loud group of frat dudes. <br /><br /> </p>
                            <p>Once again the night ends with Tacos de Valle.</p>
                        </div>
                    }
                    photoRows={day2PhotoRows.slice(4, 5)}
                />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>April 4, 2025 - Day 3</h2>
                <SubEntry
                    title="Coffee and Morning Stroll"
                    content={
                        <div>
                            <p>Almanegra is today&apos;s cortado provider. The staff is super friendly; we chat for a while about the cafe passport booklets. <br /><br /><em>&quot;I can&apos;t stamp your real passport!&quot;</em><br /><br />The coffee is memorable.<br /> <br /> </p>
                            <p>We start our walk to the shoppes in Roma Norte. <br /><br /> </p>
                            <p>The path leads us through <em>Plaza De Janerio</em>. Lots of people passing through, lots of people lounging around.<br /> <br /> </p>
                            <p>There&apos;s a gang of cute off-leash dogs cooling off in the fountain. We stop and watch them play for a while.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(0, 1)}
                />
                <SubEntry
                    title="Shopping in Roma Norte"
                    content={
                        <div>
                            <p>Casa Denim is the main target. I spend less time there than expected. The staff is welcoming and the selection is good. I&apos;m just too hot to try anything on lol. Uber there next time. <br /><br /></p>
                            <p>We check out all the other boutiques but buy nothing. <br /><br /></p>
                            <p>Xinú is the last stop on the street. God, I love the design of this place. The entrance is a small portal into an oasis of greenery that wraps a treehouse that is the store. The design is so good I buy something.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(1, 2)}
                />
                <SubEntry
                    title="Lunch at Café Nin"
                    content={
                        <div>
                            <p>This place is mostly ambiance. It&apos;s a pass.</p>
                        </div>
                    }
                    photoRows={[]}
                />

                <SubEntry
                    title="Museo Nacional de Antropología"
                    content={
                        <div>
                            <p>This is our second time here. First attempt was blocked due to a private event. Check the calendar next time.<br /><br /></p>
                            <p>The courtyard is awesome. Better than photos.<br /><br /></p>
                            <p>The sun stone area is packed. A line forms to get a photo in front of it. Just seeing it is enough for me.<br /><br /></p>
                            <p>We explore all of the exhibits. It&apos;s a bit overstimulating. My favorite section is the Oaxacan ancient art exhibit. I collect tons of inspiration.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(2, 3)}
                />

                <SubEntry
                    title="Dinner at Gaba"
                    content={
                        <div>
                            <p>The space is a long rentangle with three sections. We are seated in the middle section. <br /><br /></p>
                            <p>The fatigue and dehydration from walking around all day is hitting hard.<br /><br /></p>
                            <p>The staff is quick to get us started. We take their recommendation and order a salad, appetizer, and main.<br /><br /></p>
                            <p>I&apos;m blown away by the tomato salad. Simple ingredients plated beautifully and jam packed with flavor. The creamy dressing is insane.<br /><br /></p>
                            <p>Beef tongue carpaccio is next. Thin slices of meat wrapped around crispy leafy greens ontop of a moley like sauce. A new experience for me. I like it.<br /><br /></p>
                            <p>The main is the catch of the day. White fish with a creamy sauce. Cooked to perfection. Cripy on the outside, tender and juicy on the inside.<br /><br /></p>
                            <p>We are brought back to life. I can&apos;t believe this place has open reservations. Highlight of the trip.<br /><br /></p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(3, 4)}
                />

                <SubEntry
                    title="Lucha Libre"
                    content={
                        <div>
                            <p>Getting in requires effort. The box office is blocked by a lines of scalpers trying to sell box seats. They&apos;re aggressive. Regular tickets are about $5. What a steal. <br /><br /></p>
                            <p>The crowd is rowdy in the best way: involved with the show. Hecklers are digging into the wrestlers. Booing at any sign of weakness. <br /><br /></p>
                            <p>Beer is flowing, bags of chips are being tossed, no English is spoken. I don&apos;t feel like a tourist here. LFG <br /><br /></p>
                            <p>After the event, we explore the swap meet outside. Tons of wrestling merch for sale. I refrain from buying an Eddy Guerrero action figure. I regret it later.</p>
                        </div>
                    }
                    photoRows={day3PhotoRows.slice(4, 5)}
                />

                <SubEntry
                  title="Street Tacos"
                  content={
                      <div>
                          <p> Ten minutes from the arena is a taco stand called Tacos El Paisa. The walk isn&apos;t sketchy but I&apos;m aware of my surroundings. <br /><br /></p>
                          <p>Tons of green flags: no tourists, no vacancy at the L-shaped bar, the crowd is older, cash only.
                              It&apos;s a pick-an-organ type of joint. All of the meat options are stewing together in a wide metal pot.</p>
                          <p>Two guys running the show, bartender style. They take your order, make your plate, and cash you out. Hands go from knife, meat, cash, towel, back to food.<br /><br /></p>
                          <p>We accept the risk <br /><br /></p>
                          <p><em>&quot;Cuatro tacos de lengua con todo&quot;</em> <br /><br /></p>
                          <p>I hand him the cash and ask for no change. He points at me and smiles. We go our separate ways. <br /><br /></p>
                          <p>The tacos keep it simple. Meat, onion, cilantro, salsa. They let the meat do the talking. The lengua itself is juicy, tender, and packed with flavor. <br /><br /></p>
                          <p>These are the cheapest and best tacos I&apos;ve ever had. I would have paid double.<br /><br /></p>
                      </div>
                  }
                  photoRows={[]}
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
                              Of course the texture is bad but the flavor is proven. I buy a bag. <br /><br /></p>
                            <p>We sit at the concrete slab bar that is exposed to the outside. We get to enjoy the breeze and people watch.<br /><br /></p>
                            <p>The coffee is perfect. Our favorite of the trip.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(0, 1)}
                />
                <SubEntry
                    title="Brunch at Xuxú"
                    content={
                        <div>
                          <p>Solid place. No wait. The huevos rancheros with braised pork was good. Happy with this last-minute choice.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(1, 2)}
                />

                <SubEntry
                    title="Biblioteca Vasconcelos"
                    content={
                        <div>
                          <p>Pictures don&apos;t do it justice. It is such a creative space. An engineering feat.</p>
                          <p>Haylee and I spend a looooong time here. Going through all the floors and aisles. Window shopping books and art.</p>
                          <p>A perfect place to kill time and get lost. <br /><br /></p>
                          <p>A swap meet wraps the outside of the building. We walk a bit to find a clear spot to be picked up.</p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(2, 3)}
                />

                <SubEntry
                    title="Mercado San Juan"
                    content={
                        <div>
                          <p>I believe there are better markets in the city. This one is just convenient for our location and schedule. <br /><br /></p>
                          <p>We don&apos;t eat here but buy some honey and bug salt. The produce is picture perfect. We should have gone here at the end of the day to pick up some groceries. <br /><br /></p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(3, 4)}
                />

                <SubEntry
                    title="Dinner at Pargot"
                    content={
                        <div>
                          <p>Our final dinner spot.<br /><br /></p>
                          <p>This place is ...unique<br /><br /></p>
                          <p>It feels like the visual presentation is the main attraction. This puts me off a bit. I feel pretentious eating here.<br /><br /></p>
                          <p>There is nothing wrong with the food. It is good. It doesn&apos;t leave us wanting more.<br /><br /></p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(4, 5)}
                />

                <SubEntry
                    title="Enjoying the Sunset"
                    content={
                        <div>
                            <p>Time to walk off the food. We wander north to Plaza Luis Cabrera.<br /><br /></p>
                            <p>
                                Haylee and I claim one of the benches orbiting the main water fountain. So many cute pups. A large Rottweiler is playing fetch near us. We pray for the ball to come our way.
                                A woman lets her dog off leash. It immediately jumps into the fountain. She spends the next 10 minutes negotiating the dog&apos;s exit.
                            </p>
                            <p>
                                The sun is setting. Blue, orange, and pink hues overhead. Perfect start to the night.
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(5, 6)}
                />

                <SubEntry
                    title="Start of the Night"
                    content={
                        <div>
                            <p>
                                The night before, we secured a reservation at Tokyo Music Bar. It&apos;s around the corner from our Airbnb.
                                It&apos;s pretty early so the place is sparsely populated. The bar is almost full, but only one table is occupied.
                            </p>
                            <p>
                                We are seated at a table near a couple who is absolutely going at it. Full on make out session. No lack of passion. <br /><br />
                                The drinks are tasty but pricey. The music selection is a mixed bag. We leave after 1 round of drinks. Not missing much. <br /><br />
                            </p>
                            <p>
                                Onto the next spot. <br /><br />
                            </p>
                            <p>
                                We try to catch a house show at Fünk. The line wraps the block and it is not moving. After closer inspection, we notice the crowd looks REALLY young. It&apos;s a bust. <br /><br />
                            </p>
                            <p>
                                &quot;<em>Departamento?</em>&quot; <br /><br />
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(6, 7)}
                />

                <SubEntry
                    title="Departamento Round 2"
                    content={
                        <div>
                            <p>
                                It&apos;s Saturday night so we pay a cover. We head to the 3rd floor rooftop but this time it&apos;s overcrowded.
                                The second floor has its own bar and dance floor. The crowd is more manageable so we stay.
                            </p>
                            <p>
                                We grab a drink and make our way into the crowd. After a couple of songs, we are at the front. The DJ puts on an amazing set. Mostly funk and Latin disco.
                                The set design of the DJ booth is pretty sick. It looks like a recording studio with a pyramid skylight with dynamic lighting.
                            </p>
                            <p>
                               A group of douchy guys are trying to get people&apos;s attention from the VIP section. They eventually get kicked out for getting too close to the DJ booth. They get laughed at.
                            </p>
                            <p>
                                We leave around 1am. Exhausted from dancing. We head home and call it a night.
                            </p>
                        </div>
                    }
                    photoRows={day4PhotoRows.slice(7, 8)}
                />
            </section>

            <section className={styles.section}>
                <h1 className={styles.sectionTitle}>April 6, 2025 - Day 5</h1>
                <SubEntry
                    title="Morning Ritual"
                    content={
                        <div>
                            <p>It&apos;s Sunday Ciclovía. The streets are closed to cars. Bikers and runners take to the streets. Feels like the whole city is getting their cardio in.<br /><br /></p>
                            <p>
                                Haylee&apos;s pick for coffee today is Drip Cafe Especial. Solid choice. My latte was pretty yummy. <br /><br />
                                Groups of friends come and go.
                            </p>
                            <p>
                                We spend too much time here and our flight time is creeping up. We optimistically head to Yellow Monkey for breakfast. <br /><br />
                                There is only one group ahead of us in line. The hopes are high.<br /><br />
                            </p>
                            <p>
                                Plan B. We go to a bakery next door and grab a bag full of pastries. We head to the airport. <br /><br />
                            </p>
                        </div>
                    }
                    photoRows={day5PhotoRows.slice(0, 1)}
                />
                <SubEntry
                    title="Slice of Life"
                    content={
                        <div>
                            <p>An older gentleman is sitting in my seat. <br></br>
                                &quot;I&apos;m so sorry, my wife usually books the aisle seat for me. I have a bad back and need the extra room.&quot;<br></br>
                            </p>
                            <p>He eventually moves to the empty row across the aisle. <br></br> </p>
                            <p>We get to chatting. He tells me he&apos;s an author. He&apos;s heading back home to Seattle to start a book tour.<br></br> </p>
                            <p>We switch back and forth between Spanish and English talking about his origin story. This is his first time solo authoring a book.</p>
                            <p>
                                He mentions he&apos;s a bit hindered by his back problems but as he talked to me he was all smiles. <br/>
                                To me this guy is a total legend. He is still doing the damn thing. In pursuit of his passion and doing so with a smile. This interaction reframes my perspective on the journey into the later years.<br/>
                            </p>

                            <p>
                                Wherever you are ODILÓN VARGAS, I salute you. Good luck on the book release.
                            </p>
                        </div>
                    }
                    photoRows={day5PhotoRows.slice(1, 2)}
                />
            </section>
        </div>
    );
}
