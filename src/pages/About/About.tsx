import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, ArrowUpRight, Zap, Shield } from 'lucide-react';
import Seo from '../../components/UI/Seo';
import { useLanguage } from '../../theme/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.6, 
    delay, 
    ease: [0.22, 1, 0.36, 1] as const // 👈 Bloque le type pour TypeScript
  },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.7, 
    delay, 
    ease: [0.22, 1, 0.36, 1] as const // 👈 Bloque le type pour TypeScript
  },
});

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const isFrench = language === 'fr';

  const stats = [
    { value: '50+', label: isFrench ? 'Lancements réussis' : 'Successful Launches' },
    { value: '98%', label: isFrench ? 'Satisfaction client' : 'Client Satisfaction' },
    { value: '3+', label: isFrench ? 'Années d\'expérience' : 'Years Experience' },
    { value: '24h', label: isFrench ? 'Réponse support' : 'Support Response' },
  ];

  const values = [
    { icon: Target, title: isFrench ? 'Précision' : 'Precision', desc: isFrench ? 'Chaque ligne de code est écrite avec intention et performance.' : 'Every line of code is written with intent and performance in mind.' },
    { icon: Heart, title: isFrench ? 'Empathie' : 'Empathy', desc: isFrench ? 'Nous construisons pour les utilisateurs, pas seulement pour les exigences.' : 'We build for users, not just for requirements.' },
    { icon: Eye, title: isFrench ? 'Transparence' : 'Transparency', desc: isFrench ? 'L\'honnêteté est notre base pour chaque interaction et projet.' : 'Honesty is our baseline for every interaction and project milestone.' },
    { icon: Zap, title: isFrench ? 'Vitesse' : 'Speed', desc: isFrench ? 'Livraison rapide sans compromettre qualité ni évolutivité.' : 'Fast delivery without compromising on quality or scalability.' },
    { icon: Shield, title: isFrench ? 'Fiabilité' : 'Reliability', desc: isFrench ? 'Des architectures solides pour des usages réels.' : 'Rock-solid architectures built to handle real-world demands.' },
    { icon: Users, title: isFrench ? 'Partenariat' : 'Partnership', desc: isFrench ? 'Nous traitons chaque fondateur comme un partenaire à long terme.' : 'We treat every founder as a long-term partner, not a client ticket.' },
  ];

  return (
  <>
    <Seo
      title="About Us"
      description="Learn about the team behind Z-TECH and our mission to empower startups through technology."
      url="/about"
    />

    {/* ── Hero ── */}
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                               text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t('aboutHeroEyebrow')}
              </span>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} className="font-heading mb-6 leading-tight">
              {isFrench ? 'Redéfinir l\'' : 'Redefining the'}{' '}
              <span className="relative text-primary">
                {isFrench ? 'startup' : 'Startup'}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary/40 origin-left block"
                />
              </span>{' '}
              {isFrench ? 'écosystème' : 'Ecosystem'}
            </motion.h1>

            <motion.p {...fadeUp(0.14)} className="text-lg text-muted-foreground mb-4 leading-relaxed">
              {t('aboutHeroP1')}
            </motion.p>
            <motion.p {...fadeUp(0.18)} className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {t('aboutHeroP2')}
            </motion.p>

            <motion.div {...fadeUp(0.22)}>
              <a href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground
                           text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-shadow duration-300">
                {t('aboutHeroCta')}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div {...fadeIn(0.2)} className="relative">
            <div className="aspect-square glass rounded-3xl border border-primary/15 flex items-center justify-center overflow-hidden">
              {/* Grid texture */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

              <motion.div
                animate={{ rotate: [0, 5, -3, 0], scale: [1, 1.05, 0.97, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-primary/15"
              >
                <Users size={180} />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 right-6 glass px-3 py-2 rounded-xl border border-primary/20 text-xs font-semibold text-primary"
              >
                🇨🇲 Based in Douala
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-6 left-6 glass px-3 py-2 rounded-xl border border-primary/20 text-xs font-semibold"
              >
                <span className="text-green-500">●</span> Available now
              </motion.div>
            </div>

            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/15 blur-3xl animate-pulse pointer-events-none" />
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 border border-border/30 rounded-2xl overflow-hidden"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="glass-card px-8 py-6 text-center space-y-1">
              <div className="text-3xl font-bold font-heading text-primary">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── Values ── */}
    <section className="py-24 px-6 bg-secondary/10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t('aboutValuesEyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading"
          >
            {t('aboutValuesTitle')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group glass-card p-7 space-y-4 relative overflow-hidden"
            >
              {/* Corner glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 bg-primary/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="p-3 bg-primary/10 rounded-xl w-fit"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
                <span className="text-[10px] font-mono text-muted-foreground/50 mt-1">0{i + 1}</span>
              </div>

              <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>

              {/* Bottom border reveal */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default About;