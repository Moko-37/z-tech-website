import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from 'lucide-react';

const GithubIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const TwitterIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const LinkedinIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const DATA = {
  services: ['Mobile App Creation', 'Web App Creation', 'UI/UX Design', 'WordPress Solutions'],
  company: [{ label: 'About Us', path: '/about' }, { label: 'Contact', path: '/contact' }, { label: 'Privacy Policy', path: '#' }, { label: 'Terms of Service', path: '#' }],
  socials: [{ Icon: TwitterIcon, href: '#', label: 'Twitter' }, { Icon: GithubIcon, href: '#', label: 'GitHub' }, { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' }],
  contacts: [{ Icon: Mail, text: 'Z-TECH@gmail.com', href: 'mailto:Z-TECH@gmail.com' }, { Icon: Phone, text: '+237 654 45 89 96', href: 'tel:+237654458996' }, { Icon: MapPin, text: 'Douala, Cameroun', href: '#' }],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const FLink: React.FC<{ label: string; to: string }> = ({ label, to }) => (
  <Link to={to}>
    <motion.span className="group flex items-center gap-1 text-sm text-muted-foreground w-fit" whileHover="hovered">
      <motion.span variants={{ hovered: { x: 3 } }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="group-hover:text-primary transition-colors duration-200">{label}</motion.span>
      <motion.span variants={{ hovered: { opacity: 1, x: 0, y: 0 } }} initial={{ opacity: 0, x: -4, y: 4 }} transition={{ duration: 0.15 }} className="text-primary"><ArrowUpRight size={12} /></motion.span>
    </motion.span>
  </Link>
);

const ColHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="font-heading font-semibold text-sm tracking-widest uppercase text-foreground mb-6">{children}</h4>
);

const Footer: React.FC = () => (
  <footer className="relative mt-auto border-t border-border/30 bg-secondary/20 pt-20 pb-8 overflow-hidden">
    <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

    <div className="relative max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        {/* Brand */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <motion.div whileHover={{ scale: 1.1, rotate: 8 }} transition={{ type: 'spring', stiffness: 500, damping: 16 }} className="p-2 bg-primary/15 rounded-xl">
              <Cpu className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight font-heading">Z-<span className="text-primary">TECH</span></span>
            </div>
          </Link>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Leading the digital frontier with cutting-edge mobile and web solutions. We turn your vision into high-performance reality.
          </p>

          <div className="flex gap-2">
            {DATA.socials.map(({ Icon, href, label }) => (
              <motion.a key={label} href={href} aria-label={label} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.93 }} transition={{ type: 'spring', stiffness: 450, damping: 18 }}
                className="p-2.5 rounded-xl border border-border/50 bg-background/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200">
                <Icon size={17} />
              </motion.a>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="w-fit">
            <Link to="/contact" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-shadow duration-300">
              Start a project <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Services */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2">
          <ColHead>Services</ColHead>
          <ul className="space-y-3">{DATA.services.map((s) => <li key={s}><FLink label={s} to="/services" /></li>)}</ul>
        </motion.div>

        {/* Company */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2">
          <ColHead>Company</ColHead>
          <ul className="space-y-3">{DATA.company.map(({ label, path }) => <li key={label}><FLink label={label} to={path} /></li>)}</ul>
        </motion.div>

        {/* Contact */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-4">
          <ColHead>Contact Us</ColHead>
          <ul className="space-y-4">
            {DATA.contacts.map(({ Icon, text, href }) => (
              <li key={text}>
                <a href={href} className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <span className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200"><Icon size={14} /></span>
                  <span className="group-hover:text-primary transition-colors duration-200">{text}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for new projects
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Z-TECH Solutions. All rights reserved.</p>
        <p className="text-xs text-muted-foreground hidden md:block">Built with precision for the future.</p>
        <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors duration-200 group" aria-label="Back to top">
          Back to top
          <span className="p-1 rounded-md border border-border/50 group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors duration-200"><ArrowUp size={12} /></span>
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;