import { useRegion } from '@/contexts/RegionContext';

const Contact = () => {
  const { region } = useRegion();

  return (
    <div>
      <section className="bg-primary text-primary-foreground section-padding py-24 md:py-36">
        <div className="container-narrow">
          <p className="text-caption text-gold-muted mb-6">Contact</p>
          <h1 className="text-display text-primary-foreground max-w-3xl">
            Get in Touch
          </h1>
          <div className="w-16 h-px bg-gold-muted/40 mt-8 mb-8" />
          <p className="text-body text-primary-foreground/60 max-w-2xl">
            We welcome conversations with business owners, operators, and investors who share our long-term perspective.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-caption text-muted-foreground mb-4">General Inquiries</p>
              <h2 className="font-serif text-xl text-foreground mb-6">Reach Our Team</h2>
              <div className="space-y-4 text-body text-muted-foreground">
                <p>
                  <span className="text-foreground font-medium">Email:</span>{' '}
                  <a href="mailto:info@cruxway.com" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    info@cruxway.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <p className="text-caption text-muted-foreground mb-4">Office</p>
              <h2 className="font-serif text-xl text-foreground mb-6">
                {region === 'india' ? 'India' : 'United States'}
              </h2>
              <p className="text-body text-muted-foreground">
                {region === 'india'
                  ? 'Details available upon request.'
                  : 'Details available upon request.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
