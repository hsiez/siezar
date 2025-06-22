"use client";
import { useState } from "react";
import styles from "./entries.module.css";
import SubEntry from "./sub-entry";
import { PhotoDetail } from "../photo-grid/photo-grid";
import { TripData } from "../../../travel/cdmx/data/schema";
import Table from "../log-table/table";
import itineraryData from "../../../travel/cdmx/data/itinerary/itinerary-data.json";
import { validateItineraryData, ItineraryData } from "../../../travel/cdmx/data/itinerary/schema";

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
    
    // Toggle state for view switching
    const [showItinerary, setShowItinerary] = useState(false);
    
    // Validate itinerary data
    let validatedData: ItineraryData | null = null;
    try {
        validatedData = validateItineraryData(itineraryData);
    } catch (error) {
        console.error("Failed to validate itinerary data:", error);
    }
    
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

    // Helper function to transform itinerary data for tables
    const transformDataForTable = (places: any[]) => {
        return places.map(place => ({
            name: place.name,
            location: place.location,
            rating: place.rating,
            "google-link": place["google-link"]
        }));
    };

    // Table configurations
    const tableConfigs = validatedData ? [
        {
            title: "Coffee Spots",
            data: transformDataForTable(validatedData.itinerary.coffee),
            color: "red" as const
        },
        {
            title: "Nightlife",
            data: transformDataForTable(validatedData.itinerary.nightlife),
            color: "yellow" as const
        },
        {
            title: "Sights & Attractions",
            data: transformDataForTable(validatedData.itinerary.sights),
            color: "green" as const
        },
        {
            title: "Food & Restaurants", 
            data: transformDataForTable(validatedData.itinerary.eats),
            color: "blue" as const
        }
    ] : [];

    const headerRow = ["Name", "Location", "Rating"];

    return (
        <div className={styles.container}>
            {/* Toggle Button */}
            <div className={styles.toggleContainer}>
                <button 
                    className={`${styles.toggleButton} ${!showItinerary ? styles.active : ''}`}
                    onClick={() => setShowItinerary(false)}
                >
                    Journal
                </button>
                <div className={styles.toggleDivider}></div>
                <button 
                    className={`${styles.toggleButton} ${showItinerary ? styles.active : ''}`}
                    onClick={() => setShowItinerary(true)}
                >
                    Itinerary
                </button>
            </div>

            {/* Itinerary View */}
            <div className={`${styles.viewSection} ${showItinerary ? styles.visible : styles.hidden}`}>
                {validatedData && (
                    <section className={styles.section}>
                        <div className={styles.tablesGrid}>
                            {tableConfigs.map((config, index) => (
                                <Table
                                    key={index}
                                    tableName={config.title}
                                    headerRow={headerRow}
                                    data={config.data}
                                    color={config.color}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Journal View */}
            <div className={`${styles.viewSection} ${!showItinerary ? styles.visible : styles.hidden}`}>
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
        </div>
    );
}
