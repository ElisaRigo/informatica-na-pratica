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
      />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default Icone2;
