import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, Lock, ShieldCheck, CheckCircle2, AlertCircle, QrCode, FileText } from "lucide-react";
import logoImage from "@/assets/logo-new.png";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Declaração TypeScript para a biblioteca PagSeguro
declare global {
  interface Window {
    PagSeguroDirectPayment: {
      setSessionId: (sessionId: string) => void;
      onSenderHashReady: (callback: (response: any) => void) => void;
      createCardToken: (params: {
        cardNumber: string;
        brand: string;
        cvv: string;
        expirationMonth: string;
        expirationYear: string;
        success: (response: any) => void;
        error: (response: any) => void;
      }) => void;
      getBrand: (params: {
        cardBin: string;
        success: (response: any) => void;
        error: (response: any) => void;
      }) => void;
    };
  }
}


export const CheckoutTransparente = () => {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [sessionId, setSessionId] = useState<string>('');
  const [senderHash, setSenderHash] = useState<string>('');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const [cardData, setCardData] = useState({
    number: "",
    holder: "",
    expMonth: "",
    expYear: "",
    cvv: ""
  });

  // Inicializar sessão do PagSeguro
  useEffect(() => {
    const initPagSeguro = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('pagseguro-session');
        
        if (error) throw error;
        
        if (data?.sessionId) {
          setSessionId(data.sessionId);
          
          // Aguardar biblioteca carregar
          const checkLibrary = setInterval(() => {
            if (window.PagSeguroDirectPayment) {
              clearInterval(checkLibrary);
              window.PagSeguroDirectPayment.setSessionId(data.sessionId);
              
              // Obter sender hash
              window.PagSeguroDirectPayment.onSenderHashReady((response) => {
                if (response.status === 'error') {
                  console.error('Erro ao gerar sender hash:', response.message);
                  return;
                }
                setSenderHash(response.senderHash);
                console.log('Sender hash gerado com sucesso');
              });
            }
          }, 100);
          
          // Timeout de segurança
          setTimeout(() => clearInterval(checkLibrary), 10000);
        }
      } catch (error) {
        console.error('Erro ao inicializar PagSeguro:', error);
        toast({
          title: "Erro ao inicializar pagamento",
          description: "Recarregue a página e tente novamente",
          variant: "destructive"
        });
      }
    };

    initPagSeguro();
  }, [toast]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos pessoais são obrigatórios",
        variant: "destructive"
      });
      return false;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanCPF = formData.cpf.replace(/\D/g, '');

    if (cleanPhone.length !== 11) {
      toast({
        title: "Telefone inválido",
        description: "Digite um telefone válido com DDD",
        variant: "destructive"
      });
      return false;
    }

    if (cleanCPF.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (!cardData.number || !cardData.holder || !cardData.expMonth || !cardData.expYear || !cardData.cvv) {
      toast({
        title: "Dados do cartão incompletos",
        description: "Preencha todos os dados do cartão",
        variant: "destructive"
      });
      return;
    }

    if (!sessionId || !senderHash) {
      toast({
        title: "Sessão não inicializada",
        description: "Aguarde um momento e tente novamente",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Obter bandeira do cartão
      const cardBin = cardData.number.replace(/\s/g, '').substring(0, 6);
      
      await new Promise<string>((resolve, reject) => {
        window.PagSeguroDirectPayment.getBrand({
          cardBin: cardBin,
          success: (response) => {
            const brand = response.brand.name;
            console.log('Bandeira detectada:', brand);
            
            // Criar token do cartão
            window.PagSeguroDirectPayment.createCardToken({
              cardNumber: cardData.number.replace(/\s/g, ''),
              brand: brand,
              cvv: cardData.cvv,
              expirationMonth: cardData.expMonth,
              expirationYear: cardData.expYear,
              success: async (tokenResponse) => {
                console.log('Token gerado:', tokenResponse.card.token);
                
                // Processar pagamento com token
                const { data, error } = await supabase.functions.invoke('pagseguro-transparent-checkout', {
                  body: {
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone.replace(/\D/g, ''),
                    customerCPF: formData.cpf.replace(/\D/g, ''),
                    cardToken: tokenResponse.card.token,
                    senderHash: senderHash,
                    installments: 1
                  }
                });

                if (error) throw error;

                if (data?.success) {
                  toast({
                    title: "Pagamento processado!",
                    description: "Redirecionando para confirmação...",
                  });
                  setTimeout(() => {
                    window.location.href = '/obrigado';
                  }, 1500);
                  resolve(tokenResponse.card.token);
                } else {
                  throw new Error(data?.error || 'Erro ao processar pagamento');
                }
              },
              error: (tokenError) => {
                console.error('Erro ao criar token:', tokenError);
                reject(new Error('Erro ao processar dados do cartão'));
              }
            });
          },
          error: (brandError) => {
            console.error('Erro ao detectar bandeira:', brandError);
            reject(new Error('Cartão inválido'));
          }
        });
      });

    } catch (error) {
      console.error('Erro no pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: error instanceof Error ? error.message : "Verifique os dados e tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('pagseguro-pix-boleto', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone.replace(/\D/g, ''),
          customerCPF: formData.cpf.replace(/\D/g, ''),
          paymentMethod: 'pix'
        }
      });

      if (error) throw error;

      if (data?.paymentUrl) {
        toast({
          title: "Redirecionando para o Pix",
          description: "Você será direcionado para gerar o QR Code",
        });
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Erro ao gerar Pix');
      }
    } catch (error) {
      console.error('Erro no Pix:', error);
      toast({
        title: "Erro ao gerar Pix",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBoletoPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('pagseguro-pix-boleto', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone.replace(/\D/g, ''),
          customerCPF: formData.cpf.replace(/\D/g, ''),
          paymentMethod: 'boleto'
        }
      });

      if (error) throw error;

      if (data?.paymentUrl) {
        toast({
          title: "Redirecionando para o Boleto",
          description: "Você será direcionado para gerar o boleto",
        });
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Erro ao gerar Boleto');
      }
    } catch (error) {
      console.error('Erro no Boleto:', error);
      toast({
        title: "Erro ao gerar Boleto",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com Logo e Valor - Centralizado */}
      <div className="text-center pb-6 border-b-2 border-primary/10">
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <img src={logoImage} alt="Informática na Prática" className="h-12 w-auto" />
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground">Pagamento Seguro</h3>
            <p className="text-sm text-foreground/70">Informática na Prática</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-5 max-w-md mx-auto border border-primary/20">
          <p className="text-sm font-semibold text-foreground mb-2">Valor total do curso:</p>
          <p className="text-4xl font-black text-gradient mb-2">R$ 297,00</p>
          <p className="text-sm text-foreground/80 font-medium">ou em até 12x no cartão*</p>
          <p className="text-xs text-foreground/60 mt-1">*parcelamento sujeito a juros da operadora</p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Pagamento Seguro</h4>
            <p className="text-xs text-foreground/70">Certificado PCI-DSS</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Acesso Imediato</h4>
            <p className="text-xs text-foreground/70">Após confirmação</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Dados Protegidos</h4>
            <p className="text-xs text-foreground/70">Criptografia SSL</p>
          </CardContent>
        </Card>
      </div>

      {/* Escolha do Método de Pagamento */}
      <Tabs value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="card" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Cartão
          </TabsTrigger>
          <TabsTrigger value="pix" className="gap-2">
            <QrCode className="w-4 h-4" />
            Pix
          </TabsTrigger>
          <TabsTrigger value="boleto" className="gap-2">
            <FileText className="w-4 h-4" />
            Boleto
          </TabsTrigger>
        </TabsList>

        {/* Formulário Principal */}
        <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="pt-6 pb-6">
            {/* Dados Pessoais */}
            <div className="space-y-4 bg-muted/20 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">Seus Dados</h3>
              </div>
    
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone com DDD *</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                    maxLength={14}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Conteúdo específico por método */}
            <TabsContent value="card" className="mt-0">
              <form onSubmit={handleCardPayment} className="space-y-6">
                <div className="space-y-4 bg-muted/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">Dados do Cartão</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                      maxLength={19}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Nome no Cartão *</Label>
                    <Input
                      id="cardHolder"
                      placeholder="Nome como está no cartão"
                      value={cardData.holder}
                      onChange={(e) => setCardData({ ...cardData, holder: e.target.value.toUpperCase() })}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth">Mês *</Label>
                      <Input
                        id="expMonth"
                        placeholder="MM"
                        value={cardData.expMonth}
                        onChange={(e) => setCardData({ ...cardData, expMonth: e.target.value.replace(/\D/g, '') })}
                        maxLength={2}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expYear">Ano *</Label>
                      <Input
                        id="expYear"
                        placeholder="AA"
                        value={cardData.expYear}
                        onChange={(e) => setCardData({ ...cardData, expYear: e.target.value.replace(/\D/g, '') })}
                        maxLength={2}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="000"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                        maxLength={4}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold text-lg py-7 shadow-lg hover:shadow-xl transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Pagar com Cartão - R$ 297,00
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="pix" className="mt-0">
              <div className="space-y-6">
                <div className="bg-muted/20 rounded-xl p-5 text-center">
                  <QrCode className="w-16 h-16 text-primary mx-auto mb-3" />
                  <h3 className="text-base font-bold text-foreground mb-2">Pagamento via Pix</h3>
                  <p className="text-sm text-muted-foreground">
                    Após clicar no botão, você será direcionado para gerar o QR Code do Pix.
                    Aprovação instantânea!
                  </p>
                </div>

                <Button
                  onClick={handlePixPayment}
                  size="lg"
                  className="w-full font-bold text-lg py-7 shadow-lg hover:shadow-xl transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Gerando Pix...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-5 w-5" />
                      Pagar com Pix - R$ 297,00
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="boleto" className="mt-0">
              <div className="space-y-6">
                <div className="bg-muted/20 rounded-xl p-5 text-center">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-3" />
                  <h3 className="text-base font-bold text-foreground mb-2">Pagamento via Boleto</h3>
                  <p className="text-sm text-muted-foreground">
                    Após clicar no botão, você será direcionado para gerar o boleto bancário.
                    Compensação em até 3 dias úteis.
                  </p>
                </div>

                <Button
                  onClick={handleBoletoPayment}
                  size="lg"
                  className="w-full font-bold text-lg py-7 shadow-lg hover:shadow-xl transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Gerando Boleto...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Pagar com Boleto - R$ 297,00
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="space-y-3 mt-6">
          <div className="bg-gradient-to-r from-success/20 to-accent/20 border-2 border-success/40 rounded-xl p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-foreground mb-2">
                  🎓 Acesso Imediato ao Curso!
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Após a confirmação do pagamento, você receberá um <strong className="text-foreground">e-mail com seus dados de acesso</strong> em até 5 minutos e poderá iniciar suas aulas imediatamente! Verifique também sua caixa de spam.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Os dados não são armazenados em nosso servidor
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-success" />
              Processamento Seguro
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-success" />
              Dados Criptografados
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-success" />
              Garantia 7 Dias
            </span>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
