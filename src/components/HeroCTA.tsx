import { Shield, Award, Zap, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroCTA = () => {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Card de destaque */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2 mb-3 inline-block">
            <p className="text-sm md:text-base font-semibold text-primary">
              💡 Curso pensado para quem nunca teve facilidade com computador
            </p>
          </div>

          {/* CTA Principal */}
          <Button
            size="lg"
            onClick={() => document.getElementById('price-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full h-14 md:h-16 text-lg md:text-2xl lg:text-3xl font-bold rounded-full bg-success text-white shadow-lg hover:shadow-xl hover:bg-success/90 hover:scale-[1.02] transition-all duration-300 mb-4 px-4 md:px-6"
          >
            Quero Aprender Informática sem Medo
          </Button>

          {/* Benefícios */}
          <div className="flex flex-wrap gap-2 justify-center items-center mb-3">
            <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-semibold text-xs md:text-sm text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-xs md:text-sm text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-semibold text-xs md:text-sm text-foreground">Certificado incluso</span>
            </div>
            <div className="flex items-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-lg">
              <Headphones className="w-4 h-4 text-primary" />
              <span className="font-semibold text-xs md:text-sm text-foreground">Suporte ao aluno</span>
            </div>
          </div>

          {/* Preço */}
          <div className="text-center mb-2">
            <p className="text-base md:text-lg font-bold text-foreground">
              💰 De <span className="line-through text-muted-foreground">R$ 497,00</span> por apenas{" "}
              <span className="text-success text-xl md:text-2xl font-black">R$ 297,00</span>
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              💳 ou parcele em até 12 x R$ 30,22 (no cartão)
            </p>
          </div>

          {/* Urgência */}
          <p className="text-center text-sm md:text-base font-semibold text-accent mb-3">
            🔥 Aproveite o valor promocional de hoje e comece agora mesmo!
          </p>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5500000000000?text=Olá! Tenho dúvidas sobre o curso."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-12 bg-success/10 hover:bg-success/20 border-2 border-success text-success font-bold rounded-full transition-all duration-300"
          >
            💬 <span className="text-destructive font-black">?</span> Tire suas dúvidas com a Professora Elisa
          </a>
        </div>
      </div>
    </section>
  );
};
