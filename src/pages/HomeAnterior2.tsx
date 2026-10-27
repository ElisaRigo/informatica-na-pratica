import { Header, TopBanner } from "@/versoes/v2909/pages/Remarketing";
import VendasNovo from "@/versoes/v2909/pages/VendasNovo";
import "./home-anterior-2.css";

const HomeAnterior2 = () => (
  <div className="min-h-screen">
    <Header />
    <TopBanner />
    <VendasNovo remarketingTop />
  </div>
);

export default HomeAnterior2;
