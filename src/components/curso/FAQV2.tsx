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

        {/* Final CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Não encontrou sua dúvida? Fale diretamente com a professora:
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20curso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar com a Professora Elisa
          </a>
        </div>
      </div>
    </section>
  );
};
