const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground/40 border-t border-primary-foreground/10">
      <div className="container-narrow mx-auto section-padding py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-serif text-lg text-primary-foreground tracking-tight">Cruxway</p>
            <p className="font-sans text-xs mt-1">Investment &amp; Partnership</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-xs">
              &copy; {year} Cruxway LLC. All rights reserved.
            </p>
            <p className="font-sans text-xs mt-1">
              Privileged &amp; Confidential
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
