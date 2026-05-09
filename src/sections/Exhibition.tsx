import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMobileLayout } from '../hooks/useMobileLayout';

/** Hero ambience — muted, looped, not focal; content stays on top. */
const HERO_VIDEO_ID_DESKTOP = '-deD1hXJAUU';
/** YouTube video ID for narrow viewports (< md / 768px). Use a vertical or lighter clip if you like. */
const HERO_VIDEO_ID_MOBILE = '-deD1hXJAUU';

export default function Exhibition() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMobileLayout();
  const heroVideoId = isMobile ? HERO_VIDEO_ID_MOBILE : HERO_VIDEO_ID_DESKTOP;

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${heroVideoId}` +
    '?autoplay=1&mute=1&loop=1&playlist=' +
    encodeURIComponent(heroVideoId) +
    '&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3' +
    '&disablekb=1&showinfo=0';

  return (
    <section className="relative isolate flex min-h-[100dvh] min-h-svh items-center justify-center overflow-hidden bg-bg md:min-h-screen">
      {/* Background media — cropped to cover viewport; clicks pass through to page */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {reducedMotion ? (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center opacity-35"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${heroVideoId}/hqdefault.jpg)`,
            }}
            aria-hidden
          />
        ) : (
          <iframe
            key={heroVideoId}
            title="Neutralni pozadinski video ordinacije (bez zvuka)"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0 outline-none"
            src={embedSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
          />
        )}

        {/* Strong dim — keeps motion in periphery */}
        <div className="absolute inset-0 bg-bg/88 md:bg-bg/82" aria-hidden />
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
        className="relative z-10 mx-auto max-w-[min(94vw,48rem)] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] text-center sm:max-w-none sm:px-6 md:pb-10"
      >
        <span className="mb-6 block font-body text-[11px] uppercase tracking-[0.28em] text-gold sm:text-xs md:tracking-[0.3em]">
          Privatna ordinacija dentalne medicine • Sarajevo
        </span>
        <h1 className="mb-8 font-heading text-5xl leading-[0.92] tracking-tighter text-pearl text-glow sm:text-6xl md:text-8xl xl:text-9xl">
          Estetska
          <br />
          <span className="italic">stomatologija</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-body text-[11px] uppercase tracking-[0.18em] text-sage sm:text-xs md:tracking-[0.2em]"
        >
          Precizna dijagnostika • Individualno planiranje • Savremeni materijali
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-[max(1.5rem,calc(0.75rem+env(safe-area-inset-bottom)))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 md:bottom-12"
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
