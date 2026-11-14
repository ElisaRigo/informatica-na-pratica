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
        hidePrograms
        headline={
          <h1 className="mx-auto mb-4 w-full text-center font-black leading-tight text-slate-50">
            <span className="block whitespace-nowrap leading-none [font-size:calc((100vw_-_32px)/8)] md:[font-size:min(calc((100vw_-_32px)/7),5.5rem)]">Domine o</span>
            <span className="relative mt-1 block w-full leading-none">
              <span className="relative z-10 whitespace-nowrap text-[46px] font-black leading-none min-[375px]:text-[54px] sm:text-[80px] md:[font-size:min(calc((100vw_-_32px)/7),9rem)]">
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Computador</span>
              </span>
              <span className="absolute inset-x-0 bottom-[0.04em] z-0 h-1 rounded-full bg-gradient-to-r from-sky-400/0 via-cyan-300/80 to-sky-400/0 md:h-2" />
            </span>
            <span className="mt-1 block text-[6.7vw] leading-tight md:text-[4.6rem]">Aprenda do ZERO com calma e paciência</span>
          </h1>
        }
      />
      <LeadCaptureDialog open={isOpen} onOpenChange={(open) => !open && closeDialog()} />
    </div>
  );
};

export default Icone2;
