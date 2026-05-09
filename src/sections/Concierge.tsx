import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export default function Concierge() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <section id="concierge" className="py-[160px] px-8 bg-surface">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs uppercase tracking-[0.5em] mb-4 block">Kontakt</span>
          <h2 className="text-5xl md:text-6xl text-pearl font-heading mb-6 italic text-glow">
            Zakazivanje konzultacije
          </h2>
          <p className="text-sage text-lg font-body font-light">
            Pošaljite osnovne podatke; naša ordinacija javiti će vam se radi dogovora termina i pružanja informacija koje vas zanimaju.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bg p-16 text-center border border-gold/20"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="text-bg w-8 h-8" />
              </div>
              <h3 className="text-3xl text-pearl font-heading mb-4">Zahtjev je zaprimljen</h3>
              <p className="text-sage">
                Hvala na poslanoj poruci. Odgovor možete očekivati u najkraćem roku — u pravilu unutar 24 sata u radnim
                danima — radi potvrde termina ili dodatnih informacija.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit}
              className="space-y-12"
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="relative group">
                <label className="text-[10px] text-gold uppercase tracking-widest absolute -top-6 left-0 opacity-0 group-focus-within:opacity-100 transition-opacity">Ime i prezime</label>
                <input 
                  required
                  placeholder="Ime i prezime"
                  className="w-full bg-transparent border-b border-sage/30 py-4 text-2xl text-pearl font-heading focus:outline-none focus:border-gold transition-colors placeholder:text-sage/40"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <label className="text-[10px] text-gold uppercase tracking-widest absolute -top-6 left-0 opacity-0 group-focus-within:opacity-100 transition-opacity">Broj telefona</label>
                <input 
                  required
                  type="tel"
                  placeholder="Broj telefona"
                  className="w-full bg-transparent border-b border-sage/30 py-4 text-2xl text-pearl font-heading focus:outline-none focus:border-gold transition-colors placeholder:text-sage/40"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="relative group">
                <label className="text-[10px] text-gold uppercase tracking-widest absolute -top-6 left-0 opacity-0 group-focus-within:opacity-100 transition-opacity">Vrsta usluge ili interesa</label>
                <select 
                  className="w-full bg-transparent border-b border-sage/30 py-4 text-2xl text-pearl font-heading focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="" disabled>Izaberite oblast ili prvi pregled</option>
                  <option value="viniri" className="bg-surface">
                    Keramički viniri
                  </option>
                  <option value="dizajn" className="bg-surface">
                    Digitalno planiranje osmijeha
                  </option>
                  <option value="implant" className="bg-surface">
                    Implantološka rehabilitacija
                  </option>
                  <option value="general" className="bg-surface">
                    Opća konzultacija / prvi pregled
                  </option>
                </select>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'submitting'}
                className="w-full py-6 bg-gold text-bg uppercase tracking-[0.2em] font-body font-bold text-sm hover:bg-gold-bright transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Slanje...' : 'Pošalji zahtjev'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <footer className="mt-24 pt-24 border-t border-sage/10 text-center flex flex-col items-center gap-6">
          <div className="flex gap-12 text-[10px] text-sage uppercase tracking-[0.3em]">
            <span>Sarajevo, Bosna i Hercegovina</span>
            <span>+387 33 000 000</span>
            <span>studio@smile.art</span>
          </div>
          <div className="copper-pattern w-full h-8 opacity-10" />
        </footer>
      </div>
    </section>
  );
}
