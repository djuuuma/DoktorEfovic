import { motion } from 'motion/react';

// TODO: Replace with real patient testimonials when available.
// Each entry: a quote (~280 chars works best), patient's first name + last initial, and the treatment.
// Always obtain written consent before publishing.
const testimonials = [
  {
    quote:
      'Folije sam nosila gotovo cijeli dan i ljudi to nisu primjećivali. Kontrole su bile rijetke, ali svaki put sam tačno znala šta dolazi i koliko je još do kraja.',
    name: 'Lejla H.',
    procedure: 'Prozirne folije / Aligneri',
  },
  {
    quote:
      'Plan je objašnjen u detalje prije nego što je išta krenulo. Estetske bravice se gotovo ne primjećuju, a pomak je išao ujednačeno bez iznenađenja.',
    name: 'Adnan M.',
    procedure: 'Estetski fiksni aparat',
  },
  {
    quote:
      'Imala sam iskustvo s drugom ordinacijom prije, gdje sam izlazila sa više pitanja nego odgovora. Ovdje sam dobila 3D prikaz i jasan vremenski okvir od prve konzultacije.',
    name: 'Selma B.',
    procedure: 'Ortodontski plan i 3D dijagnostika',
  },
];

export default function Testimonials() {
  return (
    <section
      id="iskustva"
      aria-labelledby="testimonials-heading"
      className="bg-surface/40 px-6 py-24 sm:px-8 md:px-24 lg:py-[140px]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl md:mb-24">
          <span className="mb-6 block font-body text-[11px] uppercase tracking-[0.4em] text-gold">
            Iskustva pacijenata
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-4xl leading-[1.1] text-pearl md:text-5xl lg:text-6xl"
          >
            Riječi onih koji su <span className="italic text-gold">prošli kroz tretman</span>
          </h2>
        </div>

        {/* Editorial pull-quote layout — not card grid */}
        <div className="space-y-20 md:space-y-28">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={
                index % 2 === 0
                  ? 'md:max-w-3xl'
                  : 'md:ml-auto md:max-w-3xl md:text-right'
              }
            >
              <span
                aria-hidden
                className="mb-6 block font-heading text-7xl leading-none text-gold/40 md:text-8xl"
              >
                &ldquo;
              </span>
              <blockquote className="mb-8 font-heading text-2xl italic leading-snug text-pearl md:text-3xl lg:text-4xl">
                {t.quote}
              </blockquote>
              <figcaption
                className={
                  'flex flex-col gap-1 font-body text-[11px] uppercase tracking-[0.32em] text-sage ' +
                  (index % 2 === 0 ? '' : 'md:items-end')
                }
              >
                <span className="text-pearl">{t.name}</span>
                <span className="text-gold">{t.procedure}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
