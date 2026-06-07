import FlourishChart from "./FlourishChart";
import Title from "./Title";

function Mapas() {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Title>
          El consumo de <span className="text-accent-brown">café</span> y{" "}
          <span className="text-accent">mate</span> en LATAM
        </Title>
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="w-full min-w-0">
            <FlourishChart
              visualisationId="29147316"
              type="map"
              title="Guyana, consumidores de café"
              description="Consumo de cafe per capita (en kg)"
              height={840}
            />
          </div>
          <div className="w-full min-w-0">
            <FlourishChart
              visualisationId="29146920"
              type="map"
              title="Argentina, adicta al mate"
              description="Consumo de mate per capita (en kg)"
              height={840}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mapas;
