import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-blue.png";

const ThankYou = () => {
  useEffect(() => {
    // Só rastrear conversões no domínio de produção
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    
    if (!isProduction) {
      console.log('Google Ads conversion skipped - not on production domain');
      return;
    }

    // Obter parâmetros da URL (email e telefone podem ser passados pelo checkout)
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email') || '';
    const userPhone = urlParams.get('phone') || '';

    // Parâmetros completos do evento Purchase
    const purchaseParams = {
      value: 297.00,
      currency: 'BRL',
      content_type: 'product',
      content_name: 'Curso Informática na Prática',
      content_ids: ['curso-informatica-pratica'],
      num_items: 1
    };

    // Preparar dados de correspondência avançada
    const advancedMatchingData: { em?: string; ph?: string } = {};
    if (userEmail) advancedMatchingData.em = userEmail.toLowerCase().trim();
    if (userPhone) advancedMatchingData.ph = userPhone.replace(/\D/g, '');

    // Função para disparar conversão do Facebook Pixel ORIGINAL (787096354071974) com Advanced Matching
    const trackFacebookConversionOriginal = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // Re-inicializar pixel com Advanced Matching se temos dados do usuário
        if (userEmail || userPhone) {
          (window as any).fbq('init', '787096354071974', advancedMatchingData);
          console.log('✅ [PIXEL 1] Facebook Pixel 787096354071974 init com Advanced Matching:', advancedMatchingData);
        }
        
        // Disparar evento Purchase usando trackSingle para garantir parâmetros corretos
        (window as any).fbq('trackSingle', '787096354071974', 'Purchase', purchaseParams);
        console.log('✅ [PIXEL 1] Facebook Pixel 787096354071974 Purchase event tracked - Value: R$ 297,00');
        return true;
      }
      return false;
    };

    // Função para disparar conversão do NOVO Facebook Pixel (782038007591576)
    const trackFacebookConversionNew = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // Inicializar o segundo pixel com Advanced Matching se temos dados
        if (userEmail || userPhone) {
          (window as any).fbq('init', '782038007591576', advancedMatchingData);
          console.log('✅ [PIXEL 2] Facebook Pixel 782038007591576 init com Advanced Matching:', advancedMatchingData);
        } else {
          (window as any).fbq('init', '782038007591576');
          console.log('✅ [PIXEL 2] Facebook Pixel 782038007591576 inicializado');
        }
        
        // Disparar evento Purchase usando trackSingle para garantir parâmetros corretos
        (window as any).fbq('trackSingle', '782038007591576', 'Purchase', purchaseParams);
        console.log('✅ [PIXEL 2] Facebook Pixel 782038007591576 Purchase event tracked - Value: R$ 297,00');
        return true;
      }
      return false;
    };

    // Função para disparar conversões do Google (GA4 + Google Ads)
    const trackGoogleConversion = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // GA4 - Evento purchase padrão e-commerce (correto para conversões)
        (window as any).gtag('event', 'purchase', {
          transaction_id: `txn_${Date.now()}`,
          value: 297.0,
          currency: 'BRL',
          items: [{
            item_name: 'Curso Informática na Prática',
            price: 297.0,
            quantity: 1
          }]
        });
        console.log('✅ [GA4] purchase event disparado - R$ 297,00');
        
        // Pageview da página de obrigado
        (window as any).gtag('config', 'G-08B5E33G3F', {
          page_path: '/obrigada',
          page_title: 'Obrigada - Compra Confirmada'
        });
        
        // Google Ads - Conversão de venda
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17641842157/fmoACInw160bEO3LpNxB',
          'value': 297.0,
          'currency': 'BRL',
          'transaction_id': `txn_${Date.now()}`
        });
        console.log('✅ [GAds] conversion event disparado - R$ 297,00');
        
        // Google Ads - Conversão de matrícula
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-17641842157/B6aWCPfmzr0bEO3LpNxB',
          'value': 1.0,
          'currency': 'BRL',
          'transaction_id': `txn_${Date.now()}`
        });
        console.log('✅ [GAds] matrícula conversion disparado');
        
        return true;
      }
      return false;
    };

    // Tentar disparar Facebook Pixel ORIGINAL imediatamente ou com retry
    if (!trackFacebookConversionOriginal()) {
      console.log('⏳ [PIXEL 1] Aguardando fbq carregar...');
      let fbAttempts = 0;
      const fbInterval = setInterval(() => {
        fbAttempts++;
        if (trackFacebookConversionOriginal()) {
          clearInterval(fbInterval);
        } else if (fbAttempts >= 50) {
          console.error('❌ [PIXEL 1] fbq não carregou após 5s - Purchase perdido');
          clearInterval(fbInterval);
        }
      }, 100);
    }

    // Tentar disparar NOVO Facebook Pixel imediatamente ou com retry
    if (!trackFacebookConversionNew()) {
      console.log('⏳ [PIXEL 2] Aguardando fbq carregar para novo pixel...');
      let fbAttempts2 = 0;
      const fbInterval2 = setInterval(() => {
        fbAttempts2++;
        if (trackFacebookConversionNew()) {
          clearInterval(fbInterval2);
        } else if (fbAttempts2 >= 50) {
          console.error('❌ [PIXEL 2] fbq não carregou após 5s - Purchase perdido');
          clearInterval(fbInterval2);
        }
      }, 100);
    }

    // Tentar disparar Google Analytics/Ads imediatamente ou com retry
    if (!trackGoogleConversion()) {
      console.log('⏳ [GA4/GAds] Aguardando gtag carregar...');
      let gtagAttempts = 0;
      const gtagInterval = setInterval(() => {
        gtagAttempts++;
        if (trackGoogleConversion()) {
          clearInterval(gtagInterval);
        } else if (gtagAttempts >= 50) {
          console.error('❌ [GA4/GAds] gtag não carregou após 5s - conversão perdida');
          clearInterval(gtagInterval);
        }
      }, 100);
    }

    return () => {
      // Cleanup handled by individual intervals
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>Obrigada pela sua compra! - Informática na Prática</title>
        <meta name="description" content="Parabéns! Sua compra foi confirmada. Você receberá um e-mail com as credenciais de acesso ao curso em até 5 minutos." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://informaticanapratica.com.br/obrigada" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Obrigada pela sua compra! - Informática na Prática" />
        <meta property="og:description" content="Parabéns! Sua compra foi confirmada." />
        <meta property="og:url" content="https://informaticanapratica.com.br/obrigada" />
        
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17641842157"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17641842157');
          `}
        </script>
        
        {/* Meta Pixel Code - Novo Pixel 782038007591576 */}
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '782038007591576');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=782038007591576&ev=PageView&noscript=1" />`}
        </noscript>
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="h-20 mx-auto"
          />
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
            Compra Confirmada! Parabéns!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Seu acesso foi liberado! Enviamos suas credenciais para o e-mail cadastrado.
          </p>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground">
              ⏱️ <strong>Importante:</strong> As credenciais de acesso chegarão em até 5 minutos. 
              Verifique sua caixa de entrada e a pasta de spam.
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
              ⚠️ <strong>Não esquece:</strong> Verifique também a caixa de <strong>SPAM</strong> ou <strong>Promoções</strong>!
            </p>
          </div>
          <div className="bg-card border border-line rounded-xl p-6 text-left">
            <h3 className="font-semibold text-lg mb-2 text-primary">🎓 Acesso ao curso</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✅ Acesso vitalício ao curso</li>
              <li>✅ Suporte direto da professora Elisa</li>
              <li>✅ Certificado incluso</li>
            </ul>
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
              Aguarde mais 5 minutos (processamento do sistema)
            </p>
            <p className="flex items-start gap-2">
              <span className="text-accent font-bold">3.</span>
              <strong>Clique para falar com o Suporte via WhatsApp</strong> — informe seu nome e e-mail usado na compra
            </p>
          </div>
          <a
            href="https://wa.me/5545988287082?text=Ol%C3%A1!%20Fiz%20a%20compra%20do%20curso%20mas%20n%C3%A3o%20recebi%20o%20e-mail%20com%20as%20credenciais.%20Meu%20nome%20%C3%A9%20____%20e%20o%20e-mail%20usado%20foi%20____"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-success hover:bg-success/90 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            📱 Falar com o Suporte no WhatsApp
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
    </>
  );
};

export default ThankYou;
