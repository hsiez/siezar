'use client'

import Image, { StaticImageData } from "next/image";
import { useRef, useEffect, useState } from "react";
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
  photoRows: Array<Array<PhotoDetail>>;
}

export default function PhotoGridDisplay({photoRows }: PhotoGridDisplayProps) {
  const [centeredPhotos, setCenteredPhotos] = useState<Set<number>>(new Set());
  const photoRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const updateCenteredPhotos = () => {
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;
      // Define a center zone around the middle of the screen (±25% of viewport height)
      const centerZoneHeight = viewportHeight * 0.25;
      
      photoRefs.current.forEach((element, photoId) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calculate the vertical center of the photo
          const photoCenterY = rect.top + rect.height / 2;
          
          // Check if photo center is within the center zone
          const isInCenterZone = Math.abs(photoCenterY - centerY) <= centerZoneHeight;
          
          setCenteredPhotos(prev => {
            const newSet = new Set(prev);
            if (isInCenterZone && rect.top < viewportHeight && rect.bottom > 0) {
              // Photo is vertically centered and visible
              newSet.add(photoId);
            } else {
              // Photo is not vertically centered or not visible
              newSet.delete(photoId);
            }
            return newSet;
          });
        }
      });
    };

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateCenteredPhotos);
    };

    // Initial check
    updateCenteredPhotos();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [photoRows]);

  const setPhotoRef = (photoId: number, element: HTMLDivElement | null) => {
    if (element) {
      photoRefs.current.set(photoId, element);
    } else {
      photoRefs.current.delete(photoId);
    }
  };

  return (
    <div className={gridStyles.photosContainer}>
      {photoRows.map((row, rowIndex) => (
        <div key={rowIndex} className={gridStyles.photoRow}>
          {row.map((photoDetail) => (
            <div
              key={photoDetail.id + "_" + photoDetail.caption}
              ref={(el) => setPhotoRef(photoDetail.id, el)}
              data-photo-id={photoDetail.id}
              className={`${gridStyles.photoItem} ${centeredPhotos.has(photoDetail.id) ? gridStyles.inView : ''}`}
            >
              {/* <Image
                src={photoDetail.src}
                alt={photoDetail.alt}
                className={`${gridStyles.photo} ${photoDetail.imageClassName || ""}`}
                objectFit={photoDetail.objectFit}
                loading="lazy"
                // width and height are intrinsic from StaticImageData unless 'fill' is used
                // If 'fill' is used, parent div (photoItem) might need position:relative and dimensions.
              /> */}

              <Image
                src={photoDetail.src}
                alt={photoDetail.alt}
                width={200}
                height={275}
                className={`${gridStyles.photo} ${photoDetail.imageClassName || ""}`}
                loading="lazy"
                sizes="(max-width: 768px) 160px, 275px"
                style={{ objectFit: photoDetail.objectFit || 'cover' }}
              />
              <span className={gridStyles.photoCaption}>{photoDetail.caption}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 