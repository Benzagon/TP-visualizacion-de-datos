import React from "react";
import Title from "./Title";
import FlourishChart from "./FlourishChart";
import FlourishStory from "./FlourishStory";

const MasTomanMate = () => {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20">
        <div className="">
          <div className="mt-8">
            <FlourishStory
                storyId="3726647"
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
                          El mate se toma dulce.
                        </h3>
                        <p className="mt-2 text-muted leading-relaxed">
                          Un 29% de los encuestados prefiere el mate con algún tipo de endulzante.
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
