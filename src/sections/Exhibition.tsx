import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

/** Hero ambience — muted, looped, not focal; content stays on top. */
const HERO_VIDEO_ID = '-deD1hXJAUU';

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

export default function Exhibition() {
  const reducedMotion = useReducedMotion();

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}` +
    '?autoplay=1&mute=1&loop=1&playlist=' +
    encodeURIComponent(HERO_VIDEO_ID) +
    '&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3' +
    '&disablekb=1&showinfo=0';

  return (
    <section className="relative isolate flex h-screen items-center justify-center overflow-hidden bg-bg">
      {/* Background media — cropped to cover viewport; clicks pass through to page */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {reducedMotion ? (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-35"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${HERO_VIDEO_ID}/hqdefault.jpg)`,
            }}
            aria-hidden
          />
        ) : (
          <iframe
            title="Neutralni pozadinski video ordinacije (bez zvuka)"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0 outline-none"
            src={embedSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
          />
        )}

        {/* Strong dim — keeps motion in periphery */}
        <div className="absolute inset-0 bg-bg/82" aria-hidden />
        {/* Vignette — soft edges */}
        <div
          className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,26,21,0.6)]"
          aria-hidden
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <span className="text-gold text-xs uppercase tracking-[0.3em] font-body mb-6 block">
          Privatna ordinacija dentalne medicine • Sarajevo
        </span>
        <h1 className="text-7xl md:text-9xl text-pearl leading-none mb-8 tracking-tighter text-glow">
          Estetska
          <br />
          <span className="italic">stomatologija</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sage font-body uppercase tracking-[0.2em] text-[10px]"
        >
          Precizna dijagnostika • Individualni planiranje • Savremeni materijali
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] text-gold uppercase tracking-widest">
          Nastavite pregled
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
