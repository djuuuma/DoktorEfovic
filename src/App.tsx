/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import ThreeHero from './components/ThreeHero';
import Exhibition from './sections/Exhibition';
import Craft from './sections/Craft';
import Heritage from './sections/Heritage';
import Studio from './sections/Studio';
import Concierge from './sections/Concierge';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
    <main className="relative bg-bg selection:bg-gold selection:text-bg">
      <CustomCursor />
      <ThreeHero />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={scrollToTop}
          className="font-heading text-2xl text-pearl lowercase tracking-tighter cursor-pointer bg-transparent border-0 p-0 hover:text-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80"
          aria-label="Vrati se na vrh stranice"
        >
          smile.
        </motion.button>
        <div className="flex gap-8 items-center">
          <a href="#concierge" className="text-[10px] uppercase tracking-[0.3em] text-pearl hover:text-gold transition-colors">Zakazivanje</a>
          <div className="w-12 h-[1px] bg-pearl/30" />
        </div>
      </nav>

      <Exhibition />
      <Craft />
      <Heritage />
      <Studio />
      <Concierge />

      {showBackToTop && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 rounded-full border border-gold/40 bg-bg/85 px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-pearl shadow-lg backdrop-blur-md hover:border-gold hover:text-gold transition-colors pointer-events-auto md:bottom-12"
          aria-label="Vrati se na vrh stranice"
        >
          <ChevronUp className="size-4 text-gold" strokeWidth={1.75} aria-hidden />
          Na vrh
        </motion.button>
      )}

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/granite.png')]" />
    </main>
  );
}
