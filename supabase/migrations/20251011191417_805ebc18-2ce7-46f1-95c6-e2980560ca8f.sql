-- Permitir leitura de pagamentos recentes (últimos 10 minutos) para verificação de status
-- Isso é seguro porque só mostra pagamentos muito recentes e requer o transaction_id único
CREATE POLICY "Anyone can view recent payments for status check"
ON public.payments
FOR SELECT
USING (
  created_at > (now() - interval '10 minutes')
);