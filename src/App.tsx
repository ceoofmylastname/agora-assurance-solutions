
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import TermLife from "./pages/services/TermLife";
import WholeLife from "./pages/services/WholeLife";
import UniversalLife from "./pages/services/UniversalLife";
import IndexedUniversalLife from "./pages/services/IndexedUniversalLife";
import MortgageProtection from "./pages/services/MortgageProtection";
import LifeSettlements from "./pages/services/LifeSettlements";
import Annuities from "./pages/services/Annuities";
import FinalExpense from "./pages/services/FinalExpense";
import TaxAssetProtection from "./pages/services/TaxAssetProtection";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Booking from "./pages/Booking";
import GetQuote from "./pages/GetQuote";
import ProtectionPlans from "./pages/ProtectionPlans";
import LifeCoverage from "./pages/LifeCoverage";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/services/term-life" element={<TermLife />} />
            <Route path="/services/whole-life" element={<WholeLife />} />
            <Route path="/services/universal-life" element={<UniversalLife />} />
            <Route path="/services/indexed-universal-life" element={<IndexedUniversalLife />} />
            <Route path="/services/mortgage-protection" element={<MortgageProtection />} />
            <Route path="/services/life-settlements" element={<LifeSettlements />} />
            <Route path="/services/annuities" element={<Annuities />} />
            <Route path="/services/final-expense" element={<FinalExpense />} />
            <Route path="/services/tax-asset-protection" element={<TaxAssetProtection />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/protection-plans" element={<ProtectionPlans />} />
            <Route path="/life-coverage" element={<LifeCoverage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
