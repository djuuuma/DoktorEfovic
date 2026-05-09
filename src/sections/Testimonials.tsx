import { motion } from 'motion/react';

// TODO: Replace with real patient testimonials.
// Each entry: a quote (max ~280 chars works best), the patient's first name + last initial, and the procedure they had.
// Always get written consent before publishing.
const testimonials = [
  {
    quote:
      'Od prvog pregleda do kontrole, sve je bilo pažljivo objašnjeno. Bez žurbe, bez pritiska. Nikad mi nije bilo prijatnije kod stomatologa.',
    name: 'Lejla H.',
    procedure: 'Keramički viniri',
  },
  {
    quote:
      'Implant je urađen profesionalno, a oporavak je tekao tačno kako su mi rekli. Cijenim to što su me pripremili za svaku fazu.',
    name: 'Adnan M.',
    procedure: 'Implantološka rehabilitacija',
  },
  {
    quote:
      'Digitalna simulacija mi je pomogla da odlučim mirno. Vidjela sam šta dobijam, a rezultat se poklopio s prikazom.',
    name: 'Selma B.',
    procedure: 'Digitalno planiranje osmijeha',
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
