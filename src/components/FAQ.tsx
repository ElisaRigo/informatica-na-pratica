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
    question: "Preciso ter experiência prévia com computador?",
    answer: "Não. O curso foi criado especialmente para iniciantes absolutos. Começamos do zero, explicando cada botão, cada clique. Se você consegue ligar um computador, você consegue fazer o curso.",
  },
  {
    question: "Não tenho computador agora. Posso começar pelo celular?",
    answer: "Pode sim. Muitas aulas funcionam no celular para você já ir entendendo. Para praticar Word/Excel, recomendamos um computador (pode ser emprestado ou da escola/biblioteca) — e te damos orientação para isso.",
  },
  {
    question: "Quanto tempo leva para concluir o curso?",
    answer: "O curso tem mais de 90 aulas rápidas. Estudando 30 minutos por dia, você conclui em cerca de 30 dias. Mas você tem 2 anos de acesso para aprender no seu ritmo!",
  },
  {
    question: "Tenho pouco tempo. Vou dar conta?",
    answer: "As aulas são curtas e diretas (10-15 minutos cada). Você pode aprender em blocos de 15–20 minutos por dia, no seu ritmo. Não tem horário fixo nem prazo de conclusão.",
  },
  {
    question: "Como funciona o acesso ao curso?",
    answer: "Logo após a confirmação do pagamento, você recebe por e-mail seu login e senha para acessar a plataforma. O acesso é imediato e válido por 2 anos completos.",
  },
  {
    question: "Posso parcelar o curso?",
    answer: "Sim! Você pode parcelar em até 12x no cartão de crédito. Também aceitamos PIX e boleto bancário para pagamento à vista.",
  },
  {
    question: "O curso tem certificado?",
    answer: "Sim! Ao concluir o curso, você recebe um certificado digital de conclusão que pode ser usado em seu currículo e processos seletivos.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer: "Você tem 7 dias corridos para testar todo o conteúdo. Se por qualquer motivo decidir que o curso não é para você, basta nos avisar e devolvemos 100% do valor pago. Sem perguntas, sem burocracia.",
  },
  {
    question: "Vou aprender apenas o básico ou também coisas avançadas?",
    answer: "O curso cobre desde o absoluto zero até recursos intermediários/avançados. Você aprende desde ligar o computador até criar planilhas com fórmulas, documentos profissionais e apresentações impactantes.",
  },
  {
    question: "Qual a diferença deste curso para vídeos grátis no YouTube?",
    answer: "No YouTube você encontra conteúdo solto e desorganizado. Aqui você tem um método estruturado passo a passo, suporte direto comigo, exercícios práticos e certificado. É a diferença entre assistir receitas e ter um chef te ensinando a cozinhar.",
  },
  {
    question: "Posso tirar dúvidas durante o curso?",
    answer: "Sim! Você tem suporte direto comigo, professora Elisa, via WhatsApp. Respondo todas as dúvidas pessoalmente.",
  },
  {
    question: "O curso serve para conseguir emprego?",
    answer: "Sim! Informática básica é requisito em 90% das vagas de emprego. Além disso, incluímos um módulo bônus sobre Mercado de Trabalho com dicas de currículo e como apresentar suas habilidades.",
  },
  {
    question: "Funciona para pessoas de 50, 60 anos ou mais?",
    answer: "Com certeza! Tenho muitos alunos nessa faixa etária. As aulas são feitas com calma, paciência e linguagem simples. Idade não é barreira — é só vontade de aprender!",
  },
  {
    question: "Preciso instalar programas no meu computador?",
    answer: "Não necessariamente. Ensino a usar o que já vem instalado no Windows. Se quiser, também mostro alternativas gratuitas online.",
  },
  {
    question: "Como sei que o curso é confiável?",
    answer: "Já são mais de 15.000 alunos formados, avaliação 4.8/5, garantia incondicional de 7 dias e certificado reconhecido. Você não corre nenhum risco!",
  },
  {
    question: "O que acontece após os 2 anos de acesso?",
    answer: "Após 2 anos, você pode renovar o acesso por um valor simbólico caso queira. Mas 2 anos é tempo mais que suficiente para dominar todo o conteúdo e revisitar quantas vezes precisar.",
  },
  {
    question: "Posso presentear alguém com o curso?",
    answer: "Sim! Após a compra, você pode transferir o acesso para outra pessoa. É um presente que transforma vidas!",
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
