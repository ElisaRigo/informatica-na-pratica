import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw } from "lucide-react";

export const ReprocessPayment = () => {
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReprocess = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "ID necessário",
        description: "Digite o ID da transação",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('reprocess-payment', {
        body: { transactionId: transactionId.trim() }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "✅ Sucesso!",
          description: "Pagamento reprocessado e email enviado",
        });
        setTransactionId("");
      } else {
        throw new Error(data.error || 'Falha ao reprocessar');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro ao reprocessar",
        description: error.message || "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Reprocessar Pagamento
        </CardTitle>
        <CardDescription>
          Use para reenviar email de boas-vindas ou corrigir erros de processamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="transactionId">ID da Transação PagSeguro</Label>
          <Input
            id="transactionId"
            placeholder="Ex: 2CB4A301-A260-4C91-A62C-FD17181D8BE7"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button
          onClick={handleReprocess}
          disabled={loading || !transactionId.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reprocessar e Enviar Email
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};