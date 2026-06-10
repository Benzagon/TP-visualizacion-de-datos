import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";

const ProduccionCafe = () => {
  return (
    <>
      <section className="w-full bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div>
            <Title>
              Brasil, líder en producción de{" "}
              <span className="text-accent-brown">café</span>
            </Title>
            <div className="mt-8 md:mt-8 max-w-5xl mx-auto">
              <FlourishChart
                visualisationId="29154655"
                type="hierarchy"
                title="Principales productores de café de LATAM"
                width="88%"
                className="text-center mt-0"
                height={780}
              />
            </div>
          </div>

          <div className="mt-8">
            <Title>Brasil no para de producir</Title>
            <div className="mt-16 md:mt-20">
              <FlourishChart
                visualisationId="29154705"
                type="chart"
                title="2018, pico de producción"
                description="Producción caficultora de Brasil a través del tiempo."
                height={680}
              />
            </div>
          </div>

          <div className="mt-8">
            <Title>3coracões lídera la producción</Title>
            <div className="mt-8 md:mt-8 max-w-5xl mx-auto">
              <FlourishChart
                visualisationId="29188502"
                type="bubbles"
                title="Empresas de café más grandes de latam por market share."
                className="text-center"
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ProduccionMate = () => {
  return (
    <>
      <section className="w-full bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div>
            <Title>
              Argentina domina la producción de 
              <span className="text-accent"> mate</span>
            </Title>
            <div className="mt-8 md:mt-8 max-w-5xl mx-auto">
              <FlourishChart
                visualisationId="29322031"
                type="hierarchy"
                title="Principales productores de mate en LATAM"
                width="88%"
                className="text-center mt-0"
                height={780}
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
            <Title dark>
              El crecimiento no para
            </Title>
            <div className="mt-8">
              <FlourishChart
                visualisationId="29147963"
                type="chart"
                description="Producción argentina de yerba mate a través del tiempo"
                height={700}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export {ProduccionCafe, ProduccionMate};
