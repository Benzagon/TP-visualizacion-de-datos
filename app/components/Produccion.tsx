import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";
import FlourishStory from "./FlourishStory";

const ProduccionCafe = () => {
  return (
    <>
      <section className="w-full bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
          <div>
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
            <Title>3coracões líder en la producción</Title>
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
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
          <div>
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
              El siglo del <span className="text-accent"> mate</span>
            </Title>
            <div className="mt-8">
              <FlourishStory
                storyId="3713850"
                title="Mi historia"
                description="Texto opcional debajo del título"
                steps={[
                  {
                    slide: 1,
                    content: (
                      <>
                        <h3 className="font-display text-2xl font-medium">
                          Primer paso
                        </h3>
                        <p className="mt-4 text-muted leading-relaxed">
                          Este texto acompaña la slide 1 de la historia.
                        </p>
                      </>
                    ),
                  },
                  {
                    slide: 2,
                    content: (
                      <>
                        <h3 className="font-display text-2xl font-medium">
                          Segundo paso
                        </h3>
                        <p className="mt-4 text-muted leading-relaxed">
                          Al llegar acá, Flourish debería avanzar a la slide 2.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export {ProduccionCafe, ProduccionMate};
