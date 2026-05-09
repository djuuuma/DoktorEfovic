import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CURSOR_BODY_CLASS = 'custom-cursor-on';

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const mqPointer = window.matchMedia('(pointer: fine)');

    const sync = () => setEnabled(mqMotion.matches && mqPointer.matches);

    sync();
    mqMotion.addEventListener('change', sync);
    mqPointer.addEventListener('change', sync);
    return () => {
      mqMotion.removeEventListener('change', sync);
      mqPointer.removeEventListener('change', sync);
    };
  }, []);

  return enabled;
}

export default function CustomCursor() {
  const enabled = useCustomCursorEnabled();
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const springX = useSpring(ringX, { stiffness: 500, damping: 28 });
  const springY = useSpring(ringY, { stiffness: 500, damping: 28 });

  const hoverRef = useRef(false);
  const scale = useMotionValue(1);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add(CURSOR_BODY_CLASS);
    return () => document.body.classList.remove(CURSOR_BODY_CLASS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      const rx = e.clientX - 8;
      const ry = e.clientY - 8;
      ringX.set(rx);
      ringY.set(ry);
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const nextHover = !!(el?.closest?.('button, a'));
      if (nextHover !== hoverRef.current) {
        hoverRef.current = nextHover;
        scale.set(nextHover ? 2.5 : 1);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, dotX, dotY, ringX, ringY, scale]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 border border-gold rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          x: springX,
          y: springY,
          scale,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-gold rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
