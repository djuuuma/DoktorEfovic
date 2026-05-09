import { motion } from 'motion/react';

const doctor = {
  name: 'Dr. Haris Efović',
  title: 'Specijalista ortodoncije',
  credentials: [
    'Doktor stomatologije, Stomatološki fakultet · Univerzitet u Sarajevu',
    'Specijalizacija iz ortodoncije, Stomatološki fakultet u Sarajevu',
    'Aktivni član Stomatološke komore Federacije Bosne i Hercegovine',
  ],
  bio: 'Praksa je usmjerena na estetsku ortodonciju odraslih i diskretne sisteme — prozirne folije i estetske fiksne aparate. Svaki plan terapije gradi se na dijagnostici i ciljevima koje pacijent postavi tokom prve konzultacije, bez prečica i bez univerzalnih protokola.',
  yearsOfPractice: 12,
  portraitUrl: '/dr-haris-efovic.jpg',
};

export default function Team() {
  return (
    <section
      id="tim"
      aria-labelledby="team-heading"
      className="relative bg-bg px-6 py-24 sm:px-8 md:px-24 lg:py-[160px]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Portrait — anchored left, oversize, no card frame */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
            <img
              src={doctor.portraitUrl}
              alt={`Portret: ${doctor.name}, ${doctor.title}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent"
              aria-hidden
            />
          </div>
          <figcaption className="mt-4 font-body text-[10px] uppercase tracking-[0.32em] text-gold">
            {doctor.yearsOfPractice}+ godina prakse
          </figcaption>
        </motion.figure>

        {/* Editorial detail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          <span className="mb-6 block font-body text-[11px] uppercase tracking-[0.4em] text-gold">
            Tim
          </span>
          <h2
            id="team-heading"
            className="mb-2 font-heading text-4xl leading-[1.05] text-pearl md:text-6xl lg:text-7xl"
          >
            {doctor.name}
          </h2>
          <p className="mb-10 font-body text-base italic text-pearl/75 md:text-lg">{doctor.title}</p>

          <p className="mb-12 max-w-prose font-body text-lg leading-relaxed text-pearl/85 md:text-xl">
            {doctor.bio}
          </p>

          <ul className="space-y-4 border-t border-pearl/10 pt-8">
            {doctor.credentials.map((credential) => (
              <li
                key={credential}
                className="flex gap-4 font-body text-sm text-pearl/70 md:text-base"
              >
                <span className="mt-2 inline-block h-px w-6 shrink-0 bg-gold/60" aria-hidden />
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
