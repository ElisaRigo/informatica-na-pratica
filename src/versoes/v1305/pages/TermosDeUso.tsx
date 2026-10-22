import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const TermosDeUso = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-black mb-8">Termos de Uso</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site e adquirir o curso Informática na Prática, você concorda com estes Termos de Uso. 
              Se você não concorda com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">2. Sobre o Curso e Resultados</h2>
            <p className="mb-2">
              O curso "Domine Word, Excel e PowerPoint em 30 dias Mesmo Começando do Zero" é uma proposta 
              pedagógica que indica o período estimado para conclusão do conteúdo programático. O título representa 
              uma meta de aprendizado, não uma garantia absoluta de domínio completo em 30 dias.
            </p>
            <p className="mb-2">
              <strong>Importante:</strong> Os resultados individuais podem variar conforme:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Dedicação e tempo de estudo do aluno</li>
              <li>Conhecimento prévio em informática</li>
              <li>Prática e aplicação dos conteúdos aprendidos</li>
              <li>Capacidade individual de aprendizado</li>
            </ul>
            <p className="mb-2">
              <strong>Não garantimos resultados específicos</strong>, como obtenção de emprego, aumento de salário, 
              aprovação em processos seletivos ou qualquer outro resultado profissional ou financeiro. O sucesso 
              do aluno depende exclusivamente de seu esforço, dedicação e aplicação dos conhecimentos adquiridos.
            </p>
            <p>
              Todas as informações, depoimentos e materiais promocionais apresentados no site devem ser interpretados 
              como exemplos de possibilidades, não como promessas ou garantias de resultados idênticos para todos os alunos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Esclarecimento sobre o Prazo de 30 Dias</h2>
            <p className="mb-2">
              O prazo de "30 dias" mencionado em nossos materiais de divulgação é uma <strong>estimativa baseada em estudos 
              de aproximadamente 1 hora por dia</strong>, considerando um aluno com dedicação regular e ambiente adequado de estudo.
            </p>
            <p className="mb-2">
              Este prazo <strong>não constitui promessa ou garantia</strong> de que todos os alunos dominarão completamente 
              todos os conteúdos neste período. Cada pessoa possui seu próprio ritmo de aprendizado, e fatores como 
              disponibilidade de tempo, familiaridade prévia com tecnologia e frequência de prática podem influenciar 
              significativamente o tempo necessário para conclusão.
            </p>
            <p className="mb-2">
              O aluno declara estar ciente de que:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>O prazo de 30 dias é uma estimativa, não uma garantia;</li>
              <li>Os resultados dependem do seu esforço e dedicação individual;</li>
              <li>O acesso ao curso é vitalício, permitindo que estude no seu próprio ritmo;</li>
              <li>Não há penalidades ou limitações caso o aluno necessite de mais tempo para concluir o curso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">3. Uso da Plataforma</h2>
            <p className="mb-2">
              O acesso ao curso é pessoal e intransferível. O aluno se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Não compartilhar seu login e senha com terceiros</li>
              <li>Não reproduzir, distribuir ou comercializar o conteúdo do curso</li>
              <li>Usar o material exclusivamente para fins de aprendizado pessoal</li>
              <li>Respeitar os direitos autorais de todo o conteúdo disponibilizado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do curso, incluindo textos, vídeos, imagens, materiais didáticos e exercícios, 
              é de propriedade exclusiva de Elisangela Neri Rigo e está protegido por direitos autorais. 
              É proibida a reprodução total ou parcial sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">5. Pagamento e Reembolso</h2>
            <p className="mb-2">
              O curso oferece garantia incondicional de 7 dias. Durante este período, o aluno pode solicitar 
              o reembolso total do valor pago, sem necessidade de justificativa.
            </p>
            <p>
              Após o período de garantia, não serão aceitos pedidos de reembolso, exceto em casos previstos 
              pelo Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">6. Acesso ao Curso</h2>
            <p>
              O acesso ao curso é vitalício a partir da data de confirmação do pagamento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">7. Certificado</h2>
            <p>
              O certificado de conclusão será emitido após a conclusão de todos os módulos do curso. 
              O certificado é digital e pode ser usado em currículos e processos seletivos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">8. Responsabilidades</h2>
            <p className="mb-2">
              A Informática na Prática se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer conteúdo de qualidade e atualizado</li>
              <li>Manter a plataforma funcionando adequadamente</li>
              <li>Oferecer suporte aos alunos</li>
              <li>Proteger os dados pessoais dos usuários</li>
            </ul>
            <p className="mt-4">
              O aluno é responsável por manter seus dados de acesso seguros e por informar imediatamente 
              qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">9. Modificações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
              em vigor imediatamente após sua publicação no site. O uso continuado do serviço após as 
              alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">10. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa 
              relacionada a estes termos será submetida ao foro da comarca de domicílio do aluno.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">11. Contato</h2>
            <p>
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do WhatsApp: 
              (45) 98828-7082 ou pelo e-mail disponível no site.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-line">
            <p className="text-sm">
              <strong>Elisangela Neri Rigo</strong><br />
              <strong>CNPJ:</strong> 32.373.460/0001-51<br />
              <strong>Última atualização:</strong> Janeiro de 2025
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="text-primary hover:text-accent transition-colors font-semibold"
          >
            ← Voltar para a página inicial
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};
