import { motion, useTransform, useScroll } from 'motion/react';
import { useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=1200',
];

function StudioMobile() {
  return (
    <section
      id="prostor"
      className="bg-bg px-6 py-24 md:hidden"
      aria-labelledby="studio-heading-mobile"
    >
      <div className="mx-auto max-w-lg">
        <span className="mb-4 block font-body text-xs uppercase tracking-[0.35em] text-gold">
          Ordinacija
        </span>
        <h2 id="studio-heading-mobile" className="mb-6 font-heading text-4xl leading-tight tracking-tight text-pearl">
          Radni <br />
          <span className="italic">prostor</span>
        </h2>
        <p className="mb-14 max-w-md font-body text-base leading-relaxed text-sage">
          Prostor je osmišljen da obezbjedi privatnost, miran ambijent i jasnu organizaciju tokom pregleda i
          terapijskih postupaka.
        </p>

        {/* Intentional horizontal gallery: snaps, captions always visible */}
        <div
          className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: '0.25rem' }}
          aria-label="Galerija prostora ordinacije"
        >
          {images.map((src, i) => (
            <figure
              key={src}
              className="w-[min(88vw,20rem)] shrink-0 snap-center first:scroll-ml-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <img
                  src={src}
                  alt={`Ordinacija, fotografija ${i + 1} od ${images.length}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale"
                  draggable={false}
                />
              </div>
              <figcaption className="mt-3 font-body text-[11px] uppercase tracking-widest text-gold">
                Fotografija prostora {(i + 1).toString().padStart(2, '0')}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-center font-body text-[10px] uppercase tracking-[0.2em] text-sage/80">
          Prevucite u stranu za više fotografija
        </p>
      </div>
    </section>
  );
}

/** Desktop-only: sticky scroll-linked horizontal reel */
function StudioDesktop() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <section
      ref={targetRef}
      id="prostor-desktop"
      aria-labelledby="studio-heading-desktop"
      className="relative hidden h-[240vh] bg-bg md:block"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-12 lg:gap-12 lg:px-24">
          <div className="flex w-[min(42vw,28rem)] shrink-0 flex-col justify-center lg:w-[min(38vw,32rem)]">
            <span className="mb-4 font-body text-xs uppercase tracking-[0.5em] text-gold">Ordinacija</span>
            <h2
              id="studio-heading-desktop"
              className="mb-8 font-heading text-5xl leading-[1.08] text-pearl lg:text-7xl"
            >
              Radni <br />
              <span className="italic">prostor</span>
            </h2>
            <p className="max-w-sm font-body text-lg leading-relaxed text-sage">
              Prostor je osmišljen da obezbjedi privatnost, miran ambijent i jasnu organizaciju tokom pregleda i
              terapijskih postupaka.
            </p>
          </div>

          {images.map((src, i) => (
            <motion.div
              key={i}
              className="group relative h-[min(70vh,36rem)] w-[min(52vw,28rem)] shrink-0 overflow-hidden bg-surface lg:h-[70vh] lg:w-[min(48vw,36rem)]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={src}
                alt="Prikaz ordinacijskog prostora"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-80 grayscale transition-[transform,filter,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/40 to-transparent p-6 pt-16 md:p-8 md:pt-20">
                <span className="font-body text-xs uppercase tracking-widest text-gold">
                  Fotografija prostora {(i + 1).toString().padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Studio() {
  return (
    <>
      <StudioMobile />
      <StudioDesktop />
    </>
  );
}
