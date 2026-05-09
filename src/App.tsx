/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Exhibition from './sections/Exhibition';
import Craft from './sections/Craft';
import Heritage from './sections/Heritage';
import Team from './sections/Team';
import Studio from './sections/Studio';
import Testimonials from './sections/Testimonials';
import Concierge from './sections/Concierge';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Skip link — invisible until keyboard-focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-body focus:text-xs focus:uppercase focus:tracking-[0.28em] focus:text-bg focus:shadow-lg"
      >
        Preskoči na glavni sadržaj
      </a>

      <main id="main-content" className="relative bg-bg selection:bg-gold selection:text-bg">
        <CustomCursor />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] bg-gold z-[100] origin-left"
          style={{ scaleX }}
          aria-hidden
        />

        {/* Navigation — blend mode only on desktop; mobile gets scrim for contrast */}
        <nav
          aria-label="Glavna navigacija"
          className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-pearl/[0.06] bg-bg/72 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md md:border-b-0 md:bg-transparent md:pl-[max(3rem,env(safe-area-inset-left))] md:pr-[max(3rem,env(safe-area-inset-right))] md:pb-12 md:pt-[max(3rem,env(safe-area-inset-top))] md:backdrop-blur-none md:mix-blend-difference"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={scrollToTop}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-start rounded-md border-0 bg-transparent px-3 py-2 font-heading text-2xl lowercase tracking-tighter text-pearl transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 md:min-h-0 md:min-w-0 md:px-0 md:py-0"
            aria-label="Vrati se na vrh stranice"
          >
            smile.
          </motion.button>

          <div className="flex items-center gap-2 md:gap-8">
            <a
              href="#craft"
              className="hidden min-h-11 items-center px-4 font-body text-[10px] uppercase tracking-[0.28em] text-pearl transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 sm:inline-flex md:min-h-0 md:px-0"
            >
              Usluge
            </a>
            <a
              href="#tim"
              className="hidden min-h-11 items-center px-4 font-body text-[10px] uppercase tracking-[0.28em] text-pearl transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 md:inline-flex md:min-h-0 md:px-0"
            >
              Tim
            </a>
            <a
              href="#concierge"
              className="inline-flex min-h-11 items-center px-4 font-body text-[10px] uppercase tracking-[0.28em] text-pearl transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 md:min-h-0 md:px-0"
            >
              Zakazivanje
            </a>
            <div className="hidden h-px w-12 shrink-0 bg-pearl/30 md:block" aria-hidden />
          </div>
        </nav>

        <Exhibition />
        <Craft />
        <Heritage />
        <Team />
        <Studio />
        <Testimonials />
        <Concierge />

        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            onClick={scrollToTop}
            className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-[60] flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border border-gold/40 bg-bg/85 px-6 py-2.5 text-[10px] uppercase tracking-[0.28em] text-pearl shadow-lg backdrop-blur-md transition-colors hover:border-gold hover:text-gold pointer-events-auto md:bottom-12 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label="Vrati se na vrh stranice"
          >
            <ChevronUp className="size-4 text-gold" strokeWidth={1.75} aria-hidden />
            Na vrh
          </motion.button>
        )}
      </main>
    </>
  );
}
