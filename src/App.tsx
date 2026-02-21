import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

// Lazy load rotas secundárias
const Admin = lazy(() => import("./pages/Admin"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const AguardandoConfirmacao = lazy(() => import("./pages/AguardandoConfirmacao"));
const VendaTeste = lazy(() => import("./pages/VendaTeste"));
const VendaConversao = lazy(() => import("./pages/VendaConversao"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminRegister = lazy(() => import("./components/admin/AdminRegister").then(m => ({ default: m.AdminRegister })));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso").then(m => ({ default: m.TermosDeUso })));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade").then(m => ({ default: m.PoliticaDePrivacidade })));
const GerarLinkMercadoPago = lazy(() => import("./pages/GerarLinkMercadoPago"));
const Curso = lazy(() => import("./pages/Curso"));
const AudioWhatsApp = lazy(() => import("./pages/AudioWhatsApp"));


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curso" element={<Curso />} />
            <Route path="/venda-teste" element={<VendaTeste />} />
            <Route path="/venda-conversao" element={<VendaConversao />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/aguardando" element={<AguardandoConfirmacao />} />
            <Route path="/aguardando-confirmacao" element={<AguardandoConfirmacao />} />
            <Route path="/obrigada" element={<ThankYou />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/gerar-link-mercadopago" element={<GerarLinkMercadoPago />} />
            <Route path="/audio-whatsapp" element={<AudioWhatsApp />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
