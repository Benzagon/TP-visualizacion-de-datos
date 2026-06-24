import FlourishChart from "./FlourishChart";
import Title from "./Title";

function MapaMate() {
  return (
    <section className="w-full bg-background border-t border-border pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
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

function MapaCafe() {
  return (
    <section className="w-full bg-background border-t border-border pt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="w-full min-w-0">
            <FlourishChart
              visualisationId="29147316"
              type="map"
              title="A más calor, más café"
              description="Consumo de cafe per capita (en kg)"
              height={840}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export {MapaCafe, MapaMate};
