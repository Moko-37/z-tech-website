import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone, Globe, Palette, Layout, ShieldCheck,
  ArrowUpRight, CheckCircle2, Zap, Clock, Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/UI/Seo';
import { useLanguage } from '../../theme/LanguageContext';

/* ─── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'mobile', icon: Smartphone, tag: 'Popular',
    title: 'Mobile App Creation',
    description: 'Native and cross-platform mobile applications with buttery-smooth performance and exceptional user engagement. Specialists in React Native and Flutter.',
    features: ['Custom UI/UX', 'Cloud Sync', 'Push Notifications', 'App Store Optimization'],
    stat: { value: '30+', label: 'Apps shipped' },
  },
  {
    id: 'web', icon: Globe, tag: 'Scalable',
    title: 'Web App Creation',
    description: 'Robust, scalable, and secure web applications tailored to your business logic using Next.js, React, and Node.js with enterprise-grade architecture.',
    features: ['Real-time Data', 'Progressive Web Apps', 'Admin Dashboards', 'API Integration'],
    stat: { value: '99%', label: 'Uptime SLA' },
  },
  {
    id: 'ui-ux', icon: Palette, tag: 'Creative',
    title: 'UI/UX Design',
    description: 'Design is more than looks — it\'s how it works. We craft intuitive user journeys that minimize friction, maximize conversion, and delight at every step.',
    features: ['Wireframing', 'Prototyping', 'User Research', 'Visual Branding'],
    stat: { value: '4.9★', label: 'Design rating' },
  },
  {
    id: 'wordpress', icon: Layout, tag: 'Fast delivery',
    title: 'WordPress Creation',
    description: 'High-end, performance-focused WordPress sites. From custom themes to complex e-commerce integrations — delivered fast, optimized for search.',
    features: ['Custom Themes', 'Speed Optimization', 'SEO Migration', 'Security Hardening'],
    stat: { value: '<48h', label: 'First delivery' },
  },
];

/* ─── Service Card ──────────────────────────────────────────── */
const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group glass-card p-8 flex flex-col relative overflow-hidden cursor-pointer"
    >
      {/* Spotlight glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl"
      />

      {/* Bottom border reveal */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-7">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="p-3.5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300"
          >
            <service.icon className="w-7 h-7 text-primary" />
          </motion.div>
          <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1
                           rounded-full border border-primary/20 text-primary/70 bg-primary/5">
            {service.tag}
          </span>
        </div>
        <span className="font-mono text-4xl font-bold text-muted-foreground/10 select-none">
          {`0${index + 1}`}
        </span>
      </div>

      {/* Title & desc */}
      <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-7 flex-1">
        {service.description}
      </p>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-7">
        {service.features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-xs text-foreground/70">
            <ShieldCheck size={13} className="text-primary flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>

      {/* Footer: stat + CTA */}
      <div className="flex items-center justify-between pt-5 border-t border-border/20">
        <div>
          <div className="text-lg font-bold font-heading text-primary leading-none">{service.stat.value}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{service.stat.label}</div>
        </div>
        <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
            backgroundColor: hovered ? 'hsl(var(--primary))' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center"
        >
          <motion.div animate={{ color: hovered ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))' }} transition={{ duration: 0.2 }}>
            <ArrowUpRight size={16} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────── */
const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const isFrench = language === 'fr';

  const servicesData = [
    {
      id: 'mobile',
      icon: Smartphone,
      tag: isFrench ? 'Populaire' : 'Popular',
      title: isFrench ? 'Création d’applications mobiles' : 'Mobile App Creation',
      description: isFrench
        ? 'Applications mobiles natives et multiplateformes avec une performance fluide et un niveau d’engagement exceptionnel.'
        : 'Native and cross-platform mobile applications with buttery-smooth performance and exceptional user engagement. Specialists in React Native and Flutter.',
      features: isFrench
        ? ['UI/UX personnalisée', 'Synchronisation cloud', 'Notifications push', 'Optimisation App Store']
        : ['Custom UI/UX', 'Cloud Sync', 'Push Notifications', 'App Store Optimization'],
      stat: { value: '30+', label: isFrench ? 'Apps livrées' : 'Apps shipped' },
    },
    {
      id: 'web',
      icon: Globe,
      tag: isFrench ? 'Évolutif' : 'Scalable',
      title: isFrench ? 'Création d’applications web' : 'Web App Creation',
      description: isFrench
        ? 'Applications web robustes, sécurisées et évolutives adaptées à votre logique métier grâce à Next.js, React et Node.js.'
        : 'Robust, scalable, and secure web applications tailored to your business logic using Next.js, React, and Node.js with enterprise-grade architecture.',
      features: isFrench
        ? ['Données temps réel', 'Progressive Web Apps', 'Tableaux de bord', 'Intégration API']
        : ['Real-time Data', 'Progressive Web Apps', 'Admin Dashboards', 'API Integration'],
      stat: { value: '99%', label: isFrench ? 'SLA de disponibilité' : 'Uptime SLA' },
    },
    {
      id: 'ui-ux',
      icon: Palette,
      tag: isFrench ? 'Créatif' : 'Creative',
      title: isFrench ? 'Design UI/UX' : 'UI/UX Design',
      description: isFrench
        ? 'Le design est plus que l’apparence — c’est la façon dont cela fonctionne. Nous créons des parcours intuitifs pour réduire les frictions et augmenter la conversion.'
        : 'Design is more than looks — it\'s how it works. We craft intuitive user journeys that minimize friction, maximize conversion, and delight at every step.',
      features: isFrench
        ? ['Wireframing', 'Prototypage', 'Recherche utilisateur', 'Branding visuel']
        : ['Wireframing', 'Prototyping', 'User Research', 'Visual Branding'],
      stat: { value: '4.9★', label: isFrench ? 'Note design' : 'Design rating' },
    },
    {
      id: 'wordpress',
      icon: Layout,
      tag: isFrench ? 'Livraison rapide' : 'Fast delivery',
      title: isFrench ? 'Création WordPress' : 'WordPress Creation',
      description: isFrench
        ? 'Sites WordPress haut de gamme et performants. Des thèmes sur mesure aux intégrations e-commerce complexes — livrés rapidement et optimisés pour le SEO.'
        : 'High-end, performance-focused WordPress sites. From custom themes to complex e-commerce integrations — delivered fast, optimized for search.',
      features: isFrench
        ? ['Thèmes sur mesure', 'Optimisation vitesse', 'Migration SEO', 'Sécurisation']
        : ['Custom Themes', 'Speed Optimization', 'SEO Migration', 'Security Hardening'],
      stat: { value: '<48h', label: isFrench ? 'Première livraison' : 'First delivery' },
    },
  ];

  const processData = [
    { icon: Star, step: '01', title: isFrench ? 'Découverte' : 'Discovery', desc: isFrench ? 'Nous explorons votre vision, vos objectifs et vos contraintes.' : 'We dive deep into your vision, goals, and constraints.' },
    { icon: Palette, step: '02', title: isFrench ? 'Design' : 'Design', desc: isFrench ? 'Wireframes et prototypes conçus pour vos utilisateurs.' : 'Wireframes and prototypes crafted for your users.' },
    { icon: Zap, step: '03', title: isFrench ? 'Développement' : 'Build', desc: isFrench ? 'Développement propre et rapide avec suivi quotidien.' : 'Fast, clean development with daily progress updates.' },
    { icon: CheckCircle2, step: '04', title: isFrench ? 'Lancement' : 'Launch', desc: isFrench ? 'Déploiement, tests et support après lancement inclus.' : 'Deployment, testing, and post-launch support included.' },
  ];

  const techData = [
    { name: 'React Native', category: isFrench ? 'Mobile' : 'Mobile' },
    { name: 'Flutter', category: isFrench ? 'Mobile' : 'Mobile' },
    { name: 'Next.js', category: isFrench ? 'Web' : 'Web' },
    { name: 'Node.js', category: isFrench ? 'Backend' : 'Backend' },
    { name: 'Laravel', category: isFrench ? 'Backend' : 'Backend' },
    { name: 'TypeScript', category: isFrench ? 'Langage' : 'Language' },
    { name: 'Tailwind CSS', category: isFrench ? 'Style' : 'Styling' },
    { name: 'Figma', category: isFrench ? 'Design' : 'Design' },
    { name: 'MySQL', category: isFrench ? 'Base de données' : 'Database' },
    { name: 'Supabase', category: isFrench ? 'Base de données' : 'Database' },
  ];

  return (
  <>
    <Seo
      title="Our Services"
      description="Explore the comprehensive digital services offered by Z-TECH, from mobile apps to web platforms."
      url="/services"
    />

    {/* ══ Hero ══ */}
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                       text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t('servicesHeroEyebrow')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading leading-tight"
          >
            {t('servicesHeroTitle').split('Services')[0]}{' '}
            <span className="relative text-primary">
              {isFrench ? 'services' : 'Services'}
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary/40 origin-left block"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            {t('servicesHeroDesc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex items-center gap-6 pt-2"
          >
            {[
              { icon: Clock, text: t('servicesFastTurnaround') },
              { icon: ShieldCheck, text: t('servicesQuality') },
              { icon: Star, text: t('servicesRating') },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={15} className="text-primary" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
        </div>
      </div>
    </section>

    {/* ══ Process ══ */}
    <section className="py-24 px-6 bg-secondary/10 border-y border-border/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {t('servicesProcessEyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading"
          >
            {t('servicesProcessTitle')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border/40 z-0" />

          {processData.map(({ icon: Icon, step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative z-10 flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-20 h-20 rounded-2xl bg-background border border-border/50 glass flex items-center justify-center
                             group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors duration-300"
                >
                  <Icon size={28} className="text-primary" />
                </motion.div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground
                                 text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-1 group-hover:text-primary transition-colors duration-200">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ Tech Stack ══ */}
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {t('servicesTechEyebrow')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading"
          >
            {t('servicesTechTitle')}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techData.map(({ name, category }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="group flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-border/40
                         hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200 cursor-default"
            >
              <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">{name}</span>
              <span className="text-[10px] text-muted-foreground/60 font-mono">{category}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">{t('servicesConsultationDesc')}</p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="inline-block">
            <Link to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground
                         rounded-xl font-semibold text-sm shadow-lg shadow-primary/25
                         hover:shadow-xl hover:shadow-primary/35 transition-shadow duration-300">
              {t('servicesConsultationCta')}
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
  );
};

export default Services;