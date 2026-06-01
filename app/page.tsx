import FlourishChart from "./components/FlourishChart";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="w-full p-12 h-fit bg-background">
        <div className="w-full p-12 flex items-start justify-center gap-2">
          <div className="w-[50%]">
            <FlourishChart
              visualisationId="29147316"
              type="map"
              title="Coffee Origins"
              description="Where the world's coffee beans come from."
              className="w-20"
            />
          </div>
          <div className="w-[50%]">
            <FlourishChart
              visualisationId="29146920"
              type="map"
              title="Mate consumtion"
              description="Consumo de mate"
              className="w-20"
            />
          </div>
        </div>
      </div>
    </>
  );
}
