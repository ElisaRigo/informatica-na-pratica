import { TopBanner } from "@/paginas/informa/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/paginas/informa/VendasNovo";
import logo from "@/assets/logo-blue.png";
import "@/paginas/informa/estilo.css";

const Informa = () => (
  <div className="info-spacing informa-light min-h-screen">
    <div className="flex justify-center px-4 pt-4 pb-2">
      <img src={logo} alt="Informática na Prática" className="h-16 w-auto md:h-24 lg:h-28" />
    </div>
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default Informa;
