import Image, { StaticImageData } from "next/image";
import gridStyles from "./photo-grid.module.css"; // Import new CSS module

export interface PhotoDetail {
  id: number; // Used for matching with activePhoto and as React key
  src: StaticImageData;
  alt: string;
  caption: string;
  imageClassName?: string; // For additional classes on the Image component (e.g., styles.portrait)
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

interface PhotoGridDisplayProps {
  activePhoto: number | null;
  photoRows: Array<Array<PhotoDetail>>;
}

export default function PhotoGridDisplay({ activePhoto, photoRows }: PhotoGridDisplayProps) {
  return (
    <div className={gridStyles.photosContainer}>
      {photoRows.map((row, rowIndex) => (
        <div key={rowIndex} className={gridStyles.photoRow}>
          {row.map((photoDetail) => (
            <div
              key={photoDetail.id + "_" + photoDetail.caption} // Assuming IDs are unique within this grid instance
              className={`${gridStyles.photoItem} ${activePhoto === photoDetail.id ? gridStyles.triggeredPhoto : ""}`}
            >
              <Image
                src={photoDetail.src}
                alt={photoDetail.alt}
                className={`${gridStyles.photo} ${photoDetail.imageClassName || ""}`}
                objectFit={photoDetail.objectFit}
                loading="eager"
                // width and height are intrinsic from StaticImageData unless 'fill' is used
                // If 'fill' is used, parent div (photoItem) might need position:relative and dimensions.
              />
              <span className={gridStyles.photoCaption}>{photoDetail.caption}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 