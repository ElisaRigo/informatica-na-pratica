import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Star, Infinity as InfinityIcon } from "lucide-react";
import logoImage from "@/assets/logo-checkout.png";

const HOTMART_BASE_URL = "https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card";

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return value;
};

export const LeadCaptureDialog = ({ open, onOpenChange }: LeadCaptureDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const formStartFired = useRef(false);

  const trackFormStart = () => {
    if (formStartFired.current) return;
    formStartFired.current = true;
    if ((window as any).gtag) {
      (window as any).gtag("event", "form_start", { currency: "BRL", value: 297.0 });
    }
  };

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast({ title: "Preencha todos os campos", description: "Todos os campos são obrigatórios", variant: "destructive" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "E-mail inválido", description: "Digite um e-mail válido", variant: "destructive" });
      return false;
    }
    if (formData.phone.replace(/\D/g, "").length !== 11) {
      toast({ title: "Telefone inválido", description: "Digite um telefone válido com DDD (11 dígitos)", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validate()) return;
    setLoading(true);

    // Salvar lead para recuperação de vendas (não bloqueia o fluxo)
    try {
      await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        source: "checkout",
      });
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }

    // Evento de lead (etapa final antes da Hotmart)
    if ((window as any).gtag) {
      (window as any).gtag("event", "lead", { currency: "BRL", value: 297.0 });
    }
    if ((window as any).fbq) {
      (window as any).fbq("track", "Lead", { value: 297.0, currency: "BRL", content_name: "Curso Informática na Prática" });
    }

    // Redirecionar para a Hotmart com dados preenchidos
    const params = new URLSearchParams({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phoneac: "55",
      phone: formData.phone.replace(/\D/g, ""),
    });
    window.open(`${HOTMART_BASE_URL}&${params.toString()}`, "_blank");

    setLoading(false);
    onOpenChange(false);
    toast({ title: "Quase lá!", description: "Finalize seu pagamento na página que abriu." });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-5 md:p-6 gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
        {/* Header de Segurança */}
        <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-2 mb-2">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-success" />
            <span className="text-sm font-bold text-success">Ambiente 100% Seguro</span>
            <ShieldCheck className="w-4 h-4 text-success" />
          </div>
        </div>

        {/* Header: Logo + Title */}
        <div className="flex items-center gap-3 mb-1">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-20 h-20 rounded-full object-cover bg-white border-[3px] border-success/40 shrink-0"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-lg md:text-xl font-extrabold text-foreground leading-tight">
              Falta pouco para você começar!
            </h2>
            <p className="text-base font-bold text-primary whitespace-nowrap">
              Curso Completo de Informática 💻
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-center py-2">
          <p className="text-2xl md:text-3xl font-black text-success">12x R$ 30,72</p>
          <p className="text-base text-muted-foreground font-bold">ou R$ 297,00 à vista</p>
        </div>

        {/* Trust badges row */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-success" />
            <span className="text-xs font-bold text-foreground">100% Seguro</span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span className="text-xs font-bold text-foreground">7 dias garantia</span>
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-2">
            <InfinityIcon className="w-4 h-4 text-success" />
            <span className="text-xs font-bold text-foreground">Acesso vitalício</span>
          </div>
        </div>

        {/* Stars + social proof */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">+15.000 alunos já transformaram suas vidas</span>
        </div>

        {/* Form fields */}
        <p className="text-sm text-foreground font-bold text-center mb-1">✏️ Preencha seus dados e garanta sua vaga!</p>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="lead-name" className="text-xs font-bold text-foreground">Nome Completo</Label>
            <Input
              id="lead-name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => { trackFormStart(); setFormData({ ...formData, name: e.target.value }); }}
              disabled={loading}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lead-email" className="text-xs font-bold text-foreground">E-mail</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => { trackFormStart(); setFormData({ ...formData, email: e.target.value }); }}
              disabled={loading}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lead-phone" className="text-xs font-bold text-foreground">WhatsApp</Label>
            <Input
              id="lead-phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => { trackFormStart(); setFormData({ ...formData, phone: formatPhone(e.target.value) }); }}
              maxLength={15}
              disabled={loading}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Aviso sobre envio dos dados de acesso */}
        <div className="bg-success/10 border border-success/30 rounded-lg p-3 mt-4">
          <p className="text-xs md:text-sm text-success text-center font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Acesso enviado no seu e-mail após a compra!</span>
          </p>
        </div>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          disabled={loading}
          size="lg"
          className="w-full bg-success hover:bg-success/90 text-white font-extrabold text-base py-6 rounded-xl gap-2 mt-3"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
          ) : (
            <><ShieldCheck className="w-5 h-5" /> Continuar para o Pagamento</>
          )}
        </Button>

        {/* Security badge */}
        <div className="bg-success/10 border border-success/30 rounded-lg py-2 px-4 text-center mt-2">
          <p className="text-xs font-bold text-success flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Compra 100% Segura
          </p>
          <p className="text-[10px] text-success/80">Verificado e protegido</p>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          🔒 Pagamento processado com segurança pela Hotmart
        </p>
      </DialogContent>
    </Dialog>
  );
};
