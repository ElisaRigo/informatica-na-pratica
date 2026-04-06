import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "Preciso ter experiência com computador?", answer: "Não! O curso começa do absoluto zero, explicando cada clique de forma simples." },
  { question: "Por quanto tempo terei acesso?", answer: "Acesso vitalício! Estude no seu ritmo e revise quantas vezes quiser." },
  { question: "O certificado é válido?", answer: "Sim! Certificado digital reconhecido por empresas em todo o Brasil." },
  { question: "Como funciona a garantia de 7 dias?", answer: "Se não gostar nos primeiros 7 dias, devolvemos 100% do valor. Sem perguntas." },
  { question: "Posso assistir pelo celular?", answer: "Sim! Funciona em qualquer dispositivo: computador, tablet ou celular." },
  { question: "E se eu tiver dúvidas?", answer: "Suporte direto com a professora Elisa pelo WhatsApp." },
  { question: "O pagamento é seguro?", answer: "Totalmente! Aceitamos cartão (até 12x), PIX e boleto." },
  { question: "Quando começo a ter acesso?", answer: "Acesso imediato após a confirmação do pagamento." },
];

interface FAQV2Props {
  variant?: "light" | "dark";
}

export const FAQV2 = ({ variant = "light" }: FAQV2Props) => {
  const isDark = variant === "dark";

  return (
    <section className={`py-8 md:py-10 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-foreground'}`}>
            Dúvidas <span className="text-primary">Frequentes</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`${isDark ? 'bg-slate-900' : 'bg-slate-50'} rounded-lg border-none px-4 shadow-sm`}
              >
                <AccordionTrigger className={`text-left font-bold text-sm ${isDark ? 'text-white' : 'text-foreground'} hover:text-primary py-3 hover:no-underline`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`${isDark ? 'text-slate-400' : 'text-muted-foreground'} text-sm pb-3`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
