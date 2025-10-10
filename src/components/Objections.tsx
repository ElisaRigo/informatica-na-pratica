import { Clock, Brain, Laptop, HelpCircle } from "lucide-react";

export const Objections = () => {
  const objections = [
    {
      icon: Clock,
      question: "Mas eu não tenho tempo...",
      answer: "O curso é 100% online e você assiste no seu ritmo! 15 minutos por dia já fazem diferença. Você escolhe quando e onde estudar."
    },
    {
      icon: Brain,
      question: "Será que consigo aprender?",
      answer: "Sim! O curso foi feito para quem está começando do ZERO. As aulas são passo a passo, bem explicadas e você pode rever quantas vezes precisar."
    },
    {
      icon: Laptop,
      question: "E se eu não tiver computador bom?",
      answer: "Qualquer computador funciona! Não precisa de máquina potente. Se ele liga e acessa a internet, você consegue fazer o curso."
    },
    {
      icon: HelpCircle,
      question: "E se eu não gostar do curso?",
      answer: "Você tem 7 dias de garantia total! Se não gostar, devolvemos 100% do seu dinheiro sem perguntas. Zero risco para você."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            Suas dúvidas respondidas
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Entendemos suas preocupações. Veja as respostas:
          </p>

          <div className="space-y-6">
            {objections.map((objection, index) => {
              const IconComponent = objection.icon;
              return (
                <div 
                  key={index}
                  className="bg-card border-2 border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-primary">
                        {objection.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {objection.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8">
            <p className="text-xl font-bold mb-2">
              Ainda tem dúvidas? Fale comigo no WhatsApp!
            </p>
            <p className="text-muted-foreground mb-6">
              Estou aqui para te ajudar a dar esse passo importante.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              💬 Tirar dúvida no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
