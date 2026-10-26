import { motion, useReducedMotion } from 'framer-motion';

/** One readable phrase per section break, revealed once without looping distractions. */
export function AnimatedDivider({ text, index }: { text: string; index: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-primary/15 bg-background px-5 py-10 md:px-10 md:py-14" data-testid={`animated-divider-${index}`}>
      <div className="mx-auto max-w-7xl">
        <motion.p
          key={text}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } },
          }}
          className="f-display flex flex-wrap items-baseline justify-center gap-x-[0.3em] gap-y-2 text-center text-3xl leading-relaxed text-primary md:text-5xl"
        >
          <span className="sr-only">{text}</span>
          {text.split(' ').map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              aria-hidden="true"
              variants={{
                hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0 : 0.55, ease: [0.2, 0.7, 0.2, 1] },
                },
              }}
              className={i === text.split(' ').length - 1 ? 'text-accent' : ''}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          initial={{ scaleX: reducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.2 }}
          className="mx-auto mt-6 h-px w-28 bg-secondary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
