import styles from "./table.module.css";

export interface TableRow {
    name: string;
    location: string;
    rating: number;
}

interface RatingTableProps {
    title: string;
    rows: TableRow[];
}

export default function RatingTable({ title, rows }: RatingTableProps) {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <h3 className={styles.tableTitle}>{title}</h3>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerCell}>Name</th>
                        <th className={styles.headerCell}>Location</th>
                        <th className={styles.headerCell}>Rating</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {rows.map((row, index) => (
                        <tr key={index} className={styles.dataRow}>
                            <td className={styles.dataCell}>{row.name}</td>
                            <td className={styles.dataCell}>{row.location}</td>
                            <td className={styles.ratingCell}>
                                <span className={styles.rating}>
                                    {row.rating}/5
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.tableFooter}>
                <img src="/globe.svg" alt="globe" className={styles.icon}/> 
                <p className={styles.tableFooterText}>
                    Siezar Exploration Inc.
                </p>
            </div>
        </div>
    );
}