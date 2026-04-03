import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { SectionLabel, GoldRule } from '@/components/ui/Section';

const sectorData = {
  india: {
    descriptor: 'Long-term capital partnering with India\'s essential B2B industries — built around recurring revenue, operational depth, and enduring competitive advantages.',
    columns: [
      {
        category: 'Industrials',
        items: [
          { name: 'Process & Flow Control', desc: 'Valves, pumps, filtration, and fluid handling across industrial verticals' },
          { name: 'Value-Added Distribution', desc: 'Specialized distribution with technical expertise and aftermarket services' },
          { name: 'Industrial Services', desc: 'Maintenance, turnaround, and mission-critical operational support' },
          { name: 'Packaging', desc: 'Industrial and specialty packaging for regulated and essential sectors' },
        ],
      },
      {
        category: 'Business & Industrial Services',
        items: [
          { name: 'Facility & Support Services', desc: 'Integrated facility management, security, and support infrastructure' },
          { name: 'Testing & Certification', desc: 'Quality assurance, compliance testing, and certification services' },
          { name: 'Infrastructure Services', desc: 'Civil, electrical, and telecom infrastructure build and maintenance' },
          { name: 'Industrial Technology', desc: 'Automation, instrumentation, and digital solutions for industrial operations' },
          { name: 'Aerospace & Defense', desc: 'Component manufacturing, MRO, and defence supply chain services' },
        ],
      },
    ],
  },
  us: {
    descriptor: 'Essential B2B services characterized by recurring revenue, regulatory requirements, and critical infrastructure dependency across the United States.',
    columns: [
      {
        category: 'Infrastructure & Industrial',
        items: [
          { name: 'Electrical & Infrastructure', desc: 'High-voltage services, grid modernization, and critical infrastructure maintenance' },
          { name: 'Industrial Distribution', desc: 'Specialized parts, equipment, and supply chain solutions' },
          { name: 'Engineering & Technical', desc: 'Inspection, testing, calibration, and specialized engineering solutions' },
        ],
      },
      {
        category: 'Services & Compliance',
        items: [
          { name: 'Facility Services', desc: 'Building maintenance, security, and specialised facility management' },
          { name: 'Compliance & Safety', desc: 'Regulatory compliance, audit, and risk management services' },
          { name: 'Environmental Services', desc: 'Compliance-driven remediation, waste management, and sustainability services' },
        ],
      },
    ],
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const SectorItem = ({ name, desc, index }: { name: string; desc: string; index: number }) => (
  <motion.li
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={itemVariants}
    className="flex items-start gap-4 group cursor-default py-3 md:py-4 border-b border-border/30 last:border-b-0"
  >
    <span className="flex-shrink-0 mt-[10px] w-2 h-2 rotate-45 bg-gold/70 group-hover:bg-gold transition-colors duration-300" />
    <div className="flex-1">
      <span className="font-serif text-[1.1rem] md:text-[1.25rem] lg:text-[1.35rem] leading-[1.3] text-foreground block group-hover:text-gold/90 transition-colors duration-300">
        {name}
      </span>
      <span className="font-sans text-[13px] md:text-[14px] lg:text-[15px] leading-[1.7] text-muted-foreground mt-1 block">
        {desc}
      </span>
    </div>
  </motion.li>
);

const CategoryColumn = ({ category, items, startIndex }: { category: string; items: { name: string; desc: string }[]; startIndex: number }) => (
  <div>
    <motion.h3
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="font-serif text-[1.3rem] md:text-[1.5rem] lg:text-[1.65rem] leading-[1.2] text-foreground mb-2 md:mb-3"
    >
      {category}
    </motion.h3>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 48 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-px bg-gold/30 mb-4 md:mb-6"
    />
    <ul className="list-none p-0 m-0">
      {items.map((item, i) => (
        <SectorItem key={item.name} name={item.name} desc={item.desc} index={startIndex + i} />
      ))}
    </ul>
  </div>
);

const SectorShowcase = ({ region }: { region: 'us' | 'india' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const data = sectorData[region];

  return (
    <section
      className="relative min-h-screen w-full px-5 md:px-10 lg:px-16 py-14 md:py-14 lg:py-14"
      style={{ backgroundColor: isDark ? '#0B131E' : 'hsl(var(--background))' }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'hsl(var(--gold))' : 'hsl(var(--foreground))'} 0.5px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-[1080px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel>Focus Areas</SectionLabel>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-foreground leading-[1.1] tracking-[-0.02em] max-w-[600px]">
            Sectors We Look At
          </h2>
          <GoldRule className="mt-3 mb-4" />
          <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-muted-foreground max-w-[640px] mb-10 md:mb-14">
            {data.descriptor}
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-0">
          <div className="md:pr-8 lg:pr-12">
            <CategoryColumn
              category={data.columns[0].category}
              items={data.columns[0].items}
              startIndex={0}
            />
          </div>

          {/* Gold vertical divider */}
          <div className="hidden md:block">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-px bg-gold/20 mx-auto"
            />
          </div>

          <div className="md:pl-8 lg:pl-12">
            <CategoryColumn
              category={data.columns[1].category}
              items={data.columns[1].items}
              startIndex={data.columns[0].items.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorShowcase;
