import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";

const MasTomanMate = () => {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
        <Title>Predomina la dulzura</Title>
        <div className="">
          <div className="mt-8">
            <FlourishChart
              dark
              visualisationId="29226983"
              type="chart"
              description="Cantidad de personas que prefieren cada tipo de mate"
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
const MasTomanCafe = () => {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <Title>Carta de amor al <span className="text-accent-brown">filtro manual</span></Title>        
          <div className="mt-4">
          <div className="">
             <FlourishChart
              dark
              visualisationId="29147797"
              type="chart"
              description="Cantidad de personas por tipo de café que prefieren"
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export {MasTomanCafe, MasTomanMate};
