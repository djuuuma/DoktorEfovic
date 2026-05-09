import { motion, useTransform, useScroll } from 'motion/react';
import { useRef } from 'react';

const images = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=1200"
];

export default function Studio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-bg">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-24">
          <div className="flex flex-col justify-center min-w-[500px]">
            <span className="text-gold text-xs uppercase tracking-[0.5em] mb-4">
              Ordinacija
            </span>
            <h2 className="text-7xl text-pearl font-heading mb-8">
              Radni <br />
              <span className="italic">prostor</span>
            </h2>
            <p className="text-sage text-lg max-w-sm">
              Prostor je osmišljen da obezbjedi privatnost, miran ambijent i jasnu organizaciju tokom pregleda i terapijskih postupaka.
            </p>
          </div>
          
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="relative h-[70vh] min-w-[60vw] overflow-hidden bg-surface group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={src}
                alt="Prikaz ordinacijskog prostora"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-bg to-transparent">
                <span className="text-gold text-xs uppercase tracking-widest font-body">
                  Fotografija prostora 0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
