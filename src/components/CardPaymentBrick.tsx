import { useEffect, useState } from "react";
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
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const CardPaymentBrick = ({ formData, amount, onSuccess, onError }: CardPaymentBrickProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initBrick = async () => {
      try {
        // Buscar chave pública
        const { data: keyData } = await supabase.functions.invoke('get-mp-public-key');
        
        if (!keyData?.MERCADO_PAGO_PUBLIC_KEY) {
          throw new Error('Chave pública não encontrada');
        }

        const mp = new window.MercadoPago(keyData.MERCADO_PAGO_PUBLIC_KEY, {
          locale: 'pt-BR'
        });

        // Separar nome e sobrenome
        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || nameParts[0];

        const bricksBuilder = mp.bricks();

        const renderCardPaymentBrick = async () => {
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
                  excluded: [], // Não excluir nenhum método
                  included: ['credit_card', 'debit_card'] // Incluir cartão de crédito e débito
                }
              }
            },
            callbacks: {
              onReady: () => {
                console.log('Card Payment Brick ready');
                setLoading(false);
              },
              onSubmit: async (cardFormData: any) => {
                try {
                  console.log('Processing payment...', cardFormData);

                  // Criar o pagamento via edge function
                  const { data, error } = await supabase.functions.invoke('process-card-payment', {
                    body: {
                      token: cardFormData.token,
                      transaction_amount: amount,
                      installments: cardFormData.installments,
                      payment_method_id: cardFormData.payment_method_id,
                      issuer_id: cardFormData.issuer_id,
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
                        } : undefined
                      }
                    }
                  });

                  if (error) throw error;

                  if (data?.status === 'approved') {
                    toast({
                      title: "✅ Pagamento aprovado!",
                      description: "Redirecionando...",
                    });
                    setTimeout(() => {
                      window.location.href = '/obrigada';
                    }, 1500);
                  } else if (data?.status === 'pending') {
                    toast({
                      title: "Pagamento em análise",
                      description: "Você receberá um e-mail quando for aprovado",
                    });
                    setTimeout(() => {
                      window.location.href = '/aguardando';
                    }, 2000);
                  } else {
                    throw new Error(data?.status_detail || 'Pagamento não aprovado');
                  }

                  return data;
                } catch (err: any) {
                  console.error('Payment error:', err);
                  toast({
                    title: "Erro no pagamento",
                    description: err.message || "Tente novamente ou use outro cartão",
                    variant: "destructive"
                  });
                  onError(err.message);
                  throw err;
                }
              },
              onError: (error: any) => {
                console.error('Brick error:', error);
                toast({
                  title: "Erro",
                  description: "Erro ao processar pagamento",
                  variant: "destructive"
                });
                onError(error.message);
              }
            }
          };

          await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };

        renderCardPaymentBrick();

      } catch (error: any) {
        console.error('Error initializing brick:', error);
        setLoading(false);
        onError(error.message);
      }
    };

    if (window.MercadoPago) {
      initBrick();
    }
  }, [formData, amount, onSuccess, onError, toast]);

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
