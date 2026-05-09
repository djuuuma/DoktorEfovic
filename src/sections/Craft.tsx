import { motion } from 'motion/react';

const services = [
  {
    title: "Keramički viniri",
    description:
      "Individualno izrađeni porcelanski viniri s naglaskom na boju, obrise i translucenciju prirodnih zuba. Funkciju i izgled definiraju kliničko stanje te vaša očekivanja.",
    disciplina: "ESTETIKA",
  },
  {
    title: "Digitalno planiranje osmijeha",
    description:
      "Detaljni pregled ishoda uz digitalne prikaze prije početka terapije. Plan se usklađuje dijagnostikom i dugoročno održivim rješenjem.",
    disciplina: "PLANIRANJE",
  },
  {
    title: "Implantološka rehabilitacija",
    description:
      "Vraćanje funkcije žvačenja i estetike uz suvremene implantološke sustave i prateće protetske nadgradnje, u okvirima prihvaćenih kliničkih protokola.",
    disciplina: "REHABILITACIJA",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="bg-surface/50 px-6 py-24 backdrop-blur-sm sm:px-8 md:px-24 lg:py-[160px]">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-24">
        <div className="lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] text-gold border border-gold/30 px-2 py-1 tracking-widest uppercase">{service.disciplina}</span>
                  <div className="h-[1px] w-12 bg-gold/30 group-hover:w-24 transition-all duration-500" />
                </div>
                <h3 className="mb-4 font-heading text-3xl italic text-pearl transition-colors duration-500 group-hover:text-gold md:text-4xl lg:text-5xl">
                  {service.title}
                </h3>
                <p className="text-sage text-lg max-w-md leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[4/5] bg-gradient-to-tr from-surface to-transparent shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 copper-pattern opacity-10 rotate-12" />
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
              alt="Detalji kliničkog rada" 
              className="w-full h-full object-cover mix-blend-overlay opacity-40 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-5xl italic text-gold opacity-50 sm:text-6xl md:text-8xl">
                SMILE
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
