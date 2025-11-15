import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface CardPaymentBrickProps {
  formData: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    address: {
      zip_code: string;
      street_name: string;
      street_number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
  amount: number;
  deviceId?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const CardPaymentBrick = ({ formData, amount, deviceId, onSuccess, onError }: CardPaymentBrickProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  // Usar refs para callbacks que mudam
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);
  
  useEffect(() => {
    onErrorRef.current = onError;
    onSuccessRef.current = onSuccess;
  }, [onError, onSuccess]);
  
  // Wrapper estável para toast
  const showToast = useCallback((params: any) => {
    toast(params);
  }, [toast]);

  useEffect(() => {
    if (initialized) return;
    
    let mounted = true;
    let sdkCheckInterval: NodeJS.Timeout;
    let sdkTimeout: NodeJS.Timeout;

    const initBrick = async () => {
      try {
        if (!mounted) return;
        
        console.log('🔧 Initializing Card Payment Brick...');
        
        if (!window.MercadoPago) {
          console.error('❌ Mercado Pago SDK not loaded');
          throw new Error('SDK do Mercado Pago não carregado');
        }

        const { data: keyData, error: keyError } = await supabase.functions.invoke('get-mp-public-key');
        
        if (!mounted) return;
        
        if (keyError || !keyData?.MERCADO_PAGO_PUBLIC_KEY) {
          console.error('❌ Error fetching public key');
          throw new Error('Erro ao buscar chave pública');
        }

        console.log('✅ Public key fetched');
        
        const mp = new window.MercadoPago(keyData.MERCADO_PAGO_PUBLIC_KEY, {
          locale: 'pt-BR'
        });

        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || nameParts[0];

        const bricksBuilder = mp.bricks();

        const settings = {
          initialization: {
            amount: amount,
            payer: {
              email: formData.email,
              identification: {
                type: 'CPF',
                number: formData.cpf.replace(/\D/g, '')
              }
            }
          },
          customization: {
            visual: {
              style: {
                theme: 'default'
              }
            },
            paymentMethods: {
              maxInstallments: 12,
              minInstallments: 1,
              types: {
                excluded: [],
                included: ['credit_card', 'debit_card']
              }
            }
          },
          callbacks: {
            onReady: () => {
              if (!mounted) return;
              console.log('✅ Brick ready');
              setLoading(false);
            },
            onSubmit: async (cardFormData: any) => {
              try {
                console.log('🔄 Processing payment...');

                const { data, error } = await supabase.functions.invoke('process-card-payment', {
                  body: {
                    token: cardFormData.token,
                    transaction_amount: amount,
                    installments: cardFormData.installments,
                    payment_method_id: cardFormData.payment_method_id,
                    issuer_id: cardFormData.issuer_id,
                    device_id: deviceId,
                    payer: {
                      email: formData.email,
                      identification: {
                        type: 'CPF',
                        number: formData.cpf.replace(/\D/g, '')
                      },
                      first_name: firstName,
                      last_name: lastName,
                      phone: formData.phone ? {
                        area_code: formData.phone.replace(/\D/g, '').substring(0, 2),
                        number: formData.phone.replace(/\D/g, '').substring(2)
                      } : undefined,
                      address: {
                        zip_code: formData.address.zip_code,
                        street_name: formData.address.street_name,
                        street_number: formData.address.street_number,
                        neighborhood: formData.address.neighborhood,
                        city: formData.address.city,
                        federal_unit: formData.address.state,
                      }
                    }
                  }
                });

                if (error) {
                  console.error('❌ Error:', error);
                  throw error;
                }

                if (data?.status === 'approved') {
                  showToast({
                    title: "✅ Pagamento aprovado!",
                    description: "Redirecionando...",
                  });
                  setTimeout(() => {
                    window.location.href = '/obrigada';
                  }, 1500);
                } else if (data?.status === 'pending') {
                  showToast({
                    title: "Pagamento em análise",
                    description: "Você receberá um e-mail quando for aprovado",
                  });
                  setTimeout(() => {
                    window.location.href = '/aguardando';
                  }, 2000);
                } else {
                  const statusDetail = data?.status_detail || '';
                  let errorMessage = 'Pagamento não aprovado';
                  
                  if (statusDetail.includes('cc_rejected_high_risk')) {
                    errorMessage = 'Pagamento recusado por segurança. Tente outro cartão.';
                  } else if (statusDetail.includes('cc_rejected_insufficient_amount')) {
                    errorMessage = 'Saldo insuficiente.';
                  } else if (statusDetail.includes('cc_rejected_bad_filled')) {
                    errorMessage = 'Dados incorretos. Verifique e tente novamente.';
                  } else if (statusDetail.includes('cc_rejected_card_disabled')) {
                    errorMessage = 'Cartão desabilitado.';
                  } else if (statusDetail) {
                    errorMessage = statusDetail;
                  }
                  
                  showToast({
                    variant: "destructive",
                    title: "Erro no pagamento",
                    description: errorMessage,
                  });
                  throw new Error(errorMessage);
                }

                return data;
              } catch (err: any) {
                console.error('❌ Payment error:', err);
                const errorMessage = err.message || "Erro ao processar pagamento";
                showToast({
                  title: "Erro no pagamento",
                  description: errorMessage,
                  variant: "destructive"
                });
                onErrorRef.current(errorMessage);
                throw err;
              }
            },
            onError: (error: any) => {
              if (!mounted) return;
              console.error('❌ Brick error:', error);
              
              let errorMessage = "Erro ao processar pagamento";
              if (error.message) {
                errorMessage = error.message;
              } else if (error.cause && error.cause[0]) {
                errorMessage = error.cause[0].description || errorMessage;
              }
              
              showToast({
                title: "Erro",
                description: errorMessage,
                variant: "destructive"
              });
              onErrorRef.current(errorMessage);
            }
          }
        };

        await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        console.log('✅ Brick created');
        setInitialized(true);

      } catch (error: any) {
        if (!mounted) return;
        
        console.error('❌ Init error:', error);
        setLoading(false);
        
        let errorMessage = error.message || 'Erro ao inicializar pagamento';
        
        showToast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive"
        });
        
        onErrorRef.current(errorMessage);
      }
    };

    sdkCheckInterval = setInterval(() => {
      if (window.MercadoPago) {
        clearInterval(sdkCheckInterval);
        initBrick();
      }
    }, 100);

    sdkTimeout = setTimeout(() => {
      clearInterval(sdkCheckInterval);
      if (!window.MercadoPago && mounted) {
        console.error('❌ SDK timeout');
        setLoading(false);
        showToast({
          title: "Erro",
          description: "Erro ao carregar pagamento. Recarregue a página.",
          variant: "destructive"
        });
        onErrorRef.current('Timeout');
      }
    }, 10000);

    return () => {
      mounted = false;
      if (sdkCheckInterval) clearInterval(sdkCheckInterval);
      if (sdkTimeout) clearTimeout(sdkTimeout);
    };
  }, [
    initialized, 
    formData.name, 
    formData.email, 
    formData.cpf, 
    formData.phone,
    formData.address.zip_code,
    formData.address.street_name,
    formData.address.street_number,
    formData.address.neighborhood,
    formData.address.city,
    formData.address.state,
    amount, 
    deviceId, 
    showToast
  ]);

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Carregando formulário de pagamento...</p>
        </div>
      )}
      <div id="cardPaymentBrick_container"></div>
    </div>
  );
};
