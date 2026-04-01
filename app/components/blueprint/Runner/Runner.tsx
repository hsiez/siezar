import styles from "./Runner.module.css";

// ── Layout constants ──
const W = 560;
const PAD = 3;
const FRAME_R = 10;
const TAG_AREA = 30;

// Channel bar positions
const TOP = 65;
const MID = 340;
const BOT = 615;
const COL1 = 140;
const COL2 = 280;
const COL3 = 420;

// Frame hugs content — no empty top/bottom rows
const FRAME_PAD = 12;
const FRAME_Y = TOP - FRAME_PAD;
const FRAME_BOT = BOT + FRAME_PAD;

// Gate nub (round pipe end + thin taper to part)
const NUB_OFFSET = 6;

// ── Types ──

interface Gate {
  px: number;
  py: number;
  cx: number;
  cy: number;
}

interface RunnerPart {
  id: number;
  cx: number;
  cy: number;
  d: string;
  details?: string[];
  fillRule?: "evenodd";
  gates: Gate[];
  tag: { x: number; y: number; corner: "tl" | "tr" | "bl" | "br" };
}

// ── Parts (each with ≥2 gates) ──

const PARTS: RunnerPart[] = [
  {
    id: 1,
    cx: 70,
    cy: 170,
    d: "M-28,-42 C-30,-38 -34,-25 -34,-10 L-30,15 L-22,38 L-8,42 L8,42 L22,38 L30,15 L34,-10 C34,-25 30,-38 28,-42 L8,-45 L-8,-45 Z",
    details: ["M-22,0 L22,0"],
    gates: [
      { px: 70, py: 125, cx: 70, cy: TOP },
      { px: 104, py: 170, cx: COL1, cy: 170 },
    ],
    tag: { x: 72, y: 67, corner: "tl" },
  },
  {
    id: 2,
    cx: 70,
    cy: 280,
    d: "M0,-22 A22,22 0 0,1 0,22 A22,22 0 0,1 0,-22 Z M0,-10 A10,10 0 0,0 0,10 A10,10 0 0,0 0,-10 Z",
    fillRule: "evenodd",
    gates: [
      { px: 70, py: 302, cx: 70, cy: MID },
      { px: 92, py: 280, cx: COL1, cy: 280 },
    ],
    tag: { x: 72, y: 325, corner: "bl" },
  },
  {
    id: 3,
    cx: 210,
    cy: 158,
    d: "M0,-35 L8,-28 L10,-5 L7,30 L-7,30 L-10,-5 L-8,-28 Z",
    details: ["M0,-20 L0,22"],
    gates: [
      { px: 210, py: 123, cx: 210, cy: TOP },
      { px: 200, py: 158, cx: COL1, cy: 158 },
    ],
    tag: { x: 212, y: 67, corner: "tl" },
  },
  {
    id: 4,
    cx: 210,
    cy: 268,
    d: "M-26,-10 C-26,-22 26,-22 26,-10 L22,6 C18,14 -18,14 -22,6 Z",
    details: ["M-18,0 L18,0"],
    gates: [
      { px: 236, py: 268, cx: COL2, cy: 268 },
      { px: 210, py: 282, cx: 210, cy: MID },
    ],
    tag: { x: 263, y: 270, corner: "tr" },
  },
  {
    id: 5,
    cx: 350,
    cy: 205,
    d: "M0,-52 C18,-52 35,-40 35,-22 L35,32 L22,48 L-22,48 L-35,32 L-35,-22 C-35,-40 -18,-52 0,-52 Z",
    details: ["M0,-35 L0,35", "M-25,10 L25,10"],
    gates: [
      { px: 350, py: 153, cx: 350, cy: TOP },
      { px: 385, py: 205, cx: COL3, cy: 205 },
    ],
    tag: { x: 352, y: 67, corner: "tl" },
  },
  {
    id: 6,
    cx: 460,
    cy: 148,
    d: "M-5,-36 L5,-36 L8,-12 L10,28 L-10,28 L-8,-12 Z",
    details: ["M0,-25 L0,18"],
    gates: [
      { px: 450, py: 148, cx: COL3, cy: 148 },
      { px: 460, py: 112, cx: 460, cy: TOP },
    ],
    tag: { x: 422, y: 150, corner: "tl" },
  },
  {
    id: 7,
    cx: 478,
    cy: 275,
    d: "M-18,-15 L18,-15 L22,5 L12,18 L-12,18 L-22,5 Z",
    details: ["M-10,2 L10,2"],
    gates: [
      { px: 456, py: 275, cx: COL3, cy: 275 },
      { px: 478, py: 293, cx: 478, cy: MID },
    ],
    tag: { x: 422, y: 277, corner: "tl" },
  },
  {
    id: 8,
    cx: 72,
    cy: 435,
    d: "M-6,-45 L26,-45 L36,-18 L30,25 L-16,45 L-26,16 L-20,-18 Z",
    details: ["M-8,-12 L22,-12"],
    gates: [
      { px: 72, py: 390, cx: 72, cy: MID },
      { px: 108, py: 435, cx: COL1, cy: 435 },
    ],
    tag: { x: 55, y: 342, corner: "tr" },
  },
  {
    id: 9,
    cx: 70,
    cy: 555,
    d: "M0,-26 C10,-26 20,-12 20,4 L14,22 L-14,22 L-20,4 C-20,-12 -10,-26 0,-26 Z",
    details: ["M-12,0 L12,0"],
    gates: [
      { px: 70, py: 577, cx: 70, cy: BOT },
      { px: 90, py: 555, cx: COL1, cy: 555 },
    ],
    tag: { x: 72, y: 600, corner: "bl" },
  },
  {
    id: 10,
    cx: 215,
    cy: 478,
    d: "M-36,-25 L36,-25 L28,25 L-28,25 Z",
    details: ["M-5,-25 L0,-14 L5,-25", "M-22,5 L22,5"],
    gates: [
      { px: 179, py: 478, cx: COL1, cy: 478 },
      { px: 251, py: 478, cx: COL2, cy: 478 },
    ],
    tag: { x: 142, y: 480, corner: "tl" },
  },
  {
    id: 11,
    cx: 352,
    cy: 435,
    d: "M-32,-15 L32,-15 L28,12 L12,18 L-12,18 L-28,12 Z",
    details: ["M-20,0 L20,0"],
    gates: [
      { px: 320, py: 435, cx: COL2, cy: 435 },
      { px: 384, py: 435, cx: COL3, cy: 435 },
    ],
    tag: { x: 282, y: 437, corner: "tl" },
  },
  {
    id: 12,
    cx: 350,
    cy: 558,
    d: "M-10,-10 L10,-10 L10,10 L-10,10 Z",
    details: ["M0,-4 A4,4 0 1,1 0,4 A4,4 0 1,1 0,-4 Z"],
    gates: [
      { px: 350, py: 568, cx: 350, cy: BOT },
      { px: 340, py: 558, cx: COL2, cy: 558 },
    ],
    tag: { x: 352, y: 600, corner: "bl" },
  },
  {
    id: 13,
    cx: 472,
    cy: 440,
    d: "M-12,-32 L12,-32 L16,-22 L16,22 L12,32 L-12,32 L-16,22 L-16,-22 Z",
    details: ["M-10,0 L10,0"],
    gates: [
      { px: 456, py: 440, cx: COL3, cy: 440 },
      { px: 472, py: 408, cx: 472, cy: MID },
    ],
    tag: { x: 422, y: 442, corner: "tl" },
  },
  {
    id: 14,
    cx: 478,
    cy: 565,
    d: "M-18,-26 L12,-26 L18,-8 L22,22 L-22,22 L-22,-8 Z",
    details: ["M-15,5 L15,5"],
    gates: [
      { px: 478, py: 587, cx: 478, cy: BOT },
      { px: 456, py: 565, cx: COL3, cy: 565 },
    ],
    tag: { x: 480, y: 600, corner: "bl" },
  },
];

