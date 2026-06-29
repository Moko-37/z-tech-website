import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Sun, Moon, Menu, X, Cpu, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

/* ─── Magnetic Button ─────────────────────────────────────────── */
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}> = ({ children, className = '', onClick, 'aria-label': ariaLabel }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 20 });
  const sy = useSpring(y, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* ─── Nav Link with spotlight hover ──────────────────────────── */
const NavLink: React.FC<{ link: { name: string; path: string }; isActive: boolean }> = ({
  link,
  isActive,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      to={link.path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 flex items-center"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            layoutId="nav-hover-bg"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 rounded-lg bg-primary/10"
          />
        )}
      </AnimatePresence>

      <span
        className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-150 ${
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {link.name}
      </span>

      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
};

/* ─── Main Navbar ─────────────────────────────────────────────── */
const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(y / total, 1) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const staggerItem = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-primary origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-[--header-height] ${
          scrolled
            ? 'glass border-b border-white/10 shadow-xl shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 8 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 500, damping: 16 }}
              className="relative p-2 bg-primary/15 rounded-xl overflow-hidden"
            >
              {/* Shimmer on hover */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                whileHover={{ x: '200%', opacity: 0.4 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
              />
              <Cpu className="w-6 h-6 text-primary relative z-10" />
            </motion.div>

            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight font-heading">
                Z-<span className="text-primary">TECH</span>
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                link={link}
                isActive={location.pathname === link.path}
              />
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle — magnetic */}
            <MagneticButton
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative p-2.5 rounded-full bg-secondary/80 hover:bg-secondary transition-colors duration-200 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, y: 8, rotate: -30 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -8, rotate: 30 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex text-foreground"
                >
                  {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
                </motion.span>
              </AnimatePresence>
            </MagneticButton>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 18 }}
            >
              <Link
                to="/contact"
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground
                           text-sm font-semibold shadow-md shadow-primary/25
                           hover:shadow-lg hover:shadow-primary/35 transition-shadow duration-300"
              >
                Get Started
                <motion.span
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                >
                  <ArrowUpRight size={15} />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileTap={{ scale: 0.88 }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden glass border-t border-white/10"
            >
              <div className="px-5 py-6 flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      custom={i}
                      variants={staggerItem}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors duration-150 ${
                          isActive
                            ? 'bg-primary/15 text-primary'
                            : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="w-2 h-2 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  custom={navLinks.length}
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-2 pt-4 border-t border-border/20"
                >
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                               bg-primary text-primary-foreground font-semibold text-sm
                               shadow-lg shadow-primary/25 active:scale-95 transition-transform"
                  >
                    Get Started
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;