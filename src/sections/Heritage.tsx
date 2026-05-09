import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Heritage() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const visible = useInView(containerRef, { rootMargin: '200px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="heritage-heading"
      className="relative flex min-h-[100dvh] min-h-svh items-center justify-center px-6 py-20 sm:px-10 md:h-screen md:min-h-0 md:px-14 md:py-0 lg:px-16"
    >
      <div className="absolute inset-0 overflow-hidden -z-10 bg-surface">
        <motion.div
          aria-hidden
          style={{ opacity: 0.1 }}
          animate={visible && !reducedMotion ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 100,
            repeat: visible && !reducedMotion ? Infinity : 0,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full copper-pattern scale-150"
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-xl text-center sm:max-w-2xl lg:max-w-4xl"
      >
        <span className="mb-10 block font-body text-[11px] uppercase tracking-[0.4em] text-gold sm:text-xs md:mb-12 md:tracking-[0.5em]">
          Naša filozofija rada
        </span>
        <h2
          id="heritage-heading"
          className="font-heading text-3xl font-normal leading-snug text-pearl sm:text-4xl md:leading-relaxed lg:text-6xl"
        >
          Preciznost, savremeni pristup i <span className="italic text-gold">individualni plan</span> — za ishode
          koji traju.
        </h2>
      </motion.div>
    </section>
  );
}
