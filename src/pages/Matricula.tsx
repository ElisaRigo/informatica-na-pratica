import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Smartphone, CreditCard, Receipt, Copy, ArrowLeft, Star, Flame, Gift, Percent } from "lucide-react";
import { CardPaymentBrick } from "@/components/CardPaymentBrick";
import { useCheckoutFormLogic } from "@/hooks/useCheckoutFormLogic";

const ELISA_PHOTO = "/images/elisa-checkout.jpg";
const MATRICULA_PRICE = 248.50;

const Matricula = () => {
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
        value: MATRICULA_PRICE,
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
  } = useCheckoutFormLogic(MATRICULA_PRICE);

  const handleContinue = () => {
    if (selectedMethod === "pix") {
      handlePixPayment();
    } else if (selectedMethod === "cartao") {
      handleCardPayment();
    } else if (selectedMethod === "boleto") {
      handleOtherPayment("boleto");
    }
  };

  const cardWrapper = "min-h-screen bg-background flex items-center justify-center px-4 py-8";
  const cardClass = "w-full max-w-lg bg-background rounded-lg shadow-lg border p-4 md:p-6";

  // Card payment screen
  if (showCardPayment) {
    return (
      <div className={cardWrapper}>
        <div className={cardClass}>
          <div className="space-y-4">
            <div className="flex items-center pb-3 border-b">
              <Button variant="ghost" size="sm" onClick={() => setShowCardPayment(false)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Button>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-foreground">Pagamento com Cartão</h3>
              <p className="text-2xl font-black text-primary">12x R$ 25,30</p>
              <p className="text-sm text-muted-foreground">ou R$ 248,50 à vista</p>
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
        </div>
      </div>
    );
  }

  // PIX QR code screen
  if (pixData) {
    return (
      <div className={cardWrapper}>
        <div className={cardClass}>
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
        </div>
      </div>
    );
  }

  // Main checkout form — identical to CursoCheckoutDialog
  return (
    <div className={cardWrapper}>
      <div className="w-full max-w-lg bg-background rounded-lg shadow-lg border overflow-hidden">
        {/* Top security strip */}
        <div className="bg-success/10 border-b border-success/20 px-4 py-2 flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-success" />
          <span className="text-xs font-semibold text-success">Ambiente 100% Seguro</span>
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
        </div>

        <div className="p-4 md:p-6 space-y-3">
        {/* Header: Photo + Title centered */}
        <div className="flex items-center gap-3">
          <img
            src={ELISA_PHOTO}
            alt="Prof. Elisa"
            className="w-12 h-12 rounded-full object-cover object-top border-2 border-success/40 shrink-0"
          />
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-foreground leading-tight">
              Falta pouco para você começar!
            </h2>
            <p className="text-sm text-muted-foreground">
              Te vejo na área de alunos 🥳
            </p>
          </div>
        </div>

        {/* Discount Banner — high conversion */}
        <div className="rounded-xl overflow-hidden border border-primary/30 shadow-md">
          {/* Urgency strip */}
          <div className="bg-primary px-4 py-1.5 flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] md:text-xs font-bold text-white uppercase tracking-widest">
              50% OFF – Só hoje · Últimas vagas
            </span>
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          {/* Price body */}
          <div className="bg-gradient-to-b from-primary/10 to-primary/5 px-4 py-3 text-center space-y-0.5">
            <div>
              <span className="text-2xl md:text-3xl font-black text-primary">12x R$ 25,30</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground line-through decoration-destructive decoration-2">R$ 497,00</span>
              <span className="text-base md:text-lg font-extrabold text-foreground">à vista R$ 248,50</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Invista em você por menos de R$ 1 por dia</p>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex items-center justify-center gap-1.5">
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1.5">
            <Lock className="w-3.5 h-3.5 text-success" />
            <span className="text-[10px] font-bold text-foreground">Seguro</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span className="text-[10px] font-bold text-foreground">7 dias garantia</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            <span className="text-[10px] font-bold text-foreground">Acesso imediato</span>
          </div>
        </div>

        {/* Stars + social proof */}
        <div className="flex items-center justify-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">+15.000 alunos transformados</span>
        </div>

        {/* Section title */}
        <h3 className="text-base md:text-lg font-extrabold text-foreground flex items-center gap-2">
          👇 Garanta sua vaga com 🔥<span className="text-primary">50% OFF</span>🔥
        </h3>

        {/* Form fields */}
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="matricula-name" className="text-xs font-bold text-foreground">Nome Completo</Label>
            <Input
              id="matricula-name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={trackFormStart}
              disabled={loading || !sdkLoaded}
              className="h-10 text-sm border border-border focus:border-primary"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="matricula-email" className="text-xs font-bold text-foreground">E-mail</Label>
            <Input
              id="matricula-email"
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
            <Label htmlFor="matricula-cpf" className="text-xs font-bold text-foreground">CPF</Label>
            <Input
              id="matricula-cpf"
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
            <Label htmlFor="matricula-phone" className="text-xs font-bold text-foreground">Telefone</Label>
            <Input
              id="matricula-phone"
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
        <p className="text-sm font-bold text-foreground text-center">Escolha uma forma de pagamento</p>
        <div className="flex gap-2">
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
        <div>
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
        </div>

        {/* Security badge */}
        <div className="bg-success/10 border border-success/30 rounded-lg py-2 px-4 text-center">
          <p className="text-xs font-bold text-success flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Compra 100% Segura
          </p>
          <p className="text-[10px] text-success/80">Verificado e protegido</p>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-center text-muted-foreground">
          🔒 Pagamento processado com segurança pelo Mercado Pago
        </p>

        {/* Loading state */}
        {!sdkLoaded && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Carregando sistema de pagamento...</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Matricula;
