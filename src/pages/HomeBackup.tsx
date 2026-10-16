import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import { useLeadCaptureDialog } from "@/hooks/useLeadCaptureDialog";
import VendasNovo from "@/versoes/homebackup/pages/VendasNovo";

const HomeBackup = () => {
  const { isOpen, closeDialog } = useLeadCaptureDialog();
  return (
    <div className="min-h-screen">
      <VendasNovo />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default HomeBackup;
