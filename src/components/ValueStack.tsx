import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Usar o computador com segurança e organização (Windows)",
  "Escrever documentos profissionais e currículos (Word)",
  "Criar planilhas e fórmulas essenciais (Excel)",
  "Montar apresentações bonitas e objetivas (PowerPoint)",
  "Navegar com confiança, pesquisar e usar e-mail (Internet)",
  "Ganhar velocidade no teclado com prática guiada (Digitação)",
];

export const ValueStack = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
          Você vai conseguir…
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-card border border-line rounded-2xl hover:border-primary/50 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="text-lg font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
