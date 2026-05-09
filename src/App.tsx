/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-heading text-2xl text-pearl lowercase tracking-tighter"
        >
          smile.
        </motion.span>
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

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/granite.png')]" />
    </main>
  );
}
