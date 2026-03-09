import { useRegion } from '@/contexts/RegionContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { region } = useRegion();
  const isIndia = region === 'india';

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground section-padding py-24 md:py-40">
        <div className="container-narrow">
          <p className="text-caption text-gold-muted mb-6">
            {isIndia ? 'Cruxway India' : 'Cruxway United States'}
          </p>
          <h1 className="text-display text-primary-foreground max-w-3xl">
            Building Enduring Businesses Through Partnership &amp; Stewardship
          </h1>
          <div className="w-16 h-px bg-gold-muted/40 mt-8 mb-8" />
          <p className="text-body text-primary-foreground/60 max-w-2xl">
            At Cruxway, we partner with exceptional companies in essential B2B services — preserving what makes them special while helping them scale.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <p className="text-caption text-muted-foreground mb-4">Our Focus</p>
          <h2 className="text-heading text-foreground mb-8">Essential B2B Services</h2>
          <p className="text-body text-muted-foreground max-w-2xl mb-12">
            We focus on industries with recurring, compliance-driven demand where reliability and trust are non-negotiable — including maintenance, repair &amp; operations (MRO), testing, inspection, certification &amp; compliance (TICC), and other mission-critical service models.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Proven Experience', desc: 'Track record in supporting growth and value creation for blue-chip companies.' },
              { title: 'Alignment & Focus', desc: 'Building companies one at a time, with deep operational involvement.' },
              { title: 'Vast Network', desc: 'Resources, expertise, and relationships to drive long-term success.' },
              { title: 'Long-Term Orientation', desc: 'No artificially set timeline to monetize investments.' },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-primary/20 pl-6 py-2">
                <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-body text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-subheading text-foreground mb-6">
            Transformation Done Right
          </h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto mb-8">
            Our whole approach — and the name Cruxway — comes from the idea of transformation done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/${region}/about`}
              className="font-sans text-xs tracking-widest uppercase px-8 py-3 bg-primary text-primary-foreground hover:bg-accent transition-colors duration-200"
            >
              Learn More
            </Link>
            <Link
              to={`/${region}/contact`}
              className="font-sans text-xs tracking-widest uppercase px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
