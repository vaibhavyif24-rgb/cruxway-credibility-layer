import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegionProvider } from "@/contexts/RegionContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import InvestorLogin from "./pages/InvestorLogin";
import SiteLayout from "./components/SiteLayout";
import RegionGuard from "./components/RegionGuard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RegionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/investor-login" element={<InvestorLogin />} />
            <Route element={<RegionGuard />}>
              <Route element={<SiteLayout />}>
                <Route path="/:region" element={<Home />} />
                <Route path="/:region/about" element={<About />} />
                <Route path="/:region/team" element={<Team />} />
                <Route path="/:region/contact" element={<Contact />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RegionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
