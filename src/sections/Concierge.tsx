import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

const CONTACT = {
  phoneDisplay: '+387 33 555 100',
  phoneTel: '+38733555100',
  email: 'ordinacija@smile.ba',
  street: 'Maršala Tita 24',
  postalCode: '71000',
  city: 'Sarajevo',
  country: 'Bosna i Hercegovina',
  hours: [
    { days: 'Ponedjeljak — Petak', time: '09:00 — 18:00' },
    { days: 'Subota', time: '10:00 — 14:00' },
    { days: 'Nedjelja', time: 'Zatvoreno' },
  ],
};

type FieldKey = 'name' | 'phone' | 'service';

const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: 'aligneri', label: 'Prozirne folije / Aligneri' },
  { value: 'fiksni', label: 'Fiksni ortodontski aparati' },
  { value: 'plan', label: 'Ortodontski plan i 3D dijagnostika' },
  { value: 'konsultacija', label: 'Prva ortodontska konsultacija' },
];

function countDigits(s: string): number {
  return s.replace(/\D/g, '').length;
}

function validate(
  formData: { name: string; phone: string; service: string },
): Partial<Record<FieldKey, string>> | null {
  const name = formData.name.trim();
  const phone = formData.phone.trim();
  const service = formData.service.trim();

  const errors: Partial<Record<FieldKey, string>> = {};

  if (name.length < 2) errors.name = 'Unesite ime i prezime (najmanje 2 znaka).';
  if (name.length > 200) errors.name = 'Ime je predugo; skratite unos.';
  const digits = countDigits(phone);
  if (digits < 8) errors.phone = 'Unesite ispravan broj telefona (najmanje 8 cifara).';
  if (!service) errors.service = 'Izaberite vrstu konzultacije ili prvi pregled.';

  return Object.keys(errors).length ? errors : null;
}

async function postConciergeRequest(formData: { name: string; phone: string; service: string }) {
  const url = import.meta.env.VITE_CONCIERGE_FORM_URL?.trim();
  if (!url) {
    return { ok: false as const, code: 'not_configured' as const };
  }

  const serviceLabel =
    SERVICE_OPTIONS.find((o) => o.value === formData.service)?.label ?? formData.service;

  const body = new URLSearchParams({
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    service: formData.service.trim(),
    service_label: serviceLabel,
    subject: 'Smile · Zahtjev za zakazivanje',
  }).toString();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    return { ok: false as const, code: 'bad_response' as const, status: response.status };
  }

  return { ok: true as const };
}

