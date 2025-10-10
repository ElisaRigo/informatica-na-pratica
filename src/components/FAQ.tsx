import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

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
    answer: "Sim! Ao concluir o curso, você recebe um certificado digital de conclusão que pode ser usado em seu currículo e processos seletivos. O certificado é emitido após 10 dias da conclusão do curso.",
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
        <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4 mb-12">
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

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-success/20 to-primary/20 border-2 border-success/40 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black mb-4">
            Todas as dúvidas esclarecidas? 💚
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-3">
            Então é hora de dar o primeiro passo
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Você tem <strong className="text-foreground">garantia de 7 dias</strong>, suporte direto comigo e 2 anos de acesso completo. Não há motivo para adiar sua transformação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              size="lg" 
              className="font-extrabold px-10 py-7 rounded-2xl text-lg hover:scale-105 transition-transform w-full sm:w-auto"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                ✅ Sim, quero começar agora
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-bold px-8 py-7 rounded-2xl text-base border-2 w-full sm:w-auto"
              asChild
            >
              <a href="https://wa.me/5545988287082" target="_blank" rel="noopener noreferrer">
                💬 Falar com a Elisa
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            ⚡ <span className="line-through">R$ 497</span> por apenas <span className="font-bold text-accent">R$ 297</span> • Últimas vagas nesta condição
          </p>
        </div>
      </div>
    </section>
  );
};
