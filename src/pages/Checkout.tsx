import { CheckoutForm } from "@/components/CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Star, Award, Clock, Users, ArrowLeft, BadgeCheck } from "lucide-react";
import elisaCheckout from "@/assets/elisa-checkout.jpg";
import logoBlue from "@/assets/logo-blue.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Disparar eventos GA4 apenas uma vez quando a página carrega
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) {
        console.log('🔍 [DIAG] Tracking skipped - not production');
        return;
      }

      const trackGA4Events = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'begin_checkout', {
            currency: 'BRL',
            value: 297.00,
            items: [{
              item_name: 'Curso Informática na Prática',
              price: 297.00,
              quantity: 1
            }]
          });
          console.log('✅ [GA4] begin_checkout disparado - R$ 297,00');
          
          (window as any).gtag('event', 'form_start', {
            form_name: 'checkout',
            currency: 'BRL',
            value: 297.00
          });
          console.log('✅ [GA4] form_start disparado');
          
          return true;
        }
        return false;
      };

      if (!trackGA4Events()) {
        let gaAttempts = 0;
        const gaInterval = setInterval(() => {
          gaAttempts++;
          if (trackGA4Events()) {
            clearInterval(gaInterval);
          } else if (gaAttempts >= 50) {
            clearInterval(gaInterval);
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-panel to-background">
      {/* Header com logo e navegação */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Button>
          
          <img 
            src={logoBlue} 
            alt="Informática na Prática" 
            className="h-8 md:h-10"
          />
          
          <div className="flex items-center gap-1.5 text-success">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">Ambiente Seguro</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-5xl mx-auto">
          {/* Layout em duas colunas no desktop */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Coluna da esquerda - Informações de confiança */}
            <div className="space-y-6 order-2 lg:order-1">
              
              {/* Card da Professora */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={elisaCheckout} 
                    alt="Professora Elisangela" 
                    className="w-20 h-20 rounded-full object-cover object-top border-4 border-primary/20 shadow-lg"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Professora Elisangela
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Sua instrutora no curso
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">5.0</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "Estou te esperando na área de alunos! Juntos vamos transformar sua relação com a tecnologia. Você vai ver como é fácil aprender quando tem alguém te guiando passo a passo."
                </p>
              </div>

              {/* Garantia destacada */}
              <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 border-2 border-success/30">
                <div className="flex items-start gap-4">
                  <div className="bg-success rounded-full p-3 flex-shrink-0">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Garantia Total de 7 Dias
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Se você não ficar satisfeita, devolvemos <strong>100% do seu dinheiro</strong>. Sem perguntas, sem burocracia. Você não tem nada a perder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selos de confiança */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
                  Pagamento 100% Seguro
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-panel rounded-xl">
                    <Lock className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Criptografia SSL</p>
                      <p className="text-[10px] text-muted-foreground">Dados protegidos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-panel rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Mercado Pago</p>
                      <p className="text-[10px] text-muted-foreground">Processador oficial</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-panel rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Acesso Imediato</p>
                      <p className="text-[10px] text-muted-foreground">Após confirmação</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-panel rounded-xl">
                    <Clock className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Acesso Vitalício</p>
                      <p className="text-[10px] text-muted-foreground">Estude quando quiser</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social proof */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold text-foreground">+15.000 alunos</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-panel rounded-xl">
                    <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      "Finalmente consegui aprender! A professora explica de um jeito que qualquer um entende."
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-panel rounded-xl">
                    <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      "Melhor investimento que fiz. Agora trabalho com computador sem medo!"
                    </p>
                  </div>
                </div>
              </div>

              {/* O que você recebe */}
              <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  ✨ O que você recebe hoje:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Curso completo com +60 aulas em vídeo",
                    "Módulos de Word, Excel, PowerPoint e Internet",
                    "Certificado de conclusão",
                    "Suporte direto com a professora",
                    "Acesso vitalício ao conteúdo",
                    "Atualizações gratuitas para sempre"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coluna da direita - Formulário de checkout */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-card border border-border sticky top-20">
                {/* Header do card de checkout */}
                <div className="p-6 border-b border-border text-center">
                  <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
                    <Award className="w-3.5 h-3.5" />
                    Oferta Especial
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                    Curso Informática na Prática
                  </h1>
                  <div className="space-y-1">
                    <p className="text-3xl md:text-4xl font-black text-primary">
                      12x R$ 30,22
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ou R$ 297,00 à vista
                    </p>
                  </div>
                  <p className="text-xs text-success font-medium mt-2">
                    ⚡ Invista em você por menos de R$ 1 por dia
                  </p>
                </div>

                {/* Formulário */}
                <div className="p-4 md:p-6">
                  <CheckoutForm />
                </div>

                {/* Footer do card */}
                <div className="px-6 pb-6 pt-2 border-t border-border">
                  <p className="text-[10px] text-center text-muted-foreground">
                    🔒 Pagamento processado com segurança pelo Mercado Pago
                  </p>
                  <p className="text-[10px] text-center text-muted-foreground mt-1">
                    Pagamento processado para: <strong>Professora Elisangela Neri Rigo</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <img 
            src={logoBlue} 
            alt="Informática na Prática" 
            className="h-8 mx-auto mb-3 opacity-60"
          />
          <p className="text-xs text-muted-foreground">
            © 2025 Informática na Prática. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            CNPJ: 00.000.000/0001-00 | contato@informaticanapratica.com.br
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
