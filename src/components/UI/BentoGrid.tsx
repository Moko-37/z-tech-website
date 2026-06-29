import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BentoItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
  tag?: string;
}

export const BentoGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[20rem]">
    {children}
  </div>
);

export const BentoItem: React.FC<BentoItemProps> = ({
  title, description, icon: Icon, className, delay = 0, tag,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative glass-card p-7 flex flex-col justify-between overflow-hidden cursor-pointer ${className}`}
    >
      {/* Animated spotlight on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
      />

      {/* Top: icon + tag */}
      <div>
        <div className="flex items-start justify-between mb-6">
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="p-3 bg-primary/10 rounded-xl"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>

          {tag && (
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1
                             rounded-full border border-primary/20 text-primary/70 bg-primary/5">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-lg font-heading font-semibold mb-2.5 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom: animated CTA arrow */}
      <div className="flex items-center justify-between mt-6">
        {/* Subtle progress line */}
        <div className="flex-1 mr-4 h-px bg-border/50 relative overflow-hidden">
          <motion.div
            animate={{ x: hovered ? '0%' : '-100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 bg-primary"
          />
        </div>

        <motion.div
          animate={{ scale: hovered ? 1.15 : 1, backgroundColor: hovered ? 'hsl(var(--primary))' : 'transparent' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0"
        >
          <motion.div
            animate={{ rotate: hovered ? 0 : -45, color: hovered ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))' }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom border glow on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
      />
    </motion.div>
  );
};