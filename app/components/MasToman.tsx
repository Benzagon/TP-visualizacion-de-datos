import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";

const MasToman = () => {
  return (
    <section className="w-full bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Title>Las categorías</Title>
        <div className="mt-16 md:mt-20 space-y-20 md:space-y-24">
          <div className="max-w-5xl">
            <FlourishChart
              visualisationId="29226983"
              type="chart"
              title="Los mates dulces son los mas consumidos"
              description="Cantidad de personas que prefieren cada tipo de mate"
              height={400}
            />
          </div>
          <div className="max-w-5xl ml-auto">
            <FlourishChart
              visualisationId="29147797"
              type="chart"
              title="Los cafés de filtro manual son los mas consumidos"
              description="Cantidad de personas por tipo de café que prefieren"
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasToman;
