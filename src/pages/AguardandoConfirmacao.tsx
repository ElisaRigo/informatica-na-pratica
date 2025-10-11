import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo-new.png";

const AguardandoConfirmacao = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'confirmed' | 'timeout'>('checking');
  const [elapsedTime, setElapsedTime] = useState(0);
  const transactionId = searchParams.get('transaction_id') || searchParams.get('id');

  useEffect(() => {
    // Timer para mostrar tempo decorrido
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!transactionId) {
      console.log('No transaction ID found, checking for any recent payment');
    }

    let attempts = 0;
    const maxAttempts = 36; // 3 minutos (36 * 5 segundos)

    const checkPayment = async () => {
      attempts++;
      console.log(`Checking payment... Attempt ${attempts}/${maxAttempts}`);

      try {
        let query = supabase
          .from('payments')
          .select('*')
          .eq('status', 'paid')
          .order('created_at', { ascending: false })
          .limit(1);

        // Se tiver transaction_id, busca específico, senão busca o mais recente
        if (transactionId) {
          query = query.eq('pagseguro_transaction_id', transactionId);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error checking payment:', error);
          return;
        }

        if (data && data.length > 0) {
          console.log('Payment confirmed!', data[0]);
          setStatus('confirmed');
          
          // Aguarda 2 segundos para mostrar a confirmação antes de redirecionar
          setTimeout(() => {
            navigate('/obrigada');
          }, 2000);
          
          return true; // Para o polling
        }

        // Timeout após 3 minutos
        if (attempts >= maxAttempts) {
          console.log('Timeout reached, redirecting to thank you page');
          setStatus('timeout');
          setTimeout(() => {
            navigate('/obrigada');
          }, 3000);
          return true; // Para o polling
        }

        return false; // Continua o polling
      } catch (err) {
        console.error('Error in checkPayment:', err);
        return false;
      }
    };

    // Verificação inicial
    checkPayment();

    // Polling a cada 5 segundos
    const interval = setInterval(async () => {
      const shouldStop = await checkPayment();
      if (shouldStop) {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [transactionId, navigate]);

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
            {status === 'checking' && (
              <Loader2 className="w-24 h-24 text-primary relative animate-spin" />
            )}
            {status === 'confirmed' && (
              <CheckCircle2 className="w-24 h-24 text-success relative animate-bounce" />
            )}
            {status === 'timeout' && (
              <Clock className="w-24 h-24 text-accent relative" />
            )}
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          {status === 'checking' && (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                Aguardando confirmação do pagamento...
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Estamos processando seu pagamento. Isso geralmente leva alguns segundos.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
              </div>
            </>
          )}
          {status === 'confirmed' && (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-success">
                Pagamento confirmado! ✅
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Redirecionando você agora...
              </p>
            </>
          )}
          {status === 'timeout' && (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                Processando seu pagamento...
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                Seu pagamento está sendo processado. Você receberá um e-mail em breve!
              </p>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className="bg-card border border-line rounded-xl p-6 text-left max-w-xl mx-auto">
          <h3 className="font-semibold text-lg mb-2 text-primary">ℹ️ O que está acontecendo?</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>✓ Seu pagamento foi enviado ao PagSeguro</li>
            <li>✓ Estamos aguardando a confirmação</li>
            <li>✓ Quando confirmado, sua matrícula será criada automaticamente</li>
            <li>✓ Você receberá um e-mail com suas credenciais de acesso</li>
          </ul>
        </div>

        {/* Support Info */}
        <div className="pt-8 border-t border-line">
          <p className="text-sm text-muted-foreground mb-2">
            Está demorando muito? Entre em contato:
          </p>
          <a
            href="https://wa.me/5545988287082"
            className="text-primary hover:text-accent transition-colors font-medium text-lg"
          >
            WhatsApp: (45) 98828-7082
          </a>
        </div>
      </div>
    </div>
  );
};

export default AguardandoConfirmacao;
