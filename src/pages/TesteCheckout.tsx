import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";

const TesteCheckout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                Teste de Checkout
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Ambiente de Teste - R$ 5,00
              </p>
              <p className="text-sm text-muted-foreground">
                Este é um ambiente de teste para validar o fluxo de pagamento
              </p>
            </div>

            <CheckoutForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TesteCheckout;
