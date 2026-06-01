import FlourishChart from "./components/FlourishChart";

export default function Home() {
  return (
    <div className="w-full h-screen">
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
  );
}
