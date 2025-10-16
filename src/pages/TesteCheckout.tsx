import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutTransparente } from "@/components/CheckoutTransparente";

const TesteCheckout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                Teste de Checkout Transparente
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Ambiente de Teste - R$ 5,00
              </p>
              <p className="text-sm text-muted-foreground">
                Este é um ambiente de teste para validar o checkout transparente
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">O que você vai testar:</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Pagamento sem sair do site</li>
                <li>✓ Automação de acesso mantida</li>
                <li>✓ Segurança PCI-DSS</li>
                <li>✓ Experiência do usuário otimizada</li>
              </ul>
            </div>

            <CheckoutTransparente />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TesteCheckout;
