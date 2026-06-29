import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Loader2, ArrowUpRight } from 'lucide-react';
import Seo from '../../components/UI/Seo';

/* ─── Data ─────────────────────────────────────────────────── */
const CONTACTS = [
  { icon: Mail,    label: 'Email',  value: 'Zeradon@gmail.com',   href: 'mailto:Z-TECH@gmail.com' },
  { icon: Phone,   label: 'Phone',  value: '+237 654 45 89 96',  href: 'tel:+237654458996' },
  { icon: MapPin,  label: 'Office', value: 'Douala, Cameroun',   href: '#' },
];

const SERVICES = [
  'Mobile App Development',
  'Web Application',
  'UI/UX Design',
  'WordPress Solution',
  'Technical Advisory',
];

type Status = 'idle' | 'loading' | 'success';

const inputClass =
  'w-full px-4 py-3 bg-secondary/40 border border-border/40 rounded-xl text-sm ' +
  'placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-secondary/60 ' +
  'outline-none transition-all duration-200';

/* ─── Page ─────────────────────────────────────────────────── */
const Contact: React.FC = () => {
  const [status, setStatus] = React.useState<Status>('idle');
  const [focused, setFocused] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Z-TECH to discuss your next big digital project."
        url="/contact"
      />

      <section className="relative py-24 md:py-36 px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-3xl -translate-y-1/2" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left column ── */}
            <div className="space-y-10">
              <div className="space-y-5">
                <motion.span {...fadeUp(0)}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                             text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Get in touch
                </motion.span>

                <motion.h1 {...fadeUp(0.07)} className="font-heading leading-tight">
                  Let's build something{' '}
                  <span className="relative text-primary">
                    great
                    <motion.span
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary/40 origin-left block"
                    />
                  </span>
                </motion.h1>

                <motion.p {...fadeUp(0.12)} className="text-lg text-muted-foreground leading-relaxed">
                  Have a question or a project idea? We'd love to hear from you.
                  Our team typically responds within 4 hours.
                </motion.p>
              </div>

              {/* Contact items */}
              <motion.div {...fadeUp(0.16)} className="space-y-4">
                {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-border/30
                               hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="p-3 bg-primary/10 rounded-xl flex-shrink-0"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
                      <div className="font-semibold text-sm mt-0.5 group-hover:text-primary transition-colors duration-200">{value}</div>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground/40 group-hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </motion.div>

              {/* Advisory quote */}
              <motion.div {...fadeUp(0.2)}
                className="relative p-6 glass rounded-2xl border border-primary/10 overflow-hidden"
              >
                <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-3">
                  <MessageSquare size={16} />
                  Professional Advisory
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "The fastest way to build your vision is to start with the right technical foundation.
                  We provide advice even if you don't hire us."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-muted-foreground">Available for new projects</span>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 md:p-10 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      className="p-4 bg-green-500/10 rounded-full"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-heading font-semibold">Message sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Thanks for reaching out. We'll get back to you within 4 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-5 relative"
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-heading font-semibold">Send a message</h2>
                      <p className="text-sm text-muted-foreground mt-1">Fill in the form and we'll be in touch soon.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'John Doe' },
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                      ].map(({ id, label, type, placeholder }) => (
                        <div key={id} className="space-y-1.5">
                          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {label}
                          </label>
                          <div className="relative">
                            <input
                              id={id} type={type} placeholder={placeholder} required
                              onFocus={() => setFocused(id)}
                              onBlur={() => setFocused(null)}
                              className={inputClass}
                            />
                            {focused === id && (
                              <motion.span
                                layoutId="input-focus"
                                className="absolute inset-0 rounded-xl border border-primary/50 pointer-events-none"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="service" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Service of Interest
                      </label>
                      <select id="service" className={inputClass}>
                        {SERVICES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message" rows={5} placeholder="Tell us about your vision..." required
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          className={`${inputClass} resize-none`}
                        />
                        {focused === 'message' && (
                          <motion.span
                            layoutId="input-focus"
                            className="absolute inset-0 rounded-xl border border-primary/50 pointer-events-none"
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          />
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl
                                 flex items-center justify-center gap-2 text-sm
                                 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35
                                 transition-shadow duration-300 disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={17} className="animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          Send Message <Send size={15} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;