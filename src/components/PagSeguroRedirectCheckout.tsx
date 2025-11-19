import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, QrCode } from "lucide-react";

export const PagSeguroRedirectCheckout = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, "");
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 3) {
      toast({
        title: "Nome inválido",
        description: "Digite seu nome completo",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email || !formData.email.includes("@")) {
      toast({
        title: "E-mail inválido",
        description: "Digite um e-mail válido",
        variant: "destructive",
      });
      return false;
    }

    const cpfClean = formData.cpf.replace(/\D/g, "");
    if (cpfClean.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido com 11 dígitos",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Criando checkout PagSeguro não-transparente...");

      const cpfClean = formData.cpf.replace(/\D/g, "");

      // Chamar edge function que cria sessão de checkout
      const { data, error } = await supabase.functions.invoke(
        "pagseguro-checkout",
        {
          body: {
            customerName: formData.name,
            customerEmail: formData.email,
            customerTaxId: cpfClean,
          },
        }
      );

      if (error) {
        console.error("Erro ao criar checkout:", error);
        throw new Error(error.message || "Erro ao criar checkout");
      }

      if (!data?.success || !data?.paymentUrl) {
        console.error("Resposta inválida:", data);
        throw new Error("Erro ao gerar link de pagamento");
      }

      console.log("✅ Checkout criado com sucesso:", data.code);

      toast({
        title: "Redirecionando para pagamento...",
        description: "Você será redirecionado para o PagSeguro",
      });

      // Redirecionar para o PagSeguro
      setTimeout(() => {
        window.location.href = data.paymentUrl;
      }, 1000);

    } catch (error: any) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <QrCode className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Pagamento via PagSeguro
            </p>
            <p className="text-xs text-muted-foreground">
              Pague com PIX, Boleto ou Cartão de Crédito
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Digite seu nome completo"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          disabled={loading}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          disabled={loading}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF *</Label>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={(e) =>
            setFormData({ ...formData, cpf: formatCPF(e.target.value) })
          }
          maxLength={14}
          required
          disabled={loading}
          className="h-11"
        />
      </div>

      <div className="bg-muted/50 p-3 rounded-lg space-y-1">
        <p className="text-xs text-muted-foreground">
          ✓ Checkout seguro do PagSeguro
        </p>
        <p className="text-xs text-muted-foreground">
          ✓ Você preencherá os dados de pagamento na página do PagSeguro
        </p>
        <p className="text-xs text-muted-foreground">
          ✓ Acesso imediato após confirmação do pagamento
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-lg font-bold"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </>
        ) : (
          "Ir para Pagamento"
        )}
      </Button>
    </form>
  );
};
