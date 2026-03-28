import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
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

const App = () => (
  <ThemeProvider>
    <RegionProvider>
      <Sonner />
      <BrowserRouter>
        <main>
          <Suspense fallback={null}>
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
        </main>
      </BrowserRouter>
    </RegionProvider>
  </ThemeProvider>
);

export default App;
