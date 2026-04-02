import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
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

/* ─── Cinematic Loading Screen ─── */
const PageLoader = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
      style={{
        background: isDark ? 'hsl(228 55% 8%)' : 'hsl(40, 25%, 96%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Radial gold glow behind wordmark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(43 78% 50% / 0.06), transparent 60%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Wordmark with shimmer */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif tracking-[-0.02em] relative overflow-hidden"
          style={{
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            color: isDark ? 'hsl(43 78% 50%)' : 'hsl(228 58% 18%)',
          }}
        >
          Cruxway
          {/* Gold shimmer sweep */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(43 78% 50% / 0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
        </motion.h1>

        {/* Expanding gold line */}
        <motion.div
          className="h-[1.5px] mt-4"
          style={{ background: 'hsl(43 78% 50%)' }}
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Floating gold particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 2),
            height: 2 + (i % 2),
            background: 'hsl(43 78% 50%)',
            left: `${30 + i * 14}%`,
            bottom: '30%',
            opacity: isDark ? 0.3 : 0.15,
          }}
          animate={{ y: [0, -40, -80], opacity: [0, isDark ? 0.3 : 0.15, 0] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: 0.5 + i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
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
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.995 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
