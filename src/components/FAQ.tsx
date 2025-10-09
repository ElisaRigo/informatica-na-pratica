import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O curso é 100% online?",
    answer: "Sim. Você acessa do computador ou celular, quando quiser.",
  },
  {
    question: "Preciso ter experiência?",
    answer: "Não. Começamos do zero e vamos passo a passo.",
  },
  {
    question: "Não tenho computador agora. Posso começar pelo celular?",
    answer: "Pode sim. Muitas aulas funcionam no celular para você já ir entendendo. Para praticar Word/Excel, recomendamos um computador (pode ser emprestado ou da escola/biblioteca) — e te damos orientação para isso.",
  },
  {
    question: "Tenho pouco tempo. Vou dar conta?",
    answer: "As aulas são curtas e diretas. Você pode aprender em blocos de 15–20 minutos por dia, no seu ritmo.",
  },
  {
    question: "Quando recebo o acesso?",
    answer: "Logo após a confirmação do pagamento, você recebe login e senha.",
  },
  {
    question: "Tem certificado?",
    answer: "Sim, certificado de conclusão incluído.",
  },
  {
    question: "Como funciona a garantia?",
    answer: "Você tem 7 dias para testar. Se não for para você, devolvemos 100% do valor.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
          Dúvidas frequentes
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-line rounded-2xl px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
