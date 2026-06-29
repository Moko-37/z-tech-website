import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Smartphone, Globe, Layout, Palette, Zap, ArrowRight, ArrowUpRight, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../../components/UI/Seo';
import { BentoGrid, BentoItem } from '../../components/UI/BentoGrid';

/* ─── Data ─────────────────────────────────────────────────── */
const LOGOS = ['Stripe', 'Vercel', 'Figma', 'Linear', 'Notion', 'Supabase'];

const TESTIMONIALS = [
  { name: 'Awa N.', role: 'CEO @ MoovStartup', text: 'Z-TECH delivered our MVP in record time. The quality exceeded all expectations.' },
  { name: 'Carlos M.', role: 'Founder @ FinTrack', text: 'Professional, fast, and genuinely passionate about what they build.' },
  { name: 'Fatou D.', role: 'CPO @ EdTech Africa', text: 'The best technical partner we\'ve worked with. Highly recommended.' },
];

const STATS = [
  { icon: Users, value: '50+', label: 'Happy clients' },
  { icon: Star, value: '4.9', label: 'Average rating' },
  { icon: TrendingUp, value: '98%', label: 'Satisfaction rate' },
];

/* ─── 3D Tilt Card ──────────────────────────────────────────── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = React.useState(0);
  const [rotY, setRotY] = React.useState(0);
  const [shine, setShine] = React.useState({ x: 50, y: 50 });

  const springConfig = { stiffness: 200, damping: 20 };
  const rx = useSpring(rotX, springConfig);
  const ry = useSpring(rotY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotY((px - 0.5) * 14);
    setRotX((0.5 - py) * 14);
    setShine({ x: px * 100, y: py * 100 });
  };

  const reset = () => { setRotX(0); setRotY(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`relative ${className}`}
    >
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)` }}
      />
      {children}
    </motion.div>
  );
};

/* ─── Floating orb ──────────────────────────────────────────── */
const Orb: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
  />
);

/* ─── Marquee ───────────────────────────────────────────────── */
const Marquee: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="overflow-hidden w-full">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      className="flex gap-12 w-max"
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-xs font-bold tracking-widest uppercase text-muted-foreground/40 whitespace-nowrap">
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─── Page ──────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <Seo
        title="Elevating Digital Innovation"
        description="Z-TECH is a premier startup providing Mobile, Web, and UI/UX solutions for the modern era."
        url="/"
      />

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

        {/* Background orbs */}
        <Orb className="w-[600px] h-[600px] bg-primary/15 -top-40 left-1/2 -translate-x-1/2" delay={0} />
        <Orb className="w-[300px] h-[300px] bg-purple-500/10 top-1/3 -left-20" delay={1.5} />
        <Orb className="w-[200px] h-[200px] bg-primary/10 bottom-20 right-10" delay={3} />

        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/25
                       text-xs font-semibold tracking-widest uppercase text-primary mb-8"
          >
            <motion.span animate={{ rotate: [0, 15, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Zap size={13} />
            </motion.span>
            Future-Ready Technology
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading mb-6 leading-[1.1]"
          >
            Engineering the{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%] animate-[shimmer_3s_linear_infinite]">
                Next Generation
              </span>
            </span>
            <br />of Digital Experiences
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            We bridge the gap between complex technology and intuitive design.
            From mobile apps to enterprise web solutions — built for scale and performance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/contact"
                className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm
                           shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow duration-300">
                Start a Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link to="/services"
                className="flex items-center gap-2 px-7 py-3.5 glass rounded-xl font-semibold text-sm border border-white/10
                           hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-border/20"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold font-heading text-primary leading-none">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
        </motion.div>
      </section>

      {/* ══════════════ LOGOS MARQUEE ══════════════ */}
      <section className="py-12 border-y border-border/20 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
            Trusted tools & partners
          </p>
        </div>
        <Marquee items={LOGOS} />
      </section>

      {/* ══════════════ SERVICES BENTO ══════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> What we do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="font-heading"
            >
              Core Capabilities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Comprehensive solutions tailored to your business needs, powered by the latest tech stacks.
            </motion.p>
          </div>

          <BentoGrid>
            <BentoItem title="Mobile Development" description="High-performance iOS and Android apps built with React Native and Flutter for seamless user experiences." icon={Smartphone} className="md:col-span-2" tag="Popular" />
            <BentoItem title="UI/UX Design" description="User-centric interfaces that blend aesthetic beauty with functional clarity." icon={Palette} delay={0.1} tag="Creative" />
            <BentoItem title="Web Solutions" description="Scalable, SEO-optimized web applications using Next.js and high-speed cloud infrastructure." icon={Globe} delay={0.2} />
            <BentoItem title="WordPress Mastery" description="Custom WordPress development for power-users who need control and flexibility." icon={Layout} className="md:col-span-2" delay={0.3} />
          </BentoGrid>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-24 px-6 bg-secondary/10 border-y border-border/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Client voices
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="font-heading"
            >
              What our clients say
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="group h-full">
                  <div className="glass-card p-7 h-full flex flex-col gap-5 rounded-3xl relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 bg-primary/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">"{text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-none">{name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="group">
              <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden rounded-3xl">
                <Orb className="w-64 h-64 bg-primary/15 -bottom-10 -right-10" delay={0} />
                <Orb className="w-48 h-48 bg-purple-500/10 -top-10 -left-10" delay={2} />

                <div className="relative z-10 space-y-6">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Limited spots available
                  </span>
                  <h2 className="font-heading text-4xl md:text-5xl leading-tight">
                    Ready to launch<br />your vision?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                    Join 50+ startups that have scaled their digital presence with Z-TECH.
                    Let's build something extraordinary together.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                      <Link to="/contact"
                        className="group/btn flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold
                                   shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-shadow duration-300">
                        Get a Free Consultation
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                      <Link to="/about"
                        className="flex items-center gap-2 px-8 py-4 glass rounded-xl font-semibold border border-white/10
                                   hover:border-primary/30 transition-all duration-200">
                        Learn About Us
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;