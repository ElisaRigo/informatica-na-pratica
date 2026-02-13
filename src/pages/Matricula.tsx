import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Smartphone, CreditCard, Receipt, Copy, ArrowLeft, Star, Award, Clock, Users, HeadphonesIcon } from "lucide-react";
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

  // Main checkout page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Top trust bar */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center">
        <p className="text-xs md:text-sm font-medium flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          Ambiente 100% Seguro — Seus dados estão protegidos
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">

          {/* LEFT: Persuasion column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img src={logoNew} alt="Informática na Prática" className="h-10" />
            </div>

            {/* Instructor card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/50 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start gap-4">
                <img
                  src={ELISA_PHOTO}
                  alt="Prof. Elisa"
                  className="w-24 h-24 rounded-full object-cover object-top border-4 border-success/30"
                />
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">
                    Olá! Que bom que você chegou até aqui! 🥳
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estou te esperando na área de alunos. Vamos juntos nessa jornada!
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    — Prof. Elisa
                  </p>
                </div>
              </div>
            </div>

            {/* What you get */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-border/50">
              <h3 className="font-bold text-foreground mb-3 text-sm">O que você vai receber:</h3>
              <ul className="space-y-2.5">
                {[
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Curso completo de Informática do zero" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Word, Excel, PowerPoint, Internet e mais" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Certificado de conclusão reconhecido" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Acesso vitalício — estude no seu ritmo" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Suporte direto com a professora" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-success shrink-0" />, text: "Aulas práticas e didáticas" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-success" />, title: "Garantia 7 dias", desc: "Devolução total" },
                { icon: <Clock className="w-5 h-5 text-primary" />, title: "Acesso Imediato", desc: "Comece agora" },
                { icon: <Award className="w-5 h-5 text-warning" />, title: "Certificado", desc: "Reconhecido" },
                { icon: <HeadphonesIcon className="w-5 h-5 text-primary" />, title: "Suporte", desc: "Via WhatsApp" },
              ].map((badge, i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-border/50 text-center">
                  <div className="flex justify-center mb-1">{badge.icon}</div>
                  <p className="text-xs font-bold text-foreground">{badge.title}</p>
                  <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-foreground">4.9/5</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Achei que era tarde demais para aprender. A Elisa provou que eu estava errada! Hoje faço tudo sozinha no computador."
              </p>
              <p className="text-xs font-bold text-foreground mt-2">— Maria Helena, 58 anos</p>
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/50">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground font-medium">+15.000 alunos matriculados</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Checkout form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-5 md:p-7 sticky top-6">
              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="text-xl md:text-2xl font-extrabold text-foreground">
                  Finalize sua matrícula
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Preencha seus dados para garantir sua vaga</p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-xl p-4 text-center mb-4 border border-primary/10">
                <p className="text-2xl md:text-3xl font-black text-success">
                  12x R$ 30,22
                </p>
                <p className="text-base text-muted-foreground font-bold">
                  ou R$ 297,00 à vista
                </p>
                <p className="text-xs text-primary font-semibold mt-1">
                  💡 Invista em você por menos de R$ 1 por dia
                </p>
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-1.5">
                  <Lock className="w-3.5 h-3.5 text-success" />
                  <span className="text-[11px] font-bold text-foreground">100% Seguro</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  <span className="text-[11px] font-bold text-foreground">7 dias garantia</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg px-3 py-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  <span className="text-[11px] font-bold text-foreground">Acesso imediato</span>
                </div>
              </div>

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
                    className="h-11 text-sm border border-border focus:border-primary"
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
                    className="h-11 text-sm border border-border focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
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
                      className="h-11 text-sm border border-border focus:border-primary"
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
                      className="h-11 text-sm border border-border focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment method tabs */}
              <p className="text-sm font-bold text-foreground text-center mt-5 mb-2">Escolha uma forma de pagamento</p>
              <div className="flex gap-2 mb-4">
                {[
                  { key: "pix" as const, icon: <Smartphone className="w-5 h-5" />, label: "PIX" },
                  { key: "cartao" as const, icon: <CreditCard className="w-5 h-5" />, label: "Cartão" },
                  { key: "boleto" as const, icon: <Receipt className="w-5 h-5" />, label: "Boleto" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setSelectedMethod(m.key)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                      selectedMethod === m.key
                        ? "border-success bg-success/5 text-success"
                        : "border-border text-muted-foreground hover:border-muted-foreground/50"
                    }`}
                  >
                    {m.icon}
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                ))}
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
                  <><ShieldCheck className="w-5 h-5" /> Finalizar Matrícula com Segurança</>
                )}
              </Button>

              {/* Security badge */}
              <div className="bg-success/10 border border-success/30 rounded-lg py-2 px-4 text-center mt-3">
                <p className="text-xs font-bold text-success flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Compra 100% Segura
                </p>
                <p className="text-[10px] text-success/80">Verificado e protegido</p>
              </div>

              {/* Footer */}
              <p className="text-[10px] text-center text-muted-foreground mt-3">
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

        {/* Bottom guarantee section */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-border/50 text-center max-w-2xl mx-auto">
          <ShieldCheck className="w-12 h-12 text-success mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-foreground mb-2">Garantia Total de 7 Dias</h3>
          <p className="text-sm text-muted-foreground">
            Se dentro de 7 dias você sentir que o curso não é para você, devolvemos 100% do seu dinheiro. Sem perguntas, sem complicação.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 pb-6">
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} Informática na Prática — Todos os direitos reservados
          </p>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
            <a href="/termos-de-uso" className="hover:underline">Termos de Uso</a>
            <a href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matricula;
