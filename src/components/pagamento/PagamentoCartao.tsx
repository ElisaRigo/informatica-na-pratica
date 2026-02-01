import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

interface PagamentoCartaoProps {
  formData: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
  };
  mpInstance: any;
  coursePrice: number;
}

export const PagamentoCartao = ({ formData, mpInstance, coursePrice }: PagamentoCartaoProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
    cardholderName: "",
    installments: "12"
  });
  const cardFormRef = useRef<any>(null);

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const getInstallmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const value = (coursePrice / i).toFixed(2);
      options.push({ value: String(i), label: `${i}x de R$ ${value}` });
    }
    return options;
  };

  const handleSubmit = async () => {
    // Validar campos
    if (!cardData.cardNumber || !cardData.expirationMonth || !cardData.expirationYear || 
        !cardData.securityCode || !cardData.cardholderName) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os dados do cartão são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
      const cleanCPF = formData.cpf.replace(/\D/g, '');
      const cleanPhone = formData.phone.replace(/\D/g, '');

      // Criar token do cartão
      const cardTokenData = {
        cardNumber: cleanCardNumber,
        cardholderName: cardData.cardholderName,
        cardExpirationMonth: cardData.expirationMonth,
        cardExpirationYear: `20${cardData.expirationYear}`,
        securityCode: cardData.securityCode,
        identificationType: 'CPF',
        identificationNumber: cleanCPF,
      };

      const token = await mpInstance.createCardToken(cardTokenData);

      if (!token?.id) {
        throw new Error('Erro ao processar cartão');
      }

      // Processar pagamento
      const { data, error } = await supabase.functions.invoke('process-card-payment', {
        body: {
          token: token.id,
          transaction_amount: coursePrice,
          installments: parseInt(cardData.installments),
          payment_method_id: token.payment_method?.id || 'master',
          payer: {
            email: formData.email,
            first_name: formData.name.split(' ')[0],
            last_name: formData.name.split(' ').slice(1).join(' ') || formData.name.split(' ')[0],
            identification: {
              type: 'CPF',
              number: cleanCPF
            },
            phone: {
              area_code: cleanPhone.substring(0, 2),
              number: cleanPhone.substring(2)
            }
          }
        }
      });

      if (error) throw error;

      if (data.status === 'approved') {
        toast({
          title: "✅ Pagamento aprovado!",
          description: "Redirecionando...",
        });
        setTimeout(() => {
          window.location.href = '/obrigada';
        }, 1500);
      } else if (data.status === 'in_process' || data.status === 'pending') {
        toast({
          title: "Pagamento em análise",
          description: "Seu pagamento está sendo processado",
        });
        setTimeout(() => {
          window.location.href = '/aguardando';
        }, 1500);
      } else {
        throw new Error(data.status_detail || 'Pagamento não aprovado');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: error.message || "Verifique os dados e tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardNumber" className="text-sm font-medium">Número do Cartão</Label>
        <Input
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          value={cardData.cardNumber}
          onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
          maxLength={19}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Validade (MM/AA)</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Input
              placeholder="MM"
              value={cardData.expirationMonth}
              onChange={(e) => setCardData({ ...cardData, expirationMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })}
              maxLength={2}
            />
            <Input
              placeholder="AA"
              value={cardData.expirationYear}
              onChange={(e) => setCardData({ ...cardData, expirationYear: e.target.value.replace(/\D/g, '').slice(0, 2) })}
              maxLength={2}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="securityCode" className="text-sm font-medium">Cód. Segurança</Label>
          <Input
            id="securityCode"
            placeholder="CVV"
            value={cardData.securityCode}
            onChange={(e) => setCardData({ ...cardData, securityCode: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            maxLength={4}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="cardholderName" className="text-sm font-medium">Nome impresso no cartão</Label>
        <Input
          id="cardholderName"
          placeholder="Como aparece no cartão"
          value={cardData.cardholderName}
          onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value.toUpperCase() })}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Parcelas</Label>
        <Select 
          value={cardData.installments} 
          onValueChange={(value) => setCardData({ ...cardData, installments: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getInstallmentOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          ✓ Suas parcelas data não possuem juros comprar
        </p>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-12 text-base font-bold bg-success hover:bg-success/90 text-white mt-6"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processando...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 mr-2" />
            Pagar e Receber Agora
          </>
        )}
      </Button>
    </div>
  );
};
