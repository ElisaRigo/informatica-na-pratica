import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Smartphone, CreditCard, Receipt, Copy, ArrowLeft, Star, Users, GraduationCap, MonitorPlay, Clock, MessageCircle, Award, Flame, Gift, BadgePercent } from "lucide-react";
import { CardPaymentBrick } from "@/components/CardPaymentBrick";
import { useCheckoutFormLogic } from "@/hooks/useCheckoutFormLogic";
import logoNew from "@/assets/logo-new.png";

const ELISA_PHOTO = "/images/elisa-checkout.jpg";

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
      <div className="min-h-screen bg-slate-50 flex items-start justify-center py-6 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 md:p-8 space-y-4">
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
      </div>
    );
  }

  // PIX QR code screen
  if (pixData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-start justify-center py-6 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 md:p-8 space-y-4">
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
              <div className="p-3 bg-white rounded-xl shadow-lg border">
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
    );
  }

  // Main checkout — compact & direct
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Trust bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center">
        <p className="text-xs font-medium flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          Ambiente 100% Seguro — Dados protegidos
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-3 space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <img src={logoNew} alt="Logo" className="h-7" />
          </div>
          <h1 className="text-lg font-black text-foreground leading-tight">
            💻 Curso de Informática — <span className="text-primary">Online</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <img src={ELISA_PHOTO} alt="Prof. Elisa" className="w-7 h-7 rounded-full object-cover object-top border-2 border-primary/30" />
            <p className="text-[11px] text-muted-foreground">com <span className="font-bold text-foreground">Prof. Elisa</span></p>
          </div>
        </div>

        {/* Benefits strip */}
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[
            { icon: <GraduationCap className="w-3.5 h-3.5" />, text: "Do Zero ao Mercado" },
            { icon: <Award className="w-3.5 h-3.5" />, text: "Certificado incluso" },
            { icon: <MonitorPlay className="w-3.5 h-3.5" />, text: "Aulas práticas" },
            { icon: <Clock className="w-3.5 h-3.5" />, text: "Estude no seu ritmo" },
            { icon: <MessageCircle className="w-3.5 h-3.5" />, text: "Suporte p/ dúvidas" },
            { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "Acesso vitalício" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 rounded-lg py-1.5 px-2">
              <span className="text-primary">{b.icon}</span>
              <span className="text-[10px] font-bold text-foreground">{b.text}</span>
            </div>
          ))}
        </div>

        {/* Checkout card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-4 space-y-3">
          
          {/* Discount banner */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-3 text-center text-white space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <BadgePercent className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Desconto exclusivo de 50%</span>
            </div>
            <p className="text-xs line-through opacity-70">De R$ 497,00</p>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-yellow-300" />
              <p className="text-2xl font-black">R$ 297,00</p>
            </div>
            <p className="text-xs font-bold opacity-90">ou 12x de R$ 30,22</p>
          </div>

          {/* Value reinforcement */}
          <div className="flex items-center justify-center gap-1.5 text-[10px]">
            <Gift className="w-3 h-3 text-primary" />
            <span className="font-bold text-foreground">Valor único, sem mensalidades</span>
            <span className="text-muted-foreground">• Acesso imediato</span>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { icon: <ShieldCheck className="w-3 h-3" />, text: "7 dias garantia" },
              { icon: <Lock className="w-3 h-3" />, text: "Compra segura" },
              { icon: <CheckCircle2 className="w-3 h-3" />, text: "Acesso imediato" },
            ].map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-success/10 text-success rounded-full px-2.5 py-1 text-[10px] font-bold">
                {b.icon} {b.text}
              </span>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-2">
            <div>
              <Label htmlFor="m-name" className="text-xs font-bold">Nome Completo</Label>
              <Input id="m-name" placeholder="Seu nome" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={trackFormStart} disabled={loading || !sdkLoaded}
                className="h-10 text-sm mt-1" />
            </div>
            <div>
              <Label htmlFor="m-email" className="text-xs font-bold">E-mail</Label>
              <Input id="m-email" type="email" placeholder="seu@email.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={trackFormStart} disabled={loading || !sdkLoaded}
                className="h-10 text-sm mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="m-cpf" className="text-xs font-bold">CPF</Label>
                <Input id="m-cpf" placeholder="000.000.000-00" value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                  onFocus={trackFormStart} maxLength={14} disabled={loading || !sdkLoaded}
                  className="h-10 text-sm mt-1" />
              </div>
              <div>
                <Label htmlFor="m-phone" className="text-xs font-bold">Telefone</Label>
                <Input id="m-phone" placeholder="(11) 99999-9999" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  onFocus={trackFormStart} maxLength={15} disabled={loading || !sdkLoaded}
                  className="h-10 text-sm mt-1" />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <p className="text-xs font-bold text-foreground text-center mb-2">Forma de pagamento</p>
            <div className="flex gap-2">
              {[
                { key: "pix" as const, icon: <Smartphone className="w-4 h-4" />, label: "PIX" },
                { key: "cartao" as const, icon: <CreditCard className="w-4 h-4" />, label: "Cartão" },
                { key: "boleto" as const, icon: <Receipt className="w-4 h-4" />, label: "Boleto" },
              ].map((m) => (
                <button key={m.key} onClick={() => setSelectedMethod(m.key)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl border-2 transition-all text-xs font-bold ${
                    selectedMethod === m.key
                      ? "border-success bg-success/5 text-success"
                      : "border-border text-muted-foreground hover:border-muted-foreground/50"
                  }`}>
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button onClick={handleContinue} disabled={loading || !sdkLoaded} size="lg"
            className="w-full bg-success hover:bg-success/90 text-white font-extrabold text-sm py-5 rounded-xl gap-2">
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
            ) : (
              <><ShieldCheck className="w-4 h-4" /> Finalizar Matrícula</>
            )}
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            🔒 Pagamento seguro via Mercado Pago
          </p>

          {!sdkLoaded && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Carregando pagamento...</span>
            </div>
          )}
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}</div>
          <span className="font-bold">4.9</span>
          <span>•</span>
          <Users className="w-3 h-3" />
          <span>+15.000 alunos</span>
        </div>

        {/* Footer */}
        <div className="text-center mt-3 pb-4">
          <p className="text-[10px] text-muted-foreground">© {new Date().getFullYear()} Informática na Prática</p>
          <div className="flex items-center justify-center gap-4 mt-1 text-[10px] text-muted-foreground">
            <a href="/termos-de-uso" className="hover:underline">Termos</a>
            <a href="/politica-de-privacidade" className="hover:underline">Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matricula;
