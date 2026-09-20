import { useEffect } from "react";
import {
  Award,
  CheckCircle2,
  Headphones,
  Infinity,
  Lock,
  Monitor,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import elisa from "@/assets/elisa-photo.jpg";
import { openHotmartCheckout } from "@/lib/checkoutTracking";

interface CourseEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "default" | "remarketing";
}

const benefits = [
  { icon: Zap, label: "Acesso imediato" },
  { icon: ShieldCheck, label: "Garantia 7 dias" },
  { icon: Headphones, label: "Suporte humanizado" },
  { icon: Infinity, label: "Acesso vitalício" },
];

const copy = {
  default: {
    title: "Falta pouco para você começar!",
    socialProof: "+15.000 alunos já aprenderam comigo",
    guaranteeHeadline: "7 dias de garantia incondicional",
    guaranteeSub: "Risco zero para você",
    cta: "Quero acessar o curso",
  },
  remarketing: {
    title: "Que bom que você voltou! Falta só um passo para começar",
    socialProof: "+15.000 alunos também achavam que não iam conseguir",
    guaranteeHeadline: "Se não gostar em 7 dias, devolvemos 100% do seu dinheiro",
    guaranteeSub: "Risco zero para você",
    cta: "Sim, quero aprender com você, Profª Elisa",
  },
};

export const CourseEnrollmentDialog = ({ open, onOpenChange, variant = "default" }: CourseEnrollmentDialogProps) => {
  const t = copy[variant];

  useEffect(() => {
    if (!open) return;

    window.history.pushState({ courseCheckout: true }, "");
    const closeOnBack = () => onOpenChange(false);
    window.addEventListener("popstate", closeOnBack);

    return () => window.removeEventListener("popstate", closeOnBack);
  }, [open, onOpenChange]);

  const continueToCheckout = () => {
    onOpenChange(false);
    openHotmartCheckout();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-1rem)] max-w-sm max-h-[96dvh] overflow-y-auto gap-0 border-primary/20 bg-background p-3 pt-9 shadow-2xl sm:rounded-xl md:max-w-md md:p-5 md:pt-10"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex items-center justify-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-success">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Ambiente 100% seguro
        </div>

        <DialogTitle className="mt-2.5 flex items-center justify-center gap-2 text-center text-lg font-black leading-tight text-foreground md:text-xl">
          <Monitor className="h-5 w-5 shrink-0 text-primary" />
          {t.title}
        </DialogTitle>

        <div className="mt-2.5 text-center">
          <div className="relative mx-auto w-fit">
            <img
              src={elisa}
              alt="Professora Elisa"
              className="h-20 w-20 rounded-full border-4 border-primary/20 object-cover object-[center_20%] shadow-card md:h-24 md:w-24"
            />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-success px-2.5 py-0.5 text-[10px] font-black text-success-foreground shadow-card md:text-xs">
              PROFª ELISA
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-muted-foreground md:text-base">
            Eu vou estar com você passo a passo!
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <div className="flex" aria-label="Avaliação de 5 estrelas">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <span className="text-xs font-bold text-foreground md:text-sm">{t.socialProof}</span>
          </div>
        </div>

        {variant === "remarketing" && (
          <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-center text-xs font-black text-success md:text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Sua condição de 40% OFF + 4 bônus exclusivos continua ativa
          </div>
        )}

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {benefits.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-panel px-1 py-1.5 text-center">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground md:text-sm">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center text-xs font-bold text-muted-foreground md:text-sm">
          Pix, cartão ou boleto: você escolhe no próximo passo
        </p>

        <div className="mt-3 text-center">
          <p className="text-sm text-muted-foreground">
            De <span className="line-through">R$ 497,00</span> por apenas
          </p>
          <p className="mt-0.5 text-4xl font-black leading-none text-success md:text-5xl">R$ 297</p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground md:text-sm">à vista ou em até 12x de R$ 30,72 no cartão</p>
        </div>

        <div className="mt-3 rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-black text-success">
            <Award className="h-4 w-4 shrink-0" /> {t.guaranteeHeadline}
          </p>
          <p className="mt-0.5 text-xs font-bold text-success">{t.guaranteeSub}</p>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-center text-xs text-muted-foreground">
          <Lock className="h-4 w-4 shrink-0 text-primary" />
          <span>Pagamento processado com segurança pela plataforma <strong className="text-foreground">Hotmart</strong></span>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={continueToCheckout}
          className="mt-2.5 h-auto w-full whitespace-normal rounded-xl bg-success px-4 py-3.5 text-base font-black text-success-foreground shadow-cta hover:bg-success/90 md:text-lg"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          {t.cta}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
