import { useRegion } from '@/contexts/RegionContext';

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  education?: string;
}

const usTeam: TeamMember[] = [
  {
    name: 'Harin Gupta',
    role: 'Co-Founder',
    bio: [
      'More than a decade of experience investing in and operating companies in the business and consumer sectors.',
      'Invested through the Business Services Group at Warburg Pincus, a global private equity firm with $85bn+ AUM.',
      'Served on the Board of Directors for RMS Energy, a provider of services for high-voltage electrical equipment.',
      'Successfully helped launch and scale Honest Hospitality Group from ideation to 100+ locations globally.',
      'Began his finance career at leading investment banks including JP Morgan, Evercore, and Deutsche Bank.',
    ],
  },
  {
    name: 'Benson Zhang',
    role: 'Co-Founder',
    bio: [
      'Over a decade of experience in finance and private equity investing across technology and business services sectors.',
      'Most recently invested through BlackRock\'s flagship direct private equity group.',
      'At HGGC, led the investments in IDERA and RPX where he served as a board observer.',
      'Began his career at Credit Suisse in the Technology Investment Banking Group, closing 7 deals totaling $30 billion in deal value.',
    ],
  },
];

const indiaTeam: TeamMember[] = [
  {
    name: 'Vaibhav Sharma',
    role: 'Partner (India)',
    bio: [
      '3x Founder, including Cleen.pet and Cropwise, with extensive experience operating within family offices and early-stage funds like Swishin Ventures.',
      'Previous experience includes strategic roles at NITI Aayog and the Boston Consulting Group (BCG).',
      'Led investments in companies including Lohum, Porter, Tractor Factory, BytePe, Waaree Solar, and Snapmint.',
      'Frugal science engineer and recipient of a grant from Stanford University.',
    ],
    education: 'Ashoka University and Panjab University',
  },
];

const TeamCard = ({ member }: { member: TeamMember }) => (
  <div className="border-t border-border pt-8 pb-4">
    <div className="mb-6">
      <h3 className="font-serif text-2xl text-foreground">{member.name}</h3>
      <p className="text-caption text-gold-muted mt-1">{member.role}</p>
      {member.education && (
        <p className="text-body text-muted-foreground mt-2 italic">
          {member.education}
        </p>
      )}
    </div>
    <ul className="space-y-3">
      {member.bio.map((line, i) => (
        <li key={i} className="text-body text-muted-foreground flex gap-3">
          <span className="text-primary/30 mt-1.5 shrink-0">—</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Team = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  const founders = usTeam;
  const regionalTeam = isIndia ? indiaTeam : [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding py-24 md:py-36">
        <div className="container-narrow">
          <p className="text-caption text-gold-muted mb-6">Our Team</p>
          <h1 className="text-display text-primary-foreground max-w-3xl">
            Operators &amp; Investors Who Understand Founder-Led Businesses
          </h1>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Founders</p>
          <h2 className="text-heading text-foreground mb-12">Leadership</h2>
          <div className="space-y-12">
            {founders.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Regional Team */}
      {regionalTeam.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-narrow">
            <p className="text-caption text-muted-foreground mb-4">
              {isIndia ? 'India' : 'United States'} Team
            </p>
            <h2 className="text-heading text-foreground mb-12">Regional Partners</h2>
            <div className="space-y-12">
              {regionalTeam.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisors placeholder */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Advisors &amp; Operating Partners</p>
          <h2 className="text-heading text-foreground mb-6">Extended Network</h2>
          <p className="text-body text-muted-foreground max-w-2xl">
            We bring an established bench of advisors and operators who help us execute with speed, rigor, and real-world expertise. Details on our advisory network are shared selectively.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Team;
