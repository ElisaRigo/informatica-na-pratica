import { TopBanner } from "@/paginas/info/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/paginas/info/VendasNovo";
import "@/paginas/info/estilo.css";

const HomeAnterior2 = () => (
  <div className="info-spacing min-h-screen">
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default HomeAnterior2;
