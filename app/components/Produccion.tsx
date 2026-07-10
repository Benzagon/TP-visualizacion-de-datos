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
            <Title>3coracões lidera la producción</Title>
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
              <FlourishStory
                storyId="3726609"
                steps={[
                  {
                    slide: 1,
                    hide: true,
                    content: (
                      <>
                      </>
                    ),
                  },
                  {
                    slide: 2,
                    content: (
                      <>
                        <h3 className="font-display text-2xl font-medium text-center">
                        Argentina domina la producción de yerba mate en Sudamérica
                        </h3>
                        <p className="mt-2 text-muted leading-relaxed">
Argentina, Brasil y Paraguay concentran la producción mundial de yerba mate. Argentina lidera con 882.6 millones de sacos producidos.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
            <div className="mt-8">
              <FlourishStory
                storyId="3713871"
                steps={[
                  {
                    slide: 1,
                    hide: true,
                    content: (
                      <>
                      </>
                    ),
                  },
                  {
                    slide: 2,
                    content: (
                      <>
                        <h3 className="font-display text-2xl font-medium text-center">
                        Producción en 1999:
                        703.4 miles de toneladas
                        </h3>
                        <p className="mt-2 text-muted leading-relaxed">
En 1999 la producción de yerba mate creció fuertemente debido a mejores condiciones climáticas, expansión del cultivo y una recuperación del consumo interno.
                        </p>
                      </>
                    ),
                  },
                  {
                    slide: 3,
                    content: (
                      <>
                        <h3 className="font-display text-2xl font-medium text-center">
                          Producción en 2014:
                          849 miles de toneladas
                        </h3>
                        <p className="mt-2 text-muted leading-relaxed">
En 2014 la yerba mate ganó presencia internacional como producto asociado a hábitos saludables, aumentando la demanda y las inversiones del sector.
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