export default function Concierge() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const patchField = (key: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validate(formData);
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    const url = import.meta.env.VITE_CONCIERGE_FORM_URL?.trim();
    if (!url) {
      setSubmitError(
        `Online slanje trenutačno nije podešeno. Pozovite ${CONTACT.phoneDisplay} ili pišite na ${CONTACT.email}.`,
      );
      return;
    }

    setStatus('submitting');
    setFieldErrors({});

    let succeeded = false;
    try {
      const result = await postConciergeRequest(formData);

      if (result.ok) {
        succeeded = true;
        setStatus('success');
        return;
      }

      if (result.code === 'bad_response') {
        setSubmitError(
          result.status === 429
            ? 'Previše zahtjeva odjednom. Pričekajte minut pa pokušajte ponovo.'
            : 'Slanje nije uspjelo. Pokušajte ponovo za nekoliko trenutaka ili nas kontaktirajte direktno.',
        );
      } else {
        setSubmitError(
          'Online slanje nije dostupno. Javite se telefonom ili e‑poštom — podaci na dnu stranice.',
        );
      }
    } catch {
      setSubmitError('Nema mrežne veze. Provjerite internet i pokušajte ponovo.');
    } finally {
      if (!succeeded) setStatus('idle');
    }
  };

  return (
    <section
      id="concierge"
      className="bg-surface px-6 py-24 sm:px-8 md:py-32 lg:py-[140px]"
      aria-labelledby="concierge-heading"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs uppercase tracking-[0.5em] mb-4 block">Kontakt</span>
          <h2
            id="concierge-heading"
            className="mb-6 font-heading text-4xl italic text-pearl text-glow sm:text-5xl md:text-6xl"
          >
            Zakazivanje konzultacije
          </h2>
          <p className="text-pearl/75 text-lg font-body font-light">
            Pošaljite osnovne podatke; naša ordinacija javiti će vam se radi dogovora termina i pružanja
            informacija koje vas zanimaju.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/20 bg-bg p-8 text-center md:p-16"
              role="status"
            >
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="text-bg w-8 h-8" aria-hidden />
              </div>
              <h3 className="text-3xl text-pearl font-heading mb-4">Zahtjev je zaprimljen</h3>
              <p className="text-pearl/75">
                Hvala na poslanoj poruci. Odgovor možete očekivati u najkraćem roku — u pravilu unutar 24
                sata u radnim danima — radi potvrde termina ili dodatnih informacija.
              </p>
              <button
                type="button"
                className="mt-10 text-gold text-xs uppercase tracking-[0.3em] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm px-2 py-1"
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', phone: '', service: '' });
                  setSubmitError(null);
                  setFieldErrors({});
                }}
              >
                Pošalji još jedan zahtjev
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={(e) => void handleSubmit(e)}
              noValidate
              className="space-y-10"
              exit={{ opacity: 0, y: -20 }}
              aria-busy={status === 'submitting'}
              aria-describedby={submitError ? 'concierge-form-error' : undefined}
            >
              {submitError ? (
                <div
                  id="concierge-form-error"
                  role="alert"
                  className="rounded-sm border border-red-400/40 bg-red-950/30 px-4 py-3 text-sm text-pearl/90"
                >
                  {submitError}
                </div>
              ) : null}

              <div className="space-y-2">
                <label
                  htmlFor="concierge-name"
                  className="text-[10px] text-gold uppercase tracking-widest block"
                >
                  Ime i prezime
                </label>
                <input
                  id="concierge-name"
                  name="name"
                  autoComplete="name"
                  placeholder="npr. Lejla Hadžić"
                  className="w-full bg-transparent border-b border-sage/40 py-3 text-2xl text-pearl font-heading transition-colors placeholder:text-sage/50 focus:outline-none focus:border-gold focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0 rounded-none"
                  value={formData.name}
                  onChange={(e) => patchField('name', e.target.value)}
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'concierge-err-name' : undefined}
                />
                {fieldErrors.name ? (
                  <p id="concierge-err-name" className="text-sm text-red-400/90" role="status">
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="concierge-phone"
                  className="text-[10px] text-gold uppercase tracking-widest block"
                >
                  Broj telefona
                </label>
                <input
                  id="concierge-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+387 61 000 000"
                  className="w-full bg-transparent border-b border-sage/40 py-3 text-2xl text-pearl font-heading transition-colors placeholder:text-sage/50 focus:outline-none focus:border-gold focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0 rounded-none"
                  value={formData.phone}
                  onChange={(e) => patchField('phone', e.target.value)}
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? 'concierge-err-phone' : undefined}
                />
                {fieldErrors.phone ? (
                  <p id="concierge-err-phone" className="text-sm text-red-400/90" role="status">
                    {fieldErrors.phone}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="concierge-service"
                  className="text-[10px] text-gold uppercase tracking-widest block"
                >
                  Vrsta usluge ili interesa
                </label>
                <div className="relative">
                  <select
                    id="concierge-service"
                    name="service"
                    className="w-full bg-transparent border-b border-sage/40 py-3 pr-10 text-2xl text-pearl font-heading transition-colors focus:outline-none focus:border-gold focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-0 appearance-none cursor-pointer rounded-none"
                    value={formData.service}
                    onChange={(e) => patchField('service', e.target.value)}
                    aria-invalid={!!fieldErrors.service}
                    aria-describedby={fieldErrors.service ? 'concierge-err-service' : undefined}
                  >
                    <option value="" disabled>
                      Izaberite oblast ili prvi pregled
                    </option>
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value} className="bg-surface">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 text-gold"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                {fieldErrors.service ? (
                  <p id="concierge-err-service" className="text-sm text-red-400/90" role="status">
                    {fieldErrors.service}
                  </p>
                ) : null}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'submitting'}
                className="w-full py-6 bg-gold text-bg uppercase tracking-[0.2em] font-body font-bold text-sm hover:bg-gold-bright transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {status === 'submitting' ? 'Slanje...' : 'Pošalji zahtjev'}
              </motion.button>

              <p className="text-center text-sage/80 text-xs font-body font-light leading-relaxed">
                {import.meta.env.VITE_CONCIERGE_FORM_URL?.trim()
                  ? 'Klik na dugme šalje osnovne podatke tako da vas možemo brzo kontaktirati.'
                  : 'Online zakazivanje još nije povezano — koristite telefon ili e‑poštu u podnožju.'}
                {import.meta.env.DEV && !import.meta.env.VITE_CONCIERGE_FORM_URL?.trim() ? (
                  <span className="block mt-2 font-mono text-[10px] text-sage/50">
                    Dev: dodajte VITE_CONCIERGE_FORM_URL u .env (npr. Formspree, Zapier, vlastiti endpoint).
                  </span>
                ) : null}
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <footer className="mt-20 flex flex-col items-center gap-6 border-t border-pearl/10 pt-16 text-center sm:mt-24 sm:pt-24">
          <div className="flex max-w-xl flex-col items-center gap-y-4 text-[11px] uppercase tracking-[0.22em] text-pearl/70 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-3 sm:text-xs sm:tracking-[0.28em] md:gap-x-12 md:tracking-[0.3em]">
            <span className="inline-flex min-h-[2.75rem] items-center justify-center px-2 text-center sm:min-h-0">
              {CONTACT.city}, {CONTACT.country}
            </span>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex min-h-11 items-center rounded-sm px-4 py-2 transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 md:min-h-10 md:px-5"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex min-h-11 items-center rounded-sm px-4 py-2 transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold/80 md:min-h-10 md:px-5"
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="copper-pattern w-full h-8 opacity-10" aria-hidden />
        </footer>
      </div>
    </section>
  );
}
