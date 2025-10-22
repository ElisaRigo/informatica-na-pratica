import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, Lock } from "lucide-react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface CustomCardPaymentProps {
  formData: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  amount: number;
  mpPublicKey: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const CustomCardPayment = ({ formData, amount, mpPublicKey, onSuccess, onBack }: CustomCardPaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
    installments: "1"
  });

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(" ") : numbers;
  };

  const formatExpirationDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    return numbers;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardData({ ...cardData, cardNumber: formatted });
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value);
    if (formatted.replace(/\D/g, "").length <= 4) {
      const parts = formatted.split("/");
      setCardData({ 
        ...cardData, 
        expirationMonth: parts[0] || "",
        expirationYear: parts[1] || ""
      });
    }
  };

  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/\D/g, "");
    if (numbers.length <= 4) {
      setCardData({ ...cardData, securityCode: numbers });
    }
  };

  const validateCard = () => {
    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
    
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 16) {
      toast({
        title: "Número do cartão inválido",
        description: "Digite um número de cartão válido",
        variant: "destructive"
      });
      return false;
    }

    if (!cardData.cardholderName || cardData.cardholderName.length < 3) {
      toast({
        title: "Nome inválido",
        description: "Digite o nome como está no cartão",
        variant: "destructive"
      });
      return false;
    }

    if (!cardData.expirationMonth || !cardData.expirationYear) {
      toast({
        title: "Data de validade inválida",
        description: "Digite a data de validade do cartão",
        variant: "destructive"
      });
      return false;
    }

    const month = parseInt(cardData.expirationMonth);
    if (month < 1 || month > 12) {
      toast({
        title: "Mês inválido",
        description: "Digite um mês válido (01-12)",
        variant: "destructive"
      });
      return false;
    }

    if (cardData.securityCode.length < 3) {
      toast({
        title: "CVV inválido",
        description: "Digite o código de segurança do cartão",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) return;

    setLoading(true);

    try {
      const mp = new window.MercadoPago(mpPublicKey, { locale: "pt-BR" });

      // Criar token do cartão
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, "");
      const tokenData = {
        cardNumber: cleanCardNumber,
        cardholderName: cardData.cardholderName,
        cardExpirationMonth: cardData.expirationMonth.padStart(2, "0"),
        cardExpirationYear: "20" + cardData.expirationYear,
        securityCode: cardData.securityCode,
        identificationType: "CPF",
        identificationNumber: formData.cpf.replace(/\D/g, "")
      };

      console.log("Creating card token...");
      const token = await mp.fields.createCardToken(tokenData);

      if (!token?.id) {
        throw new Error("Erro ao processar cartão");
      }

      console.log("Token created, processing payment...");

      // Separar nome e sobrenome
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || nameParts[0];

      // Processar pagamento
      const { data, error } = await supabase.functions.invoke("process-card-payment", {
        body: {
          token: token.id,
          transaction_amount: amount,
          installments: parseInt(cardData.installments),
          payment_method_id: token.payment_method_id,
          issuer_id: token.issuer_id,
          payer: {
            email: formData.email,
            identification: {
              type: "CPF",
              number: formData.cpf.replace(/\D/g, "")
            },
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) throw error;

      if (data?.status === "approved") {
        toast({
          title: "✅ Pagamento aprovado!",
          description: "Redirecionando...",
        });
        onSuccess();
        setTimeout(() => {
          window.location.href = "/obrigada";
        }, 1500);
      } else if (data?.status === "pending") {
        toast({
          title: "Pagamento em análise",
          description: "Você receberá um e-mail quando for aprovado",
        });
        setTimeout(() => {
          window.location.href = "/aguardando";
        }, 2000);
      } else {
        throw new Error(data?.status_detail || "Pagamento não aprovado");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        title: "Erro no pagamento",
        description: err.message || "Tente novamente ou use outro cartão",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Gerar opções de parcelas
  const installmentOptions = Array.from({ length: 12 }, (_, i) => {
    const installment = i + 1;
    const installmentAmount = amount / installment;
    return {
      value: installment.toString(),
      label: installment === 1 
        ? `1x de R$ ${amount.toFixed(2).replace(".", ",")} sem juros`
        : `${installment}x de R$ ${installmentAmount.toFixed(2).replace(".", ",")} sem juros`
    };
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Número do Cartão */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-sm font-bold">
          Número do Cartão *
        </Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardData.cardNumber}
            onChange={handleCardNumberChange}
            disabled={loading}
            className="h-12 text-base pl-10"
            maxLength={19}
          />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Nome no Cartão */}
      <div className="space-y-2">
        <Label htmlFor="cardholderName" className="text-sm font-bold">
          Nome como está no Cartão *
        </Label>
        <Input
          id="cardholderName"
          placeholder="NOME COMPLETO"
          value={cardData.cardholderName}
          onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value.toUpperCase() })}
          disabled={loading}
          className="h-12 text-base uppercase"
        />
      </div>

      {/* Validade e CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiration" className="text-sm font-bold">
            Validade (MM/AA) *
          </Label>
          <Input
            id="expiration"
            placeholder="MM/AA"
            value={cardData.expirationMonth + (cardData.expirationYear ? "/" + cardData.expirationYear : "")}
            onChange={handleExpirationChange}
            disabled={loading}
            className="h-12 text-base"
            maxLength={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="securityCode" className="text-sm font-bold">
            CVV *
          </Label>
          <div className="relative">
            <Input
              id="securityCode"
              placeholder="123"
              type="password"
              value={cardData.securityCode}
              onChange={handleSecurityCodeChange}
              disabled={loading}
              className="h-12 text-base pl-10"
              maxLength={4}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Parcelas - SEMPRE VISÍVEL */}
      <div className="space-y-2 bg-primary/5 p-4 rounded-lg border-2 border-primary/20">
        <Label htmlFor="installments" className="text-sm font-bold flex items-center gap-2">
          💳 Número de Parcelas *
        </Label>
        <Select 
          value={cardData.installments} 
          onValueChange={(value) => setCardData({ ...cardData, installments: value })}
          disabled={loading}
        >
          <SelectTrigger className="h-12 text-base font-semibold">
            <SelectValue placeholder="Escolha o número de parcelas" />
          </SelectTrigger>
          <SelectContent>
            {installmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-base">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground text-center mt-2">
          ✨ Parcele em até 12x sem juros no cartão de crédito
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-success hover:bg-success/90 text-white font-bold h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processando...
            </>
          ) : (
            `💳 Pagar R$ ${amount.toFixed(2).replace(".", ",")}`
          )}
        </Button>
      </div>

      {/* Segurança */}
      <div className="text-center text-xs text-muted-foreground pt-2 border-t">
        🔒 Pagamento 100% seguro • Seus dados estão protegidos
      </div>
    </form>
  );
};
