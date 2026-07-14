import FlourishStory from "./FlourishStory";
import Title from "./Title";

function MapaMate() {
  return (
    <section className="w-full bg-background pt-8">
      <div className="mx-auto px-6 md:px-10 mb-8">
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-12 lg:gap-16">
          <div className="w-full min-w-0 grid gap-4">
            <Title>Consumo de mate en Sudamérica</Title>
            <FlourishStory
              storyId="3726948"
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
                        Argentina, adicta al mate.
                      </h3>
                      <p className="mt-2 text-muted leading-relaxed">
                        El país con mayor consumo de mate per capita en sudamérica.
                      </p>
                    </>
                  ),
                },
              ]}
            />
            {/* <FlourishChart
              visualisationId="29146920"
              type="map"
              title="Argentina, adicta al mate"
              description="Consumo de mate per capita (en kg)"
              height={840}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapaCafe() {
  return (
    <section className="w-full bg-background pt-8">
      <div className="mx-auto px-6 md:px-10 mb-8">
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-12 lg:gap-16">
          <div className="w-full min-w-0 grid gap-4">
            <Title>Consumo de café en Sudamérica</Title>
            <FlourishStory
              storyId="3727020"
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
                        A más calor, más café
                      </h3>
                      <p className="mt-2 text-muted leading-relaxed">
                        Los países del ecuador consumen más café per capita en sudamérica.
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
}

export {MapaCafe, MapaMate};
