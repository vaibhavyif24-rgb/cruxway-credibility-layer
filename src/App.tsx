import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";

const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const GuidingPrinciples = lazy(() => import("./pages/GuidingPrinciples"));
const OurFocus = lazy(() => import("./pages/OurFocus"));
const OurPlaybook = lazy(() => import("./pages/OurPlaybook"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const InvestorLogin = lazy(() => import("./pages/InvestorLogin"));
const RegionLayout = lazy(() => import("./components/RegionLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ─── Prefetch helpers ─── */
export const prefetchRoute = {
  home: () => import("./pages/Home"),
  principles: () => import("./pages/GuidingPrinciples"),
  focus: () => import("./pages/OurFocus"),
  playbook: () => import("./pages/OurPlaybook"),
  team: () => import("./pages/Team"),
  contact: () => import("./pages/Contact"),
  landing: () => import("./pages/Landing"),
  investorLogin: () => import("./pages/InvestorLogin"),
};

/* ─── Minimal loader — just a themed empty div ─── */
const MinimalLoader = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div
      className="min-h-[100dvh]"
      style={{ background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40, 25%, 96%)' }}
    />
  );
};

const AppRoutes = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="min-h-[100dvh]"
      style={{
        background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40 25% 96%)',
        transition: 'background-color 0.4s ease',
      }}
    >
      <Suspense fallback={<MinimalLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/investor-login" element={<InvestorLogin />} />
          <Route path="/:region" element={<RegionLayout />}>
            <Route index element={<Home />} />
            <Route path="principles" element={<GuidingPrinciples />} />
            <Route path="focus" element={<OurFocus />} />
            <Route path="playbook" element={<OurPlaybook />} />
            <Route path="team" element={<Team />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <RegionProvider>
      <Sonner />
      <BrowserRouter>
        <main>
          <ScrollToTop />
          <AppRoutes />
        </main>
      </BrowserRouter>
    </RegionProvider>
  </ThemeProvider>
);

export default App;
