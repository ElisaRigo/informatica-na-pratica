import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

const TesteCheckout = () => {
  const handlePayment = () => {
    window.open('https://pag.ae/815TVuQba', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-4">
                <ShieldCheck className="w-4 h-4" />
                Ambiente de Teste Seguro
              </div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Teste de Pagamento
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Valide seu fluxo de compra em ambiente seguro
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-2 shadow-xl">
              <CardHeader className="text-center space-y-2 pb-8">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Curso de Informática na Prática
                </CardTitle>
                <CardDescription className="text-lg">
                  Ambiente de teste para validação do checkout
                </CardDescription>
                <div className="pt-4">
                  <div className="inline-block">
                    <p className="text-sm text-muted-foreground mb-2">Valor do teste</p>
                    <p className="text-5xl font-black text-primary">R$ 5,00</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                {/* Features */}
                <div className="grid md:grid-cols-3 gap-4 py-6">
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Pagamento Seguro</h3>
                    <p className="text-sm text-muted-foreground">Processado pelo PagSeguro</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Acesso Imediato</h3>
                    <p className="text-sm text-muted-foreground">Após confirmação</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Ambiente de Teste</h3>
                    <p className="text-sm text-muted-foreground">Validação completa</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Button
                    onClick={handlePayment}
                    size="lg"
                    className="w-full font-bold text-lg py-7 shadow-lg hover:shadow-xl transition-all"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Ir para o Pagamento Seguro
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    🔒 Você será redirecionado para o ambiente seguro do PagSeguro
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h4 className="font-semibold mb-2 text-sm">ℹ️ Sobre este teste</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Este é um ambiente de teste seguro</li>
                    <li>• O pagamento será processado pelo PagSeguro</li>
                    <li>• Valor simbólico de R$ 5,00 para validação</li>
                    <li>• Transação real para teste do fluxo completo</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 mt-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>PagSeguro</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TesteCheckout;
