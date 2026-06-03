import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";

const HombresMujeres = () => {
  return (
    <section className="w-full bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Title dark>
          Los hombres toman más <span className="text-accent">café</span> que las
          mujeres
        </Title>
        <div className="mt-16 md:mt-20">
          <FlourishChart
            dark
            visualisationId="29146983"
            type="chart"
            title="Los hombres toman más café que las mujeres"
            description="Consumo de café por dia por rango etario"
          />
        </div>
      </div>
    </section>
  );
};

export default HombresMujeres;
