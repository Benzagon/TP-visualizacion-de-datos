import React from "react";
import Title from "./Title";
import FlourishStory from "./FlourishStory";

const MasTomanMate = () => {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
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
                      434 personas prefieren el mate con algún tipo de endulzante.
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
                          1094 personas prefieren el café hecho con filtro manual.
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
