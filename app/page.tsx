import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Mapas from "./components/Mapas";
import MasToman from "./components/MasToman";
import Produccion from "./components/Produccion";

export default function Page() {
  return (
    <>
      <Hero />
      <Mapas />
      <Produccion />
      <MasToman />
      <Footer />
    </>
  );
}
