import { TopBanner } from "@/paginas/informa/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/paginas/informa/VendasNovo";
import "@/paginas/informa/estilo.css";

const Informa = () => (
  <div className="info-spacing min-h-screen">
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default Informa;
