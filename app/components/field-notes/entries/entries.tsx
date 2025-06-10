import styles from "./entries.module.css";
import SubEntry from "./sub-entry";
import { PhotoDetail } from "../photo-grid/photo-grid";
import { TripData } from "../../../travel/cdmx/data/schema";

interface EntriesProps {
    tripData: TripData;
    day1PhotoRows: PhotoDetail[][];
    day2PhotoRows: PhotoDetail[][];
    day3PhotoRows: PhotoDetail[][];
    day4PhotoRows: PhotoDetail[][];
    day5PhotoRows: PhotoDetail[][];
}

export default function Entries({ 
    tripData, 
    day1PhotoRows, 
    day2PhotoRows, 
    day3PhotoRows, 
    day4PhotoRows, 
    day5PhotoRows 
}: EntriesProps) {
    
    // Map photo rows to days for easy access
    const photoRowsByDay = [
        day1PhotoRows,
        day2PhotoRows, 
        day3PhotoRows,
        day4PhotoRows,
        day5PhotoRows
    ];

    // Helper function to convert text formatting to JSX
    const formatText = (text: string) => {
        // Handle italic text with *text*
        let formatted = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Handle underlined text with _text_
        formatted = formatted.replace(/_(.*?)_/g, '<u>$1</u>');
        
        return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
    };

    // Helper function to render content paragraphs
    const renderContent = (contentArray: string[]) => {
        return (
            <div>
                {contentArray.map((paragraph, index) => (
                    <p key={index}>
                        {formatText(paragraph)}
                        {index < contentArray.length - 1 && <><br /><br /></>}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {tripData.trip.days.map((day, dayIndex) => (
                <section key={day.dayNumber} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{day.title}</h2>
                    
                    {day.entries.map((entry, entryIndex) => {
                        // Get photo rows for this entry
                        const dayPhotoRows = photoRowsByDay[dayIndex];
                        let entryPhotoRows: PhotoDetail[][] = [];
                        
                        if (entry.photoRowStart !== null && entry.photoRowEnd !== null && dayPhotoRows) {
                            entryPhotoRows = dayPhotoRows.slice(entry.photoRowStart, entry.photoRowEnd);
                        }

                        return (
                            <SubEntry
                                key={entryIndex}
                                title={entry.title}
                                content={renderContent(entry.content)}
                                photoRows={entryPhotoRows}
                            />
                        );
                    })}
                </section>
            ))}
        </div>
    );
}
