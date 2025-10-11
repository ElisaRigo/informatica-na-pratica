import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ThankYou from "./pages/ThankYou";
import AguardandoConfirmacao from "./pages/AguardandoConfirmacao";
import NotFound from "./pages/NotFound";
import { AdminRegister } from "./components/admin/AdminRegister";
import { TermosDeUso } from "./pages/TermosDeUso";
import { PoliticaDePrivacidade } from "./pages/PoliticaDePrivacidade";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/aguardando" element={<AguardandoConfirmacao />} />
          <Route path="/obrigada" element={<ThankYou />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
