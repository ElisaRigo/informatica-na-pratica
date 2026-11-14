import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import { useLeadCaptureDialog } from "@/hooks/useLeadCaptureDialog";
import VendasNovo from "@/versoes/homebackup/pages/VendasNovo";
import capaIcone2 from "@/assets/capa-primeiro-video-icone2.jpg.asset.json";

const Icone2 = () => {
  const { isOpen, closeDialog } = useLeadCaptureDialog();
  return (
    <div className="min-h-screen">
      <VendasNovo videoThumb={capaIcone2.url} />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default Icone2;
