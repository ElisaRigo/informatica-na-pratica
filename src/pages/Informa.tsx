import { TopBanner } from "@/versoes/v2909/pages/Remarketing";
import { Header } from "@/versoes/homebackup/pages/VendasNovo";
import VendasNovo from "@/versoes/v2909/pages/VendasNovo";
import "./home-anterior-2.css";

const Informa = () => (
  <div className="info-spacing min-h-screen">
    <Header light />
    <TopBanner />
    <VendasNovo remarketingTop whatsappCta />
  </div>
);

export default Informa;
