import styles from './ArrowDoodle.module.css';

// Hand-drawn arrow in four slightly jittered frames so it can "boil" like the
// heart doodle. Each frame: shaft + two arrowhead strokes.
const framesRight = [
  'M3 14 L31 14 M31 14 L22 7 M31 14 L22 21',
  'M4 13 L32 14 M32 14 L23 8 M31 14 L22 21',
  'M3 15 L31 13 M31 13 L22 6 M31 13 L23 20',
  'M4 14 L32 15 M32 15 L23 7 M32 15 L22 22',
];

const framesLeft = [
  'M33 14 L5 14 M5 14 L14 7 M5 14 L14 21',
  'M32 13 L4 14 M4 14 L13 8 M5 14 L14 21',
  'M33 15 L5 13 M5 13 L14 6 M5 13 L13 20',
  'M32 14 L4 15 M4 15 L13 7 M4 15 L14 22',
];

export function ArrowDoodle({ direction = 'left' }: { direction?: 'left' | 'right' }) {
  const frames = direction === 'left' ? framesLeft : framesRight;

  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 36 28"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="arrow-roughen" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="8"
          />
          <feDisplacementMap in="SourceGraphic" scale="0.7" />
        </filter>
      </defs>
      {frames.map((d, index) => (
        <g
          className={styles.arrowFrame}
          key={index}
          style={{ animationDelay: `${index * -90}ms` }}
        >
          <path d={d} />
        </g>
      ))}
    </svg>
  );
}
