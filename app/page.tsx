import styles from "./page.module.css";
import PhotoGridDisplay from "./components/field-notes/photo-grid/photo-grid";
import nilla from "../public/nilla.jpeg";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
       <PhotoGridDisplay photoRows={[
        [
          { id: 1, src: nilla, alt: "Nilla", caption: "" }
        ]
       ]} />
       <p>Ain&apos;t nothing here partner.</p>
      </main>
    </div>
  );
}
