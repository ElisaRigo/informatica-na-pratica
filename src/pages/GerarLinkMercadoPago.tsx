import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, CheckCircle } from "lucide-react";

export default function GerarLinkMercadoPago() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();
      setIsAdmin(!!data);
    };
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      toast({
        title: "Acesso negado",
        description: "Você precisa ser administrador para acessar esta página.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [isAdmin, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentLink("");

    try {
      if (!formData.name || !formData.email || !formData.cpf) {
        throw new Error("Preencha todos os campos");
      }

      const cpfClean = formData.cpf.replace(/\D/g, "");
      if (cpfClean.length !== 11) {
        throw new Error("CPF inválido");
      }

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

      if (!data?.initPoint) {
        throw new Error("Erro ao gerar link de pagamento");
      }

      setPaymentLink(data.initPoint);
      toast({
        title: "Link gerado com sucesso!",
        description: "Copie e envie o link para seu cliente.",
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao gerar link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, "");
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Gerar Link de Pagamento
            </CardTitle>
            <CardDescription>
              Crie links de pagamento do Mercado Pago para enviar aos seus clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo do Cliente</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail do Cliente</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF do Cliente</Label>
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
                    Gerando link...
                  </>
                ) : (
                  "Gerar Link de Pagamento"
                )}
              </Button>
            </form>

            {paymentLink && (
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-semibold text-green-900 dark:text-green-100">
                      Link gerado com sucesso!
                    </h3>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                    Envie este link para seu cliente fazer o pagamento:
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={paymentLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>💡 <strong>Dica:</strong> Copie o link e envie para seu cliente via WhatsApp, e-mail ou qualquer outro canal.</p>
                  <p>✅ O cliente poderá pagar com PIX, Cartão de Crédito ou Boleto.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
