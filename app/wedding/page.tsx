'use client';

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { InfoPanel } from "./components/InfoPanel/InfoPanel";
import type { SectionId } from "./components/IconNav/IconNav";
import { RsvpFlow } from "./components/RsvpFlow/RsvpFlow";
import styles from "./styles/wedding.module.css";

const polaroids = [
  {
    src: "/wedding/childhood-polaroid-1.jpeg",
    alt: "A child in a patterned dress holding a toy",
  },
  {
    src: "/wedding/childhood-polaroid-2.jpg",
    alt: "A child holding plush toys in a candid family photo",
  },
];

const heartFrames = [
  {
    left: "M48 93 C39 77 25 58 20 38 C17 26 20 18 28 16 C39 12 52 29 61 50",
    right: "M61 50 C64 34 71 13 84 8 C94 4 100 12 97 29 C93 53 75 76 51 98",
  },
  {
    left: "M50 94 C40 78 24 57 19 37 C16 25 21 17 29 15 C40 13 53 30 60 51",
    right: "M60 51 C65 32 72 12 85 7 C95 5 99 13 96 30 C91 54 76 75 52 99",
  },
  {
    left: "M49 93 C38 76 26 59 21 39 C18 27 20 19 29 16 C38 14 51 28 62 49",
    right: "M62 49 C65 33 73 14 85 8 C93 4 100 11 98 28 C94 52 74 77 50 98",
  },
  {
    left: "M49 95 C39 79 24 58 20 38 C18 25 22 18 30 16 C41 13 53 31 61 51",
    right: "M61 51 C64 34 70 13 83 8 C94 3 100 12 97 29 C93 54 76 77 52 99",
  },
];

function HeartDoodle() {
  return (
    <svg
      className={styles.heartDoodle}
      viewBox="0 0 118 118"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="heart-roughen" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="8"
          />
          <feDisplacementMap in="SourceGraphic" scale="0.55" />
        </filter>
      </defs>
      {heartFrames.map((frame, index) => (
        <g
          className={styles.heartFrame}
          key={index}
          style={{ animationDelay: `${index * -90}ms` }}
        >
          <path d={frame.left} />
          <path d={frame.right} />
        </g>
      ))}
    </svg>
  );
}

const detailSections: SectionId[] = [
  "location",
  "dresscode",
  "itinerary",
  "travelers",
  "faq",
];

type WeddingView = SectionId | "rsvp";

function getViewFromUrl(): WeddingView | null {
  const url = new URL(window.location.href);
  const section = url.searchParams.get("section");

  if (detailSections.includes(section as SectionId)) {
    return section as SectionId;
  }

  if (section === "rsvp") {
    return "rsvp";
  }

  return null;
}

export default function WeddingPage() {
  const [view, setView] = useState<WeddingView | null>(null);

  useEffect(() => {
    setView(getViewFromUrl());

    const syncFromUrl = () => setView(getViewFromUrl());
    window.addEventListener("popstate", syncFromUrl);

    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  function setUrlView(nextView: WeddingView | null, method: "push" | "replace" = "push") {
    const url = new URL(window.location.href);

    if (nextView) {
      url.searchParams.set("section", nextView);
    } else {
      url.searchParams.delete("section");
    }

    window.history[method === "push" ? "pushState" : "replaceState"]({}, "", url);
    setView(nextView);
  }

  return (
    <main className={styles.page}>
      <section className={styles.stage} aria-label="Harley and Haylee wedding">
        {view ? (
          <div className={styles.detailsShell}>
            {view === "rsvp" ? (
              <div className={styles.rsvpFrame}>
                <button
                  className={styles.backButton}
                  type="button"
                  aria-label="Back to photos"
                  onClick={() => setUrlView(null)}
                >
                  <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <div className={styles.rsvpShell}>
                  <RsvpFlow />
                </div>
              </div>
            ) : (
              <>
                <button
                  className={styles.backButton}
                  type="button"
                  aria-label="Back to photos"
                  onClick={() => setUrlView(null)}
                >
                  <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <InfoPanel
                  initialSection={view}
                  onSectionChange={(section) => setUrlView(section, "replace")}
                />
              </>
            )}
          </div>
        ) : (
          <>
            <div className={styles.polaroidRow}>
              <HeartDoodle />
              {polaroids.map((polaroid, index) => (
                <div className={styles.polaroid} key={polaroid.src}>
                  <div className={styles.photoSurface}>
                    <Image
                      className={styles.photo}
                      src={polaroid.src}
                      alt={polaroid.alt}
                      width={900}
                      height={1100}
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.announcement}>we&apos;re getting married!</p>
            <nav className={styles.actions} aria-label="Wedding links">
              <button
                className={styles.actionLink}
                type="button"
                onClick={() => setUrlView("location")}
              >
                Details
              </button>
              <button
                className={styles.actionLink}
                type="button"
                onClick={() => setUrlView("rsvp")}
              >
                RSVP
              </button>
            </nav>
          </>
        )}
      </section>
    </main>
  );
}
