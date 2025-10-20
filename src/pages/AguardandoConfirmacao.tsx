import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock, CheckCircle2, FileText, Mail, Smartphone } from "lucide-react";
import logoImage from "@/assets/logo-new.png";

const AguardandoConfirmacao = () => {
  const [searchParams] = useSearchParams();
  const [elapsedTime, setElapsedTime] = useState(0);
  const paymentIntent = searchParams.get('payment_intent');
  const transactionId = searchParams.get('transaction_id');
  const method = searchParams.get('method') || 'boleto';

  useEffect(() => {
    // Timer para mostrar tempo decorrido
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            {method === 'pix' ? 'PIX Gerado com Sucesso! 🎉' : 'Boleto Gerado com Sucesso! 🎉'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {method === 'pix' 
              ? 'Seu PIX foi gerado. Complete o pagamento na aba que foi aberta.' 
              : 'Seu boleto foi gerado. Você receberá as instruções de pagamento por e-mail.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <div className="bg-card border border-line rounded-xl p-6 shadow-sm">
            <Mail className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Verifique seu E-mail</h3>
            <p className="text-sm text-muted-foreground">
              {method === 'pix' 
                ? 'Você receberá um e-mail de confirmação após o pagamento' 
                : 'Enviamos o boleto e as instruções para seu e-mail'}
            </p>
          </div>

          <div className="bg-card border border-line rounded-xl p-6 shadow-sm">
            <FileText className="w-8 h-8 text-primary mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">{method === 'pix' ? 'Pagamento Rápido' : 'Código de Barras'}</h3>
            <p className="text-sm text-muted-foreground">
              {method === 'pix' 
                ? 'O PIX é aprovado instantaneamente' 
                : 'Use o código de barras para pagar em qualquer banco'}
            </p>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-card border border-line rounded-xl p-6 text-left max-w-xl mx-auto shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Informações Importantes
          </h3>
          <ul className="text-sm text-foreground space-y-3">
            {method === 'pix' ? (
              <>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>O PIX é aprovado instantaneamente após o pagamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Complete o pagamento na aba que foi aberta</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Você receberá um e-mail de confirmação imediatamente</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>O acesso ao curso será liberado em até 5 minutos</span>
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
                  <span>O acesso ao curso será liberado automaticamente após a confirmação do pagamento</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>Guarde o número do boleto para acompanhamento</span>
                </li>
              </>
            )}
          </ul>
          
          {(paymentIntent || transactionId) && (
            <div className="mt-4 pt-4 border-t border-line">
              <p className="text-xs text-muted-foreground">
                Código do pagamento: <span className="font-mono">{paymentIntent || transactionId}</span>
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
          <p className="text-sm text-foreground">
            {method === 'pix' 
              ? '💡 Dica: O PIX é a forma mais rápida! Seu acesso será liberado em minutos.' 
              : '💡 Dica: Você pode pagar boletos pelo aplicativo do seu banco ou usando o Pix do código de barras para pagamento instantâneo.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AguardandoConfirmacao;
