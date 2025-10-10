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

    // Também disparar evento do Meta Pixel se existir
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 297.0,
        currency: 'BRL'
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
            Seu pagamento está sendo processado e você receberá um e-mail com suas credenciais de acesso em breve.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="bg-card border border-line rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-2 text-primary">📧 Verifique seu e-mail</h3>
            <p className="text-sm text-muted-foreground">
              Enviaremos suas credenciais de acesso ao curso em poucos minutos.
            </p>
          </div>
          <div className="bg-card border border-line rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-2 text-primary">🎓 Acesso imediato</h3>
            <p className="text-sm text-muted-foreground">
              Após a confirmação do pagamento, você terá 2 anos de acesso completo ao curso.
            </p>
          </div>
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
          <p className="text-sm text-muted-foreground">
            Tem alguma dúvida? Entre em contato conosco pelo WhatsApp
          </p>
          <a
            href="https://wa.me/5545988287082"
            className="text-primary hover:text-accent transition-colors font-medium"
          >
            (45) 98828-7082
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
