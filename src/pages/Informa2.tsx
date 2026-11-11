import { TopBanner } from "@/paginas/informa2/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/paginas/informa2/VendasNovo";
import "@/paginas/informa2/estilo.css";

const Informa2 = () => (
  <div className="informa2-spacing min-h-screen">
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default Informa2;
