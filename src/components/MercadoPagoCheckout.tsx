import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// INSTRUÇÃO PARA O USUÁRIO: 
// Adicione aqui sua Public Key do Mercado Pago
const MERCADO_PAGO_PUBLIC_KEY = "APP_USR-SUA_PUBLIC_KEY_AQUI";

// Extend window type for MercadoPago SDK
declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const MercadoPagoCheckout = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Creating Mercado Pago checkout...");

      // Validate form
      if (!formData.name || !formData.email || !formData.cpf) {
        throw new Error("Preencha todos os campos");
      }

      // Validate CPF format (basic)
      const cpfClean = formData.cpf.replace(/\D/g, "");
      if (cpfClean.length !== 11) {
        throw new Error("CPF inválido");
      }

      // Call edge function to create preference
      const { data, error } = await supabase.functions.invoke(
        "mercado-pago-checkout",
        {
          body: {
            name: formData.name,
            email: formData.email,
            cpf: cpfClean,
          },
        }
      );

      if (error) throw error;

      if (!data?.preferenceId) {
        throw new Error("Erro ao criar checkout");
      }

      console.log("Preference created:", data.preferenceId);

      // Initialize Mercado Pago SDK
      const mp = new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
        locale: "pt-BR",
      });

      // Create checkout
      mp.checkout({
        preference: {
          id: data.preferenceId,
        },
        autoOpen: true,
      });

      toast({
        title: "Redirecionando para pagamento...",
        description: "Você será redirecionado para completar o pagamento.",
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar pagamento",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, "");
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Checkout Mercado Pago</h2>
        <p className="text-sm text-muted-foreground">
          Pague com PIX, Boleto ou Cartão
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
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
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Pagar com Mercado Pago"
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>🔒</span>
          <span>Pagamento 100% seguro</span>
        </div>
      </form>

      {/* Load Mercado Pago SDK */}
      <script src="https://sdk.mercadopago.com/js/v2" />
    </div>
  );
};
