import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface CardPaymentBrickTestProps {
  formData: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const CardPaymentBrickTest = ({ formData, amount, onSuccess, onError }: CardPaymentBrickTestProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initBrick = async () => {
      try {
        const { data: keyData } = await supabase.functions.invoke('get-mp-public-key');
        
        if (!keyData?.MERCADO_PAGO_PUBLIC_KEY) {
          throw new Error('Chave pública não encontrada');
        }

        const mp = new window.MercadoPago(keyData.MERCADO_PAGO_PUBLIC_KEY, {
          locale: 'pt-BR'
        });

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
                },
                firstName: firstName,
                lastName: lastName,
                address: {
                  zipCode: formData.cep.replace(/\D/g, ''),
                  streetName: formData.street,
                  streetNumber: formData.number,
                  neighborhood: formData.neighborhood,
                  city: formData.city,
                  federalUnit: formData.state
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
            options: {
              enableReviewStep: false,
              enableTwoStepPayment: false
            },
            features: {
              tdsV2: {
                enabled: true
              }
            },
            callbacks: {
              onReady: () => {
                console.log('Card Payment Brick ready');
                setLoading(false);
              },
              onSubmit: async (cardFormData: any) => {
                try {
                  console.log('Processing payment with address...', cardFormData);

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
                        } : undefined,
                        address: {
                          zip_code: formData.cep.replace(/\D/g, ''),
                          street_name: formData.street,
                          street_number: formData.number,
                          neighborhood: formData.neighborhood,
                          city: formData.city,
                          federal_unit: formData.state
                        }
                      },
                      additional_info: {
                        items: [{
                          id: "curso-informatica-idoso",
                          title: "Curso de Informática para Idosos",
                          description: "Aprenda a usar o computador do zero: Word, Excel, PowerPoint, Internet e muito mais",
                          category_id: "education",
                          quantity: 1,
                          unit_price: amount
                        }],
                        payer: {
                          first_name: firstName,
                          last_name: lastName,
                          phone: formData.phone ? {
                            area_code: formData.phone.replace(/\D/g, '').substring(0, 2),
                            number: formData.phone.replace(/\D/g, '').substring(2)
                          } : undefined,
                          address: {
                            zip_code: formData.cep.replace(/\D/g, ''),
                            street_name: formData.street,
                            street_number: parseInt(formData.number) || 0,
                            neighborhood: formData.neighborhood,
                            city: formData.city,
                            federal_unit: formData.state
                          }
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
                      title: "⏳ Pagamento pendente",
                      description: "Aguardando confirmação do banco...",
                    });
                    setTimeout(() => {
                      window.location.href = '/aguardando-confirmacao';
                    }, 2000);
                  } else {
                    throw new Error('Pagamento não foi aprovado. Tente novamente.');
                  }

                  onSuccess();
                } catch (error: any) {
                  console.error('Payment error:', error);
                  const errorMessage = error?.message || 'Erro ao processar pagamento';
                  toast({
                    title: "❌ Erro no pagamento",
                    description: errorMessage,
                    variant: "destructive"
                  });
                  onError(errorMessage);
                  return false;
                }
              },
              onError: (error: any) => {
                console.error('Brick error:', error);
                const errorMessage = 'Erro ao carregar formulário de pagamento';
                toast({
                  title: "❌ Erro",
                  description: errorMessage,
                  variant: "destructive"
                });
                onError(errorMessage);
              }
            }
          };

          await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };

        renderCardPaymentBrick();
      } catch (error: any) {
        console.error('Error initializing brick:', error);
        const errorMessage = error?.message || 'Erro ao inicializar pagamento';
        toast({
          title: "❌ Erro",
          description: errorMessage,
          variant: "destructive"
        });
        onError(errorMessage);
      }
    };

    initBrick();
  }, [formData, amount, onSuccess, onError, toast]);

  return (
    <div className="space-y-6">
      {/* Valor do Curso */}
      <div className="text-center py-4 bg-primary/5 rounded-lg border-2 border-primary/20">
        <div className="text-4xl font-black text-primary mb-1">
          R$ {amount.toFixed(2).replace('.', ',')}
        </div>
        <div className="text-sm text-muted-foreground">
          Acesso completo por 2 anos • Certificado incluso
        </div>
        <div className="text-xs text-primary font-semibold mt-1">
          Parcele em até 12x no cartão
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <div id="cardPaymentBrick_container"></div>
    </div>
  );
};