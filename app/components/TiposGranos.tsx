import FlourishStory from "./FlourishStory";
import Title from "./Title";

export default function TiposGranos() {
    return (
        <section className="w-full bg-background">
            <div className="max-w-7xl mx-12 px-6 flex justify-center items-center">
                <div className="mt-8 md:mt-8 max-w-5xl grid gap-4">
                    <FlourishStory
                        storyId="3729618"
                        steps={[
                            {
                                slide: 1,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Café Arábica
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            El café arábica es el más cultivado del mundo. Se destaca por su sabor suave, fragante y ligeramente ácido, con notas frutales o florales.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                slide: 2,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Café Robusta
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            El café robusta tiene más cafeína y un sabor más fuerte y amargo. Su textura es más cremosa y se utiliza frecuentemente en espressos y blends.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                slide: 3,
                                content: (
                                    <>
                                        <h3 className="font-display text-2xl font-medium text-center">
                                            Café Libérica
                                        </h3>
                                        <p className="mt-2 text-muted leading-relaxed">
                                            El café libérica es el menos conocido. Sus granos son más grandes y su perfil es más ahumado y aromático, con un cuerpo robusto y notas florales.
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