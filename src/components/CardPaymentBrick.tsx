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
  deviceId?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const CardPaymentBrick = ({ formData, amount, deviceId, onSuccess, onError }: CardPaymentBrickProps) => {
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
                  console.log('Device ID:', deviceId);

                  // Criar o pagamento via edge function
                  const { data, error } = await supabase.functions.invoke('process-card-payment', {
                    body: {
                      token: cardFormData.token,
                      transaction_amount: amount,
                      installments: cardFormData.installments,
                      payment_method_id: cardFormData.payment_method_id,
                      issuer_id: cardFormData.issuer_id,
                      device_id: deviceId, // CRÍTICO: Enviar Device ID
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
                    // Mapear códigos de erro para mensagens amigáveis
                    let errorMessage = 'Pagamento não aprovado';
                    let errorTitle = 'Erro no pagamento';
                    
                    const statusDetail = data?.status_detail || '';
                    
                    if (statusDetail.includes('cc_rejected_high_risk')) {
                      errorTitle = 'Pagamento Recusado por Segurança';
                      errorMessage = 'Seu pagamento foi recusado por questões de segurança. Por favor, tente com outro cartão ou entre em contato com seu banco.';
                    } else if (statusDetail.includes('cc_rejected_insufficient_amount')) {
                      errorTitle = 'Saldo Insuficiente';
                      errorMessage = 'Seu cartão não possui saldo suficiente. Por favor, tente com outro cartão.';
                    } else if (statusDetail.includes('cc_rejected_bad_filled')) {
                      errorTitle = 'Dados Incorretos';
                      errorMessage = 'Verifique os dados do cartão e tente novamente.';
                    } else if (statusDetail.includes('cc_rejected_card_disabled')) {
                      errorTitle = 'Cartão Desabilitado';
                      errorMessage = 'Seu cartão está desabilitado. Entre em contato com seu banco.';
                    } else if (statusDetail.includes('cc_rejected_invalid_installments')) {
                      errorTitle = 'Parcelas Inválidas';
                      errorMessage = 'O número de parcelas selecionado não é válido para este cartão.';
                    } else if (statusDetail.includes('cc_rejected_blacklist')) {
                      errorTitle = 'Pagamento Bloqueado';
                      errorMessage = 'Não foi possível processar seu pagamento. Tente com outro cartão.';
                    } else {
                      errorMessage = statusDetail || errorMessage;
                    }
                    
                    toast({
                      variant: "destructive",
                      title: errorTitle,
                      description: errorMessage,
                    });
                    throw new Error(errorMessage);
                  }

                  return data;
                } catch (err: any) {
                  console.error('Payment error:', err);
                  
                  // Se já temos uma mensagem de erro específica, usar ela
                  const errorMessage = err.message || "Tente novamente ou use outro cartão";
                  const errorTitle = errorMessage.includes('Segurança') || 
                                   errorMessage.includes('Insuficiente') || 
                                   errorMessage.includes('Incorretos') ||
                                   errorMessage.includes('Desabilitado') ||
                                   errorMessage.includes('Parcelas') ||
                                   errorMessage.includes('Bloqueado')
                    ? err.message.split(':')[0] || "Erro no pagamento"
                    : "Erro no pagamento";
                  
                  toast({
                    title: errorTitle === err.message ? "Erro no pagamento" : errorTitle,
                    description: errorMessage,
                    variant: "destructive"
                  });
                  onError(errorMessage);
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