const NODES = [
  { x: COL1, y: TOP },
  { x: COL2, y: TOP },
  { x: COL3, y: TOP },
  { x: COL1, y: MID },
  { x: COL2, y: MID },
  { x: COL3, y: MID },
  { x: COL1, y: BOT },
  { x: COL2, y: BOT },
  { x: COL3, y: BOT },
];

const STUBS = [
  { x1: 490, y1: TOP, x2: 490, y2: 90 },
  { x1: COL1, y1: BOT, x2: COL1, y2: 592 },
  { x1: COL2, y1: MID, x2: COL2, y2: 315 },
];

const TAG_W = 16;
const TAG_H = 14;

/** Visible edges (L-shape) — hides sides touching pipes. */
function tagEdgePath(
  x: number,
  y: number,
  w: number,
  h: number,
  corner: "tl" | "tr" | "bl" | "br"
): string {
  const r = x + w;
  const b = y + h;
  switch (corner) {
    case "tl":
      return `M${x},${b} L${r},${b} L${r},${y}`;
    case "tr":
      return `M${r},${b} L${x},${b} L${x},${y}`;
    case "bl":
      return `M${x},${y} L${r},${y} L${r},${b}`;
    case "br":
      return `M${r},${y} L${x},${y} L${x},${b}`;
  }
}

/** Nub center — offset from part surface toward channel. */
function nubPos(gate: Gate) {
  const dx = gate.cx - gate.px;
  const dy = gate.cy - gate.py;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < NUB_OFFSET) return { nx: gate.px, ny: gate.py };
  const ux = dx / len;
  const uy = dy / len;
  return {
    nx: gate.px + ux * NUB_OFFSET,
    ny: gate.py + uy * NUB_OFFSET,
  };
}

