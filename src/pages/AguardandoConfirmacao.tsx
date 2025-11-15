import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, CheckCircle2, FileText, Mail, Smartphone, Copy } from "lucide-react";
import logoImage from "@/assets/logo-new.png";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const AguardandoConfirmacao = () => {
  const [searchParams] = useSearchParams();
  const [elapsedTime, setElapsedTime] = useState(0);
  const paymentIntent = searchParams.get('payment_intent');
  const transactionId = searchParams.get('transaction_id');
  const qrCode = searchParams.get('qr_code');
  const paymentMethod = searchParams.get('method') || 'boleto'; // 'boleto', 'pix', 'card'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Timer para mostrar tempo decorrido
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Verificar automaticamente se o pagamento foi aprovado
  useEffect(() => {
    if (!paymentIntent && !transactionId) return;

    const checkPaymentStatus = async () => {
      try {
        const paymentId = paymentIntent || transactionId;
        if (!paymentId) return;

        console.log('🔍 Verificando status do pagamento:', paymentId);

        const { data: payment, error } = await supabase
          .from('payments')
          .select('status')
          .eq('pagseguro_transaction_id', paymentId)
          .maybeSingle();

        if (error) {
          console.error('Erro ao verificar pagamento:', error);
          return;
        }

        if (payment?.status === 'approved') {
          console.log('✅ Pagamento aprovado! Redirecionando...');
          window.location.href = '/obrigada';
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error);
      }
    };

    // Verificar imediatamente
    checkPaymentStatus();

    // Continuar verificando a cada 5 segundos por até 10 minutos
    const intervalId = setInterval(checkPaymentStatus, 5000);
    const timeoutId = setTimeout(() => clearInterval(intervalId), 600000); // 10 minutos

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [paymentIntent, transactionId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

        {/* Status Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
            <CheckCircle2 className="w-24 h-24 text-success relative" />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
            {paymentMethod === 'card' ? 'Pagamento em Análise! 🔍' : 
             paymentMethod === 'pix' ? 'PIX Gerado com Sucesso! 🎉' : 
             'Boleto Gerado com Sucesso! 🎉'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {paymentMethod === 'card' ? 'Seu pagamento está sendo analisado. Você será redirecionado automaticamente quando for aprovado.' :
             paymentMethod === 'pix' ? 'Escaneie o QR Code abaixo ou copie o código PIX para pagar. Você será redirecionado automaticamente após o pagamento.' :
             'Seu boleto foi gerado. Você receberá as instruções de pagamento por e-mail.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* QR Code PIX */}
        {paymentMethod === 'pix' && qrCode && (
          <div className="bg-card border border-line rounded-xl p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-4 text-center">Código PIX</h3>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="text-xs break-all font-mono text-black p-2 bg-gray-50 rounded border">
                {qrCode}
              </div>
            </div>
            <Button 
              onClick={copyToClipboard}
              className="w-full"
              variant="default"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Código Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código PIX
                </>
              )}
            </Button>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <div className="bg-card border border-line rounded-xl p-6">
            <Mail className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Verifique seu E-mail</h3>
            <p className="text-sm text-muted-foreground">
              {paymentMethod === 'card' ? 'Enviaremos a confirmação do pagamento para seu e-mail' :
               `Enviamos o ${paymentMethod === 'pix' ? 'código PIX' : 'boleto'} e as instruções para seu e-mail`}
            </p>
          </div>

          <div className="bg-card border border-line rounded-xl p-6">
            <Smartphone className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">
              {paymentMethod === 'card' ? 'Análise Automática' : 
               paymentMethod === 'pix' ? 'Pagamento Instantâneo' : 
               'Código de Barras'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {paymentMethod === 'card' ? 'Nosso sistema está verificando o pagamento' :
               paymentMethod === 'pix' ? 'Após o pagamento, o acesso é liberado automaticamente' :
               'Use o código de barras para pagar em qualquer banco'}
            </p>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-card border border-line rounded-xl p-6 text-left max-w-xl mx-auto">
          <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informações Importantes
          </h3>
          <ul className="text-sm text-muted-foreground space-y-3">
            {paymentMethod === 'card' ? (
              <>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Estamos verificando automaticamente o status do seu pagamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Você será redirecionado automaticamente assim que o pagamento for aprovado</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>A análise pode levar até 24-48 horas. Você também receberá um e-mail de confirmação</span>
                </li>
              </>
            ) : paymentMethod === 'pix' ? (
              <>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Escaneie o QR Code ou copie o código PIX acima para pagar</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Você será redirecionado automaticamente assim que o pagamento for confirmado</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>A confirmação geralmente é instantânea após o pagamento</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>O boleto pode levar até 3 dias úteis para ser compensado após o pagamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Você receberá um e-mail de confirmação assim que o pagamento for identificado</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Após a confirmação, você receberá os dados de acesso ao curso por e-mail</span>
                </li>
              </>
            )}
          </ul>
          
          {paymentIntent && (
            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-xs text-muted-foreground">
                Código do pagamento: <span className="font-mono">{paymentIntent}</span>
              </p>
            </div>
          )}
        </div>

        {/* Support Info */}
        <div className="pt-8 border-t border-line">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Dúvidas ou problemas com o pagamento?
            </p>
          </div>
          <a
            href="https://wa.me/5545988287082"
            className="text-primary hover:text-accent transition-colors font-medium text-lg inline-flex items-center gap-2"
          >
            WhatsApp: (45) 98828-7082
          </a>
        </div>

        {/* Additional Note */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Dica:</strong> Você pode pagar boletos pelo aplicativo do seu banco ou usando o Pix do código de barras para pagamento instantâneo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AguardandoConfirmacao;
