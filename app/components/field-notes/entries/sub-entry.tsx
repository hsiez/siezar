import styles from "./entries.module.css";
import PhotoGridDisplay from "../photo-grid/photo-grid";
import { PhotoDetail } from "../photo-grid/photo-grid";
import { ReactNode } from "react";

interface SubEntryProps {
    title: string;
    content: ReactNode;
    photoRows: PhotoDetail[][];
}

export default function SubEntry({ title, content, photoRows}: SubEntryProps) {
    return (
        <div className={styles.subEntry}>
            <div className={styles.paragraph}>
                <h3 className={styles.subEntryTitle}>{title}</h3>
                <div>{content}</div>
            </div>
            <PhotoGridDisplay photoRows={photoRows} />
        </div>
    );
} 