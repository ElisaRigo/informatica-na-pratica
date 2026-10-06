import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LeadCaptureDialog } from "@/components/LeadCaptureDialog";
import { useLeadCaptureDialog } from "@/hooks/useLeadCaptureDialog";
import VendasNovo from "@/versoes/v0607/pages/VendasNovo";

const Index = () => {
  const { isOpen, closeDialog } = useLeadCaptureDialog();

  return (
    <div className="min-h-screen">
      <VendasNovo />
      <WhatsAppButton />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default Index;
