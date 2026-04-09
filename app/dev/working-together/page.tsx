"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HalftoneDots } from "@paper-design/shaders-react";
import { FadeBox } from "@/app/components/fade-box/fade-box";
import styles from "./page.module.css";

const IMAGES = [
  {
    src: "/dev/sword.png",
    size: 0.47,
    targetRadius: 1.25,
    contrast: 0.4,
    grainMixer: 1,
    grainOverlay: 0,
    grainSize: 0.5,
  },
  {
    src: "/dev/vegeta.png",
    size: 0.5,
    targetRadius: 2,
    contrast: 0.62,
    grainMixer: 1,
    grainOverlay: 0,
    grainSize: 0,
  },
];

const SHRINK_DURATION = 800;
const GROW_DURATION = 1000;
const HOLD_DURATION = 5000;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

export default function WorkingTogether() {
  const [ready, setReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(IMAGES[0].targetRadius);
  const [currentSrc, setCurrentSrc] = useState(IMAGES[0].src);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    let loaded = 0;
    const check = () => {
      loaded++;
      if (loaded === 2) setImagesLoaded(true);
    };
    const sword = new Image();
    sword.src = "/dev/sword.png";
    sword.onload = check;

    const vegeta = new Image();
    vegeta.src = "/dev/vegeta.png";
    vegeta.onload = check;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const animateTransition = useCallback(
    (nextIndex: number) => {
      if (animatingRef.current) return;
      animatingRef.current = true;

      const currentTarget = IMAGES[activeIndex].targetRadius;
      const nextTarget = IMAGES[nextIndex].targetRadius;
      let start: number;

      // Phase 1: shrink radius to 0
      const shrink = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / SHRINK_DURATION, 1);
        const easedProgress = easeInCubic(progress);

        setRadius(currentTarget * (1 - easedProgress));

        if (progress < 1) {
          requestAnimationFrame(shrink);
        } else {
          // Swap image at radius 0
          setCurrentSrc(IMAGES[nextIndex].src);
          setActiveIndex(nextIndex);
          start = 0;
          requestAnimationFrame(grow);
        }
      };

      // Phase 2: grow radius to target
      const grow = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / GROW_DURATION, 1);
        const easedProgress = easeOutCubic(progress);

        setRadius(nextTarget * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(grow);
        } else {
          animatingRef.current = false;
        }
      };

      requestAnimationFrame(shrink);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % IMAGES.length;
      animateTransition(nextIndex);
    }, HOLD_DURATION);
    return () => clearInterval(interval);
  }, [imagesLoaded, activeIndex, animateTransition]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 2);
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 2);
  }, []);

  const scrollClass = [
    styles.scrollArea,
    canScrollUp && styles.fadeTop,
    canScrollDown && styles.fadeBottom,
  ]
    .filter(Boolean)
    .join(" ");

  const img = IMAGES[activeIndex];

  return (
    <div className={`${styles.container} ${ready ? styles.ready : ""}`}>
      <HalftoneDots
        style={{ width: "100%", height: "100%" }}
        colorBack="#f2f1e8"
        colorFront="#ffffff"
        originalColors={false}
        type="gooey"
        grid="hex"
        inverted={false}
        size={0.47}
        radius={1.25}
        contrast={0.4}
        grainMixer={0.1}
        grainOverlay={0.1}
        grainSize={0.05}
      />
      <div className={styles.letter}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>Working Together</h1>
          <FadeBox fadeSize="100px" className={styles.scrollWrapper}>
            <div ref={scrollRef} onScroll={handleScroll} className={scrollClass}>
              <div className={styles.paragraphs}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
              </div>
            </div>
          </FadeBox>
        </div>
        {imagesLoaded && (
          <div className={styles.imageWrapper}>
            <HalftoneDots
              style={{ width: "100%", height: "100%" }}
              image={currentSrc}
              colorBack="#f2f1e900"
              colorFront="#2b2b2b"
              originalColors={false}
              type="gooey"
              grid="hex"
              inverted={false}
              size={img.size}
              radius={radius}
              contrast={img.contrast}
              grainMixer={img.grainMixer}
              grainOverlay={img.grainOverlay}
              grainSize={img.grainSize}
              fit="contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
