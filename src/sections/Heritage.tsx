import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Heritage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center px-8 relative">
      <div className="absolute inset-0 overflow-hidden -z-10 bg-surface">
        <motion.div 
          style={{ opacity: 0.1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full copper-pattern scale-150"
        />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-4xl text-center"
      >
        <span className="text-gold text-xs uppercase tracking-[0.5em] mb-12 block">
          Naša filozofija rada
        </span>
        <h2 className="text-4xl md:text-6xl text-pearl leading-relaxed font-heading font-normal">
          Preciznost, savremeni pristup i <span className="italic text-gold">individualni plan</span> — za ishode koji
          traju.
        </h2>
      </motion.div>
    </section>
  );
}
