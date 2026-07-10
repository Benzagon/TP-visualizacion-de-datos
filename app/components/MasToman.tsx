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
    <section className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FlourishStory
                storyId="3727018"
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
                          Carta de amor al filtro manual
                        </h3>
                        <p className="mt-2 text-muted leading-relaxed">
                          Un 28% de los encuestados prefiere el café hecho con filtro manual.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
      </div>
    </section>
  );
};

export {MasTomanCafe, MasTomanMate};
