import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Preciso ter experiência com computador?",
    answer: "Não! O curso foi criado especialmente para quem nunca usou um computador ou tem pouca experiência. Começamos do absoluto zero, explicando cada clique de forma simples e didática.",
  },
  {
    question: "Por quanto tempo terei acesso ao curso?",
    answer: "O acesso é vitalício! Isso significa que pode estudar no seu ritmo, revisar quantas vezes quiser e acompanhar todas as atualizações para sempre.",
  },
  {
    question: "O certificado é válido?",
    answer: "Sim! Ao concluir o curso, você recebe um certificado digital que pode incluir no currículo e LinkedIn. Nosso certificado é reconhecido por empresas em todo o Brasil.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer: "É simples: se você não gostar do curso por qualquer motivo nos primeiros 7 dias, basta enviar um e-mail solicitando o reembolso. Devolvemos 100% do valor, sem perguntas.",
  },
  {
    question: "Posso assistir pelo celular?",
    answer: "Sim! Nossas aulas funcionam em qualquer dispositivo: computador, notebook, tablet ou celular. Você pode estudar onde e quando quiser.",
  },
  {
    question: "E se eu tiver dúvidas durante o curso?",
    answer: "Você terá acesso direto à professora Elisa pelo WhatsApp! Diferente de outros cursos, aqui você tem suporte humanizado e personalizado para tirar todas as suas dúvidas.",
  },
  {
    question: "O pagamento é seguro?",
    answer: "Totalmente seguro! Utilizamos as mesmas tecnologias de segurança dos grandes bancos. Aceitamos cartão de crédito (em até 12x), PIX e boleto bancário.",
  },
  {
    question: "Quando começo a ter acesso?",
    answer: "O acesso é imediato! Assim que seu pagamento for confirmado (no PIX é instantâneo), você recebe o login e senha por e-mail e já pode começar a estudar.",
  },
];

export const FAQV2 = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            Dúvidas Frequentes
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Ainda tem <span className="text-primary">dúvidas</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Confira as perguntas mais comuns dos nossos alunos
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-50 rounded-xl border-none px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-bold text-foreground hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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
