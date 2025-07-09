
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
import TermLife from "./pages/services/TermLife";
import WholeLife from "./pages/services/WholeLife";
import UniversalLife from "./pages/services/UniversalLife";
import IndexedUniversalLife from "./pages/services/IndexedUniversalLife";
import Annuities from "./pages/services/Annuities";
import FinalExpense from "./pages/services/FinalExpense";

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
            <Route path="/services/term-life" element={<TermLife />} />
            <Route path="/services/whole-life" element={<WholeLife />} />
            <Route path="/services/universal-life" element={<UniversalLife />} />
            <Route path="/services/indexed-universal-life" element={<IndexedUniversalLife />} />
            <Route path="/services/annuities" element={<Annuities />} />
            <Route path="/services/final-expense" element={<FinalExpense />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
