import { motion } from 'motion/react';

const services = [
  {
    title: 'Keramički viniri',
    description:
      'Individualno izrađeni porcelanski viniri s naglaskom na boju, obrise i translucenciju prirodnih zuba. Funkciju i izgled definiraju kliničko stanje te vaša očekivanja.',
    disciplina: 'ESTETIKA',
  },
  {
    title: 'Digitalno planiranje osmijeha',
    description:
      'Detaljni pregled ishoda uz digitalne prikaze prije početka terapije. Plan se usklađuje dijagnostikom i dugoročno održivim rješenjem.',
    disciplina: 'PLANIRANJE',
  },
  {
    title: 'Implantološka rehabilitacija',
    description:
      'Vraćanje funkcije žvačenja i estetike uz suvremene implantološke sustave i prateće protetske nadgradnje, u okvirima prihvaćenih kliničkih protokola.',
    disciplina: 'REHABILITACIJA',
  },
];

const protocol = [
  {
    step: '01',
    title: 'Konzultacija',
    text: 'Razgovor o očekivanjima, klinički pregled, snimci ako su potrebni.',
  },
  {
    step: '02',
    title: 'Plan terapije',
    text: 'Pisani plan s ishodom, vremenskim okvirom i jasnim troškom.',
  },
  {
    step: '03',
    title: 'Izvođenje',
    text: 'Terapija u dogovorenim koracima, uz međukontrole bez žurbe.',
  },
  {
    step: '04',
    title: 'Kontrola',
    text: 'Pregledi nakon završetka radi praćenja stabilnosti rezultata.',
  },
];

export default function Craft() {
  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="bg-surface/50 px-6 py-24 backdrop-blur-sm sm:px-8 md:px-24 lg:py-[160px]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-24">
        <div className="lg:w-1/2">
          <motion.h2
            id="craft-heading"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 font-heading text-4xl leading-[1.1] text-pearl md:mb-16 md:text-5xl lg:text-7xl"
          >
            Stručne <span className="text-gold italic">usluge</span>
          </motion.h2>

          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] text-gold border border-gold/30 px-2 py-1 tracking-widest uppercase">
                    {service.disciplina}
                  </span>
                  <div className="h-[1px] w-12 bg-gold/30 group-hover:w-24 transition-all duration-500" />
                </div>
                <h3 className="mb-4 font-heading text-3xl italic text-pearl transition-colors duration-500 group-hover:text-gold md:text-4xl lg:text-5xl">
                  {service.title}
                </h3>
                <p className="text-pearl/70 text-lg max-w-md leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Protocol panel — replaces previous stock image + watermark.
            Editorial numbered protocol communicates process discipline. */}
        <motion.aside
          aria-labelledby="craft-protocol-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:sticky lg:top-32 lg:w-1/2 lg:self-start"
        >
          <div className="border border-pearl/10 bg-bg/40 p-8 backdrop-blur-sm sm:p-10 md:p-14">
            <span className="mb-4 block font-body text-[10px] uppercase tracking-[0.4em] text-gold">
              Protokol rada
            </span>
            <h3
              id="craft-protocol-heading"
              className="mb-12 font-heading text-3xl italic leading-[1.1] text-pearl md:text-4xl"
            >
              Četiri koraka, bez prečica
            </h3>

            <ol className="space-y-10">
              {protocol.map((p) => (
                <li key={p.step} className="grid grid-cols-[auto_1fr] gap-6">
                  <span
                    className="font-heading text-3xl text-gold/70 tabular-nums"
                    aria-hidden
                  >
                    {p.step}
                  </span>
                  <div>
                    <h4 className="mb-2 font-heading text-xl text-pearl">{p.title}</h4>
                    <p className="font-body text-sm leading-relaxed text-pearl/65">
                      <span className="sr-only">Korak {p.step}: </span>
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 border-t border-pearl/10 pt-8">
              <a
                href="#concierge"
                className="inline-flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.32em] text-gold transition-colors hover:text-gold-bright focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80"
              >
                Zakažite konzultaciju
                <span aria-hidden className="h-px w-10 bg-gold transition-all" />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