export default function Runner() {
  return (
    <div className={styles.container}>
      <svg
        viewBox={`0 ${FRAME_Y - TAG_AREA} ${W} ${FRAME_BOT - FRAME_Y + PAD + TAG_AREA}`}
        className={styles.runner}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Runner sprue schematic"
      >
        {/* ── Defs ── */}
        <defs>
          {/* Part drop shadow */}
          <filter id="partShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx={2} dy={2} stdDeviation={1.5} floodColor="var(--blueprint-line-primary)" floodOpacity={0.18} />
          </filter>

          {/* Channel depth — raised pipe shadow */}
          <filter id="channelDepth" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx={1.5} dy={1.5} stdDeviation={1.2} floodColor="var(--blueprint-line-primary)" floodOpacity={0.22} />
          </filter>

          {/* Stamped/debossed text — dark shadow top-left + light highlight bottom-right */}
          <filter id="stampedText" x="-10%" y="-20%" width="120%" height="140%">
            <feOffset in="SourceAlpha" dx={-0.4} dy={-0.4} result="darkOffset" />
            <feFlood floodColor="#000000" floodOpacity={0.5} result="dark" />
            <feComposite in="dark" in2="darkOffset" operator="in" result="darkShadow" />
            <feOffset in="SourceAlpha" dx={0.5} dy={0.5} result="lightOffset" />
            <feFlood floodColor="#ffffff" floodOpacity={0.25} result="light" />
            <feComposite in="light" in2="lightOffset" operator="in" result="lightHighlight" />
            <feMerge>
              <feMergeNode in="darkShadow" />
              <feMergeNode in="lightHighlight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>


        </defs>

        {/* ── Frame ── */}
        <rect
          x={PAD}
          y={FRAME_Y}
          width={W - PAD * 2}
          height={FRAME_BOT - FRAME_Y}
          rx={FRAME_R}
          className={styles.frame}
        />


        {/* ── Tag Plate (outside, above frame) ── */}
        <rect
          x={PAD + FRAME_R + 4}
          y={FRAME_Y - 28}
          width={148}
          height={28}
          rx={2}
          className={styles.tagPlate}
        />
        <g filter="url(#stampedText)">
          <text x={PAD + FRAME_R + 15} y={FRAME_Y - 9} className={styles.tagLetter}>
            A
          </text>
          <text x={PAD + FRAME_R + 33} y={FRAME_Y - 9} className={styles.tagText}>
            SIEZAR / DEV
          </text>
        </g>

        {/* ── Channels ── */}
        <g filter="url(#channelDepth)">
          <line x1={PAD} y1={TOP} x2={W - PAD} y2={TOP} className={styles.channel} />
          <line x1={PAD} y1={MID} x2={W - PAD} y2={MID} className={styles.channel} />
          <line x1={PAD} y1={BOT} x2={W - PAD} y2={BOT} className={styles.channel} />
          <line x1={COL1} y1={FRAME_Y} x2={COL1} y2={FRAME_BOT} className={styles.channel} />
          <line x1={COL2} y1={FRAME_Y} x2={COL2} y2={FRAME_BOT} className={styles.channel} />
          <line x1={COL3} y1={FRAME_Y} x2={COL3} y2={FRAME_BOT} className={styles.channel} />
        </g>

        {/* ── Stubs ── */}
        <g filter="url(#channelDepth)">
          {STUBS.map((s, i) => (
            <line key={`stub-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} className={styles.branch} />
          ))}
        </g>

        {/* ── Nodes ── */}
        {NODES.map((n, i) => (
          <circle key={`node-${i}`} cx={n.x} cy={n.y} r={5} className={styles.node} />
        ))}

        {/* ── Parts ── */}
        {PARTS.map((part) => (
          <g key={part.id}>
            {/* Gates: pipe (round cap) → taper → part */}
            <g filter="url(#channelDepth)">
              {part.gates.map((gate, gi) => {
                const { nx, ny } = nubPos(gate);
                return (
                  <g key={gi}>
                    <line x1={gate.cx} y1={gate.cy} x2={nx} y2={ny} className={styles.gate} />
                    <line x1={nx} y1={ny} x2={gate.px} y2={gate.py} className={styles.gateTaper} />
                  </g>
                );
              })}
            </g>

            {/* Number tag */}
            <rect x={part.tag.x} y={part.tag.y} width={TAG_W} height={TAG_H} className={styles.numberRect} />
            <path d={tagEdgePath(part.tag.x, part.tag.y, TAG_W, TAG_H, part.tag.corner)} className={styles.numberEdge} />
            <g filter="url(#stampedText)">
              <text x={part.tag.x + TAG_W / 2} y={part.tag.y + TAG_H / 2} className={styles.numberText}>
                {part.id}
              </text>
            </g>

            {/* Part shape */}
            <g transform={`translate(${part.cx},${part.cy})`} filter="url(#partShadow)">
              <path d={part.d} className={styles.partBevel} fillRule={part.fillRule} />
              <path d={part.d} className={styles.partShape} fillRule={part.fillRule} />
              {part.details?.map((detail, i) => (
                <path key={i} d={detail} className={styles.partDetail} />
              ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
