import { motion } from 'framer-motion';

const G = 'hsl(41 54% 58%)';
const I = 'hsl(42 33% 96%)';

/* Decorative hero artwork: rotating rings, orbiting nodes, self-drawing curves. All aria-hidden, non-interactive. */
export function HeroGraphics() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute -end-24 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 opacity-40 md:opacity-60 max-md:end-[-18rem] max-md:top-[55%]" viewBox="0 0 600 600" fill="none">
        <g className="gx-spin" style={{ transformOrigin: '300px 300px' }}>
          <circle cx="300" cy="300" r="280" stroke={G} strokeWidth="1.2" strokeDasharray="2 12" />
          <circle cx="300" cy="20" r="7" fill={G} />
          <circle cx="580" cy="300" r="4" fill={I} />
        </g>
        <g className="gx-spin-rev" style={{ transformOrigin: '300px 300px' }}>
          <circle cx="300" cy="300" r="210" stroke={I} strokeOpacity=".5" strokeWidth="1" strokeDasharray="40 18 6 18" />
          <circle cx="90" cy="300" r="6" fill={G} />
          <circle cx="449" cy="151" r="4" fill={I} />
        </g>
        <g className="gx-spin-slow" style={{ transformOrigin: '300px 300px' }}>
          <circle cx="300" cy="300" r="140" stroke={G} strokeOpacity=".8" strokeWidth="1.5" />
          <path d="M300 160 A140 140 0 0 1 440 300" stroke={G} strokeWidth="5" strokeLinecap="round" />
          <circle cx="300" cy="160" r="5" fill={G} />
        </g>
        <motion.path d="M40 470 C 160 380, 240 520, 340 430 S 520 380, 580 450" stroke={G} strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.6, ease: 'easeInOut' }} />
      </svg>
      {[8, 22, 41, 63, 78, 90].map((l, i) => (
        <span key={l} className="gx-rise absolute bottom-0 block rounded-full bg-secondary" style={{ left: `${l}%`, width: 4 + (i % 3) * 3, height: 4 + (i % 3) * 3, animationDelay: `${i * 1.7}s`, animationDuration: `${11 + i * 1.5}s` }} />
      ))}
    </div>
  );
}

/* Animated wave seam between hero and marquee. */
export function WaveDivider() {
  return (
    <div className="pointer-events-none relative -mt-px h-10 overflow-hidden bg-secondary md:h-14" aria-hidden="true">
      <svg className="gx-wave absolute bottom-0 start-0 h-full w-[200%]" viewBox="0 0 2400 80" preserveAspectRatio="none">
        <path d="M0 0H2400V0C2100 70 1800 70 1500 30 1200 -10 900 -10 600 30 300 70 150 70 0 0Z" fill="hsl(201 68% 22%)" transform="scale(1 -1) translate(0 -80) scale(1 -1) translate(0 0)" />
      </svg>
    </div>
  );
}

/* Drifting blueprint lines and nodes for the dark benefits section. */
export function SectionOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <path className="gx-dash" d="M0 520 C 200 420, 320 560, 520 470 S 860 380, 1200 480" stroke={G} strokeWidth="1.5" strokeDasharray="6 10" />
        <path className="gx-dash gx-dash-b" d="M0 120 C 240 200, 420 40, 640 110 S 980 190, 1200 90" stroke={I} strokeWidth="1" strokeDasharray="3 12" />
      </svg>
      <span className="gx-float absolute end-[6%] top-16 block h-24 w-24 rounded-full border border-secondary/50" />
      <span className="gx-float absolute bottom-12 start-[8%] block h-3 w-3 rounded-full bg-secondary" style={{ animationDelay: '-3s' }} />
    </div>
  );
}
