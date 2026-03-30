import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";

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

const PageLoader = () => (
  <div className="min-h-[100dvh] flex items-center justify-center bg-background">
    <p className="font-serif text-xl tracking-[-0.02em] text-gold/40 animate-pulse">
      Cruxway
    </p>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
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
