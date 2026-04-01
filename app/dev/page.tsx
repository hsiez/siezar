"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";

// ── Section grid positions (col, row) ──
const SECTIONS = {
  overview: { col: 0, row: 0 },
  projects: { col: 1, row: 0 },
  experience: { col: 0, row: 1 },
  connect: { col: 1, row: 1 },
} as const;

const GAP = 20;
const PADDING = 40;
const EDGE_THRESHOLD = 80;

export default function Dev() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ vw: number; vh: number } | null>(null);

  // Reveal drag offset
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Camera offset — which part of canvas is at viewport (0,0)
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);

  // Reveal's resting viewport position (only updated on snap/init)
  const revealLeft = useMotionValue(0);
  const revealTop = useMotionValue(0);

  // Content canvas translates by -camera
  const canvasTx = useTransform(camX, (v) => -v);
  const canvasTy = useTransform(camY, (v) => -v);

  // Track current "home" section ID for camera target calculation
  const homeIdRef = useRef("overview");
  const panningRef = useRef(false);

  // ── Compute section size & pixel positions from viewport ──
  const getLayout = useCallback((vw: number, vh: number) => {
    const sectionW = vw - PADDING * 2;
    const sectionH = vh - PADDING * 2;
    const cellW = vw + GAP;
    const cellH = vh + GAP;

    const positions: Record<string, { x: number; y: number }> = {};
    for (const [id, pos] of Object.entries(SECTIONS)) {
      positions[id] = {
        x: PADDING + pos.col * cellW,
        y: PADDING + pos.row * cellH,
      };
    }

    return { sectionW, sectionH, cellW, cellH, positions };
  }, []);

  // ── Measure viewport ──
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      setDims({ vw: el.clientWidth, vh: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Initialize reveal position ──
  useEffect(() => {
    if (!dims) return;
    const { positions } = getLayout(dims.vw, dims.vh);
    // Overview section at cam(0,0) appears at its canvas position
    revealLeft.jump(positions.overview.x);
    revealTop.jump(positions.overview.y);
  }, [dims, getLayout, revealLeft, revealTop]);

  // ── Drag hint ──
  useEffect(() => {
    if (!dims) return;
    const id = setTimeout(async () => {
      await animate(dragX, 24, { duration: 0.5, ease: "easeOut" });
      await animate(dragX, 0, { duration: 0.6, ease: "easeInOut" });
    }, 700);
    return () => clearTimeout(id);
  }, [dims, dragX]);

  // ── Edge panning during drag ──
  const handleDrag = useCallback(() => {
    if (!dims || panningRef.current) return;

    const { sectionW, sectionH, cellW, cellH } = getLayout(dims.vw, dims.vh);

    // Reveal center in viewport space
    const vcx = revealLeft.get() + dragX.get() + sectionW / 2;
    const vcy = revealTop.get() + dragY.get() + sectionH / 2;

    let panDx = 0;
    let panDy = 0;

    if (vcx > dims.vw - EDGE_THRESHOLD) panDx = cellW;
    else if (vcx < EDGE_THRESHOLD) panDx = -cellW;

    if (vcy > dims.vh - EDGE_THRESHOLD) panDy = cellH;
    else if (vcy < EDGE_THRESHOLD) panDy = -cellH;

    if (panDx === 0 && panDy === 0) return;

    panningRef.current = true;
    const spring = { type: "spring" as const, stiffness: 200, damping: 30 };

    // Pan only the content canvas; reveal stays under the finger
    const done: PromiseLike<unknown>[] = [];
    if (panDx !== 0)
      done.push(animate(camX, camX.get() + panDx, spring).then(() => {}));
    if (panDy !== 0)
      done.push(animate(camY, camY.get() + panDy, spring).then(() => {}));

    Promise.all(done).then(() => {
      panningRef.current = false;
    });
  }, [dims, getLayout, dragX, dragY, revealLeft, revealTop, camX, camY]);

  // ── Snap to nearest section on drag end ──
  const snap = useCallback(() => {
    if (!dims) return;

    const { sectionW, sectionH, positions } = getLayout(dims.vw, dims.vh);

    // Reveal center in canvas space = viewport pos + camera offset
    const canvasRx = revealLeft.get() + dragX.get() + camX.get();
    const canvasRy = revealTop.get() + dragY.get() + camY.get();
    const rcx = canvasRx + sectionW / 2;
    const rcy = canvasRy + sectionH / 2;

    let bestId = "overview";
    let bestDist = Infinity;

    for (const [id, pos] of Object.entries(positions)) {
      const d = Math.hypot(
        rcx - (pos.x + sectionW / 2),
        rcy - (pos.y + sectionH / 2)
      );
      if (d < bestDist) {
        bestDist = d;
        bestId = id;
      }
    }

    const target = positions[bestId];
    const spring = { type: "spring" as const, stiffness: 400, damping: 28 };

    // Target camera so this section appears at PADDING from viewport edges
    const targetCamX = target.x - PADDING;
    const targetCamY = target.y - PADDING;

    // Reveal's resting viewport position = PADDING (section's viewport position)
    animate(revealLeft, PADDING, spring);
    animate(revealTop, PADDING, spring);
    animate(dragX, 0, spring);
    animate(dragY, 0, spring);
    animate(camX, targetCamX, spring);
    animate(camY, targetCamY, spring);

    homeIdRef.current = bestId;
  }, [dims, getLayout, dragX, dragY, revealLeft, revealTop, camX, camY]);

  if (!dims) {
    return <div ref={containerRef} className={styles.surface} />;
  }

  const { sectionW, sectionH, positions } = getLayout(dims.vw, dims.vh);

  return (
    <div ref={containerRef} className={styles.surface}>
      {/* Layer 1: Draggable reveal — viewport space, not camera-translated */}
      <motion.div
        className={styles.reveal}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={snap}
        style={{
          x: dragX,
          y: dragY,
          left: revealLeft,
          top: revealTop,
          width: sectionW,
          height: sectionH,
        }}
      />

      {/* Grain texture — fixed overlay */}
      <svg className={styles.texture} aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Layer 2: Content canvas — translates with camera */}
      <motion.div
        className={styles.canvas}
        style={{ x: canvasTx, y: canvasTy }}
      >
        <section
          className={styles.section}
          style={{
            left: positions.overview.x,
            top: positions.overview.y,
            width: sectionW,
            height: sectionH,
          }}
        >
          <p className={styles.label}>About</p>
          <h1 className={styles.name}>Siezar.</h1>
          <p className={styles.bio}>
            Design engineer building at the intersection of interface and
            infrastructure. Focused on frontend systems, spatial computing, and
            generative interfaces. Currently working with Next.js, React, and
            TypeScript.
          </p>
          <p className={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </section>

        <section
          className={styles.section}
          style={{
            left: positions.projects.x,
            top: positions.projects.y,
            width: sectionW,
            height: sectionH,
          }}
        >
          <p className={styles.label}>Projects</p>
          <h2 className={styles.heading}>Selected Work</h2>
          <p className={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere.
          </p>
        </section>

        <section
          className={styles.section}
          style={{
            left: positions.experience.x,
            top: positions.experience.y,
            width: sectionW,
            height: sectionH,
          }}
        >
          <p className={styles.label}>Experience</p>
          <h2 className={styles.heading}>Background</h2>
          <p className={styles.bio}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
        </section>

        <section
          className={styles.section}
          style={{
            left: positions.connect.x,
            top: positions.connect.y,
            width: sectionW,
            height: sectionH,
          }}
        >
          <p className={styles.label}>Connect</p>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.bio}>
            Sunt in culpa qui officia deserunt mollit anim id est laborum.
            Consectetur adipiscing elit sed do eiusmod tempor.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
