import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import { useLeadCaptureDialog } from "@/hooks/useLeadCaptureDialog";
import VendasNovo from "@/versoes/homebackup/pages/VendasNovo";

const Icone2 = () => {
  const { isOpen, closeDialog } = useLeadCaptureDialog();
  return (
    <div className="min-h-screen">
      <VendasNovo
        videoThumb="/images/capa-primeiro-video-icone2.jpg"
        centerPlay
        instructorPhoto="/images/prof-elisa.jpg"
        instructorFirst
        minimalCtas
        hideWhatsFloat
        headline={
          <h1 className="icone2-headline font-hero">
            <span className="icone2-headline-intro">Domine o</span>
            <span className="icone2-headline-computer">Computador</span>
            <span className="icone2-headline-support">
              <span>Aprenda do ZERO com calma e paciência</span>
              <span>{"\n"}</span>
              <span>{"\n"}</span>
            </span>
          </h1>
        }
      />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default Icone2;
