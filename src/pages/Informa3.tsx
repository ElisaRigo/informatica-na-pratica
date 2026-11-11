import { TopBanner } from "@/paginas/informa3/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/paginas/informa3/VendasNovo";
import "@/paginas/informa3/estilo.css";

const Informa3 = () => (
  <div className="informa3-spacing informa3-light min-h-screen">
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default Informa3;
