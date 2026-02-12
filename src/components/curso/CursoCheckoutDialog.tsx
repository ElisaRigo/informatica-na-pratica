import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Smartphone, CreditCard, Receipt, Copy, ArrowLeft, Star } from "lucide-react";
import { CardPaymentBrick } from "@/components/CardPaymentBrick";
import { useCheckoutFormLogic } from "@/hooks/useCheckoutFormLogic";

const ELISA_PHOTO = "/images/elisa-checkout.jpg";

interface CursoCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CursoCheckoutDialog = ({ open, onOpenChange }: CursoCheckoutDialogProps) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "cartao" | "boleto">("pix");
  const formStartFired = useRef(false);

  const trackFormStart = () => {
    if (formStartFired.current) return;
    formStartFired.current = true;
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    if (!isProduction) {
      console.log('GA4 form_start skipped - not on production domain');
      return;
    }
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_start', {
        currency: 'BRL',
        value: 297.00,
      });
      console.log('✅ GA4 form_start tracked');
    }
  };

  const {
    formData,
    setFormData,
    loading,
    setLoading,
    sdkLoaded,
    pixData,
    setPixData,
    checkingPayment,
    coursePrice,
    showCardPayment,
    setShowCardPayment,
    formatCPF,
    formatPhone,
    handlePixPayment,
    handleCardPayment,
    handleOtherPayment,
    copyPixCode,
    checkPaymentStatus,
  } = useCheckoutFormLogic();

  const handleContinue = () => {
    if (selectedMethod === "pix") {
      handlePixPayment();
    } else if (selectedMethod === "cartao") {
      handleCardPayment();
    } else if (selectedMethod === "boleto") {
      handleOtherPayment("boleto");
    }
  };

  // Card payment screen
  if (showCardPayment) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center pb-3 border-b">
              <Button variant="ghost" size="sm" onClick={() => setShowCardPayment(false)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Button>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-foreground">Pagamento com Cartão</h3>
              <p className="text-sm text-muted-foreground">Parcele em até 12x</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-sm text-blue-900">💳 Digite o número do cartão para ver as opções de parcelamento</p>
            </div>
            <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-3 text-center">
              <p className="text-sm text-success font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Acesso enviado no seu e-mail após a compra!
              </p>
            </div>
            <CardPaymentBrick
              formData={formData}
              amount={coursePrice}
              onSuccess={() => { toast({ title: "✅ Pagamento aprovado!", description: "Redirecionando..." }); }}
              onError={(error) => { console.error('Payment error:', error); }}
            />
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t">
              <ShieldCheck className="w-4 h-4" />
              <span>Pagamento 100% Seguro com Mercado Pago</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // PIX QR code screen
  if (pixData) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center pb-3 border-b">
              <Button variant="ghost" size="sm" onClick={() => { setPixData(null); setLoading(false); }} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Button>
            </div>
            <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-3 text-center">
              <p className="text-sm text-success font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Acesso enviado no seu e-mail após a compra!
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success/10">
                <Smartphone className="w-7 h-7 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Pague com PIX</h3>
                <p className="text-sm text-muted-foreground mt-1">Escaneie o QR Code ou copie o código</p>
              </div>
              <div className="flex justify-center py-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <img src={`data:image/png;base64,${pixData.qrCodeBase64}`} alt="QR Code PIX" className="w-56 h-56" />
                </div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground">Valor a pagar</div>
                <div className="text-2xl font-black text-primary mt-1">R$ {coursePrice.toFixed(2).replace('.', ',')}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Código PIX Copia e Cola</Label>
                <div className="flex gap-2">
                  <Input value={pixData.qrCode} readOnly className="font-mono text-xs" />
                  <Button onClick={copyPixCode} size="icon" className="shrink-0"><Copy className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="text-left space-y-1.5 p-3 bg-muted/20 rounded-lg text-sm">
                <p className="font-semibold text-xs">Como pagar:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-muted-foreground text-xs">
                  <li>Abra o app do seu banco</li>
                  <li>Escolha pagar com PIX</li>
                  <li>Escaneie o QR Code ou cole o código</li>
                  <li>Confirme o pagamento</li>
                  <li>Pronto! Você receberá o acesso por e-mail</li>
                </ol>
              </div>
              <Button onClick={checkPaymentStatus} disabled={checkingPayment} size="lg" className="w-full bg-success hover:bg-success/90 text-white font-bold">
                {checkingPayment ? (<><Loader2 className="w-4 h-4 animate-spin mr-2" />Verificando...</>) : (<><CheckCircle2 className="w-4 h-4 mr-2" />Já paguei, verificar pagamento</>)}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Main checkout form (matching the screenshot)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-5 md:p-6 gap-0">
        {/* Header: Photo + Title */}
        <div className="flex items-center gap-3 mb-1">
          <img
            src={ELISA_PHOTO}
            alt="Prof. Elisa"
            className="w-20 h-20 rounded-full object-cover object-top border-3 border-success/40 shrink-0"
          />
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-foreground leading-tight">
              Falta pouco para você começar!
            </h2>
            <p className="text-sm text-muted-foreground">
              Te vejo na área de alunos, até mais 🥳
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-center py-2">
          <p className="text-2xl md:text-3xl font-black text-success">
            12x R$ 30,22
          </p>
          <p className="text-base text-muted-foreground font-bold">
            ou R$ 297,00 à vista
          </p>
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
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-xs font-bold text-foreground">Acesso imediato</span>
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
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="curso-name" className="text-xs font-bold text-foreground">Nome Completo</Label>
            <Input
              id="curso-name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={trackFormStart}
              disabled={loading || !sdkLoaded}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="curso-email" className="text-xs font-bold text-foreground">E-mail</Label>
            <Input
              id="curso-email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={trackFormStart}
              disabled={loading || !sdkLoaded}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="curso-cpf" className="text-xs font-bold text-foreground">CPF</Label>
            <Input
              id="curso-cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
              onFocus={trackFormStart}
              maxLength={14}
              disabled={loading || !sdkLoaded}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="curso-phone" className="text-xs font-bold text-foreground">Telefone</Label>
            <Input
              id="curso-phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              onFocus={trackFormStart}
              maxLength={15}
              disabled={loading || !sdkLoaded}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Payment method tabs */}
        <p className="text-sm font-bold text-foreground text-center mt-4 mb-2">Escolha uma forma de pagamento</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedMethod("pix")}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg border-2 transition-all ${
              selectedMethod === "pix"
                ? "border-success bg-success/5 text-success"
                : "border-border text-muted-foreground hover:border-muted-foreground/50"
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs font-bold">PIX</span>
          </button>
          <button
            onClick={() => setSelectedMethod("cartao")}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg border-2 transition-all ${
              selectedMethod === "cartao"
                ? "border-success bg-success/5 text-success"
                : "border-border text-muted-foreground hover:border-muted-foreground/50"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-bold">Cartão</span>
          </button>
          <button
            onClick={() => setSelectedMethod("boleto")}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg border-2 transition-all ${
              selectedMethod === "boleto"
                ? "border-success bg-success/5 text-success"
                : "border-border text-muted-foreground hover:border-muted-foreground/50"
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span className="text-xs font-bold">Boleto</span>
          </button>
        </div>

        {/* Continue button */}
        <Button
          onClick={handleContinue}
          disabled={loading || !sdkLoaded}
          size="lg"
          className="w-full bg-success hover:bg-success/90 text-white font-extrabold text-base py-6 rounded-xl gap-2"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
          ) : (
            <><ShieldCheck className="w-5 h-5" /> Continuar com Segurança</>
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
          🔒 Pagamento processado com segurança pelo Mercado Pago
        </p>

        {/* Loading state */}
        {!sdkLoaded && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Carregando sistema de pagamento...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
