import FlourishStory from "./FlourishStory";
import Title from "./Title";

export default function TiposYerba() {
    return (
        <section className="w-full bg-background">
            <div className="max-w-7xl mx-12 px-6 flex justify-center items-center">
                <div className="mt-8 md:mt-8 max-w-5xl grid gap-4">
                    <Title>La yerba y sus matices</Title>
                    <FlourishStory
                        storyId="3729590"
                        steps={[
                            {
                                slide: 1,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Yerba con palo
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            La yerba con palo es la más tradicional. Contiene tallos molidos que suavizan el sabor y la hacen ideal para el mate diario.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                slide: 2,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Yerba sin palo
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            La yerba sin palo tiene mayor proporción de hoja molidaa. Su sabor es más intenso y su duración en el mate suele ser mayor.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                slide: 3,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Yerba compuesta
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            La yerba compuesta mezcla yerba mate con hierbas como menta, cedrón o boldo. Ofrece sabores variados y propiedades digestivas o relajantes.
                                        </p>
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}