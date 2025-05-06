import styles from "./title-card.module.css"


export default function FieldNoteCard({location, dates}: {location: string, dates: string[]}) {
    return (
        <div className={styles.cardContainer}>
        <div className={styles.card}>
            <div className={styles.cardFront}>
            <div className={styles.cardFront__content}>
                <div className={styles.cardHeader}>
                <h1 className={styles.cardHeader__title}>FIELD NOTES</h1>
                <div className={styles.cardHeaderUnder}>
                    <div className={styles.cardHeaderUnderGlobes}>
                    <img src="/globe.svg" alt="globe" className={styles.icon}/>
                    <p className={styles.cardHeaderUnderGlobesText}>Siezar Exploration Inc.</p>
                    </div>
                    <div className={styles.cardHeaderUnderBoxesLeft}>
                    <div className={styles.cardHeaderBox}>
                        <p className={styles.date}>{dates[0]}</p>
                    </div>
                    <div className={styles.cardHeaderBox}>
                        <p className={styles.date}>{dates[1]}</p>
                    </div>
                    </div>
                    <div className={styles.cardHeaderUnderBoxesRight}>
                    <div className={styles.boxCornerTopLeft}></div>
                    <div className={styles.boxCornerTopRight}></div>
                    <div className={styles.boxCornerBottomLeft}></div>
                    <div className={styles.boxCornerBottomRight}></div>
                    <p className={styles.location}>{location}</p>
                    </div>
                </div>
                </div>
                <div className={styles.cardContent}>
                <p className={styles.cardContentDescription}>
                    <u className={styles.underline}>Not</u> a guide, <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;just simply what I did.
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}