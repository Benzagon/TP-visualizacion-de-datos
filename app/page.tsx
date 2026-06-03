import ConsumoCalendario from "./components/ConsumoCalendario";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Mapas from "./components/Mapas";
import MasToman from "./components/MasToman";
import MateSection from "./components/MateSection";
import PageStagger from "./components/motion/PageStagger";
import Produccion from "./components/Produccion";

export default function Page() {
  return (
    <>
      <PageStagger>
        <Hero />
      </PageStagger>
      <MateSection />
      <PageStagger>
        <Mapas />
        <Produccion />
        <MasToman />
        {/* <ConsumoCalendario /> */}
        <Footer />
      </PageStagger>
    </>
  );
}
