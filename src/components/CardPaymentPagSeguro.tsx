import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard } from "lucide-react";

interface CardPaymentPagSeguroProps {
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

export const CardPaymentPagSeguro = ({ formData, amount, onSuccess, onError }: CardPaymentPagSeguroProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    holderName: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    installments: 1
  });

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardData.number || !cardData.holderName || !cardData.expMonth || !cardData.expYear || !cardData.cvv) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os dados do cartão",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log('💳 Processando pagamento com cartão no PagSeguro');

      const { data, error } = await supabase.functions.invoke('pagseguro-create-order-card', {
        body: {
          customer: {
            name: formData.name,
            email: formData.email,
            tax_id: formData.cpf,
            phone: formData.phone
          },
          address: {
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            locality: formData.neighborhood,
            city: formData.city,
            region_code: formData.state,
            postal_code: formData.cep
          },
          card: {
            number: cardData.number.replace(/\s/g, ''),
            exp_month: cardData.expMonth,
            exp_year: cardData.expYear,
            security_code: cardData.cvv,
            holder: {
              name: cardData.holderName
            }
          },
          amount: amount,
          installments: cardData.installments
        }
      });

      if (error) throw error;

      if (data?.success) {
        const status = data.charge?.status;

        if (status === 'PAID') {
          toast({
            title: "✅ Pagamento aprovado!",
            description: "Redirecionando para o curso..."
          });
          setTimeout(() => onSuccess(), 2000);
        } else if (status === 'AUTHORIZED' || status === 'IN_ANALYSIS') {
          toast({
            title: "⏳ Pagamento em análise",
            description: "Você receberá um email assim que for aprovado"
          });
          setTimeout(() => onSuccess(), 3000);
        } else if (status === 'DECLINED') {
          throw new Error('Pagamento recusado. Verifique os dados do cartão ou use outro cartão.');
        } else {
          throw new Error(`Status inesperado: ${status}`);
        }
      } else {
        throw new Error(data?.error || 'Erro ao processar pagamento');
      }
    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      onError(error.message || 'Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary/10 p-4 rounded-lg text-center">
        <p className="text-sm font-semibold mb-1">Valor a pagar:</p>
        <p className="text-3xl font-black text-primary">
          R$ {amount.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          em até {cardData.installments}x de R$ {(amount / cardData.installments).toFixed(2)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Número do Cartão *</Label>
          <Input
            id="cardNumber"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
        </div>

        <div>
          <Label htmlFor="holderName">Nome no Cartão *</Label>
          <Input
            id="holderName"
            value={cardData.holderName}
            onChange={(e) => setCardData({ ...cardData, holderName: e.target.value.toUpperCase() })}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="expMonth">Mês *</Label>
            <Input
              id="expMonth"
              value={cardData.expMonth}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
                  setCardData({ ...cardData, expMonth: value });
                }
              }}
              placeholder="MM"
              maxLength={2}
            />
          </div>
          <div>
            <Label htmlFor="expYear">Ano *</Label>
            <Input
              id="expYear"
              value={cardData.expYear}
              onChange={(e) => setCardData({ ...cardData, expYear: e.target.value.replace(/\D/g, '') })}
              placeholder="AAAA"
              maxLength={4}
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
              placeholder="000"
              maxLength={4}
              type="password"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="installments">Parcelas *</Label>
          <select
            id="installments"
            value={cardData.installments}
            onChange={(e) => setCardData({ ...cardData, installments: parseInt(e.target.value) })}
            className="w-full p-2 border rounded-md"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <option key={i} value={i}>
                {i}x de R$ {(amount / i).toFixed(2)} {i === 1 ? 'à vista' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processando pagamento...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Finalizar Pagamento
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        🔒 Seus dados estão protegidos com criptografia de ponta a ponta
      </p>
    </form>
  );
};
