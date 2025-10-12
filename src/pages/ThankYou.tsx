import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-new.png";

const ThankYou = () => {
  useEffect(() => {
    // Disparar evento de conversão do Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'G-08B5E33G3F',
        'transaction_id': '',
        'value': 297.0,
        'currency': 'BRL'
      });
    }

  }, []);


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="inline-block bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg">
            <img
              src={logoImage}
              alt="Informática na Prática"
              className="w-32 mx-auto"
            />
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full"></div>
            <CheckCircle className="w-24 h-24 text-success relative animate-slide-up" />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            Parabéns pela sua compra!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Seu pagamento foi confirmado! Você receberá um e-mail com suas credenciais de acesso em até 5 minutos.
          </p>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground">
              ⏱️ <strong>Importante:</strong> Após o pagamento no PagSeguro, pode levar alguns minutos para processar. 
              Verifique sua caixa de entrada e spam para o e-mail com as credenciais.
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-card border border-line rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-2 text-primary">📧 Verifique seu e-mail</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Enviaremos suas credenciais de acesso ao curso em até 5 minutos.
            </p>
            <p className="text-xs text-muted-foreground">
              ⚠️ <strong>Não esquece:</strong> Verifique também a caixa de spam!
            </p>
          </div>
          <div className="bg-card border border-line rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-2 text-primary">🎓 Acesso ao curso</h3>
            <p className="text-sm text-muted-foreground">
              Você terá 2 anos de acesso completo ao curso com suporte direto da professora.
            </p>
          </div>
        </div>

        {/* Fallback Instructions */}
        <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-lg mb-3 text-accent flex items-center gap-2">
            ⚠️ Não recebeu o e-mail em 10 minutos?
          </h3>
          <div className="text-left space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="text-accent font-bold">1.</span>
              Verifique sua caixa de <strong>SPAM ou Promoções</strong>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent font-bold">2.</span>
              Aguarde até 15 minutos (o sistema pode estar processando)
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent font-bold">3.</span>
              <strong>Entre em contato pelo WhatsApp</strong> com seu nome completo e e-mail usado na compra
            </p>
          </div>
          <a
            href="https://wa.me/5545988287082?text=Ol%C3%A1!%20Fiz%20a%20compra%20do%20curso%20mas%20n%C3%A3o%20recebi%20o%20e-mail%20com%20as%20credenciais.%20Meu%20nome%20%C3%A9%20____%20e%20o%20e-mail%20usado%20foi%20____"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-success hover:bg-success/90 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            📱 Chamar no WhatsApp agora
          </a>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold px-8"
            onClick={() => window.location.href = '/'}
          >
            Voltar para a página inicial
          </Button>
        </div>

        {/* Support Info */}
        <div className="pt-8 border-t border-line">
          <p className="text-sm text-muted-foreground mb-2">
            Suporte direto com a Prof. Elisa:
          </p>
          <a
            href="https://wa.me/5545988287082"
            className="text-primary hover:text-accent transition-colors font-medium text-lg"
          >
            📱 (45) 98828-7082
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
