import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import altitudImage from "../../public/altitud.jpg";
import drenajeImage from "../../public/drenaje.jpg";
import sombraImage from "../../public/sombra.jpg";

type PlantationCafeBlock = {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  imageSide: "left" | "right";
  content: ReactNode;
};

const BLOCKS: PlantationCafeBlock[] = [
  {
    title: "Altitud y temperatura",
    image: altitudImage,
    imageAlt: "Cultivo de café en altura",
    imageSide: "left",
    content: (
      <>
        El <span className="rounded-sm px-1.5 py-0.5">Café arábica</span> se
        desarrolla mejor entre{" "}
        <span className="rounded-sm px-1.5 py-0.5">900 y 2000 metros</span>{" "}
        sobre el nivel del mar, con temperaturas medias de{" "}
        <span className="rounded-sm px-1.5 py-0.5">15 a 24°C</span>. Las alturas
        elevadas y el clima fresco favorecen una maduración lenta que mejora la
        calidad del grano.
      </>
    ),
  },
  {
    title: "Suelo y drenaje",
    image: drenajeImage,
    imageAlt: "Suelo volcánico con buen drenaje para café",
    imageSide: "right",
    content: (
      <>
        Requiere suelos profundos, ricos en{" "}
        <span className="rounded-sm px-1.5 py-0.5">materia orgánica</span> y con{" "}
        <span className="rounded-sm px-1.5 py-0.5">buen drenaje</span>, idealmente
        de origen volcánico. Un pH ligeramente ácido (entre{" "}
        <span className="rounded-sm px-1.5 py-0.5">6 y 6.5</span>) favorece la
        absorción de nutrientes esenciales.
      </>
    ),
  },
  {
    title: "Sombra y precipitación",
    image: sombraImage,
    imageAlt: "Plantación de café bajo sombra parcial",
    imageSide: "left",
    content: (
      <>
        Prospera bajo{" "}
        <span className="rounded-sm px-1.5 py-0.5">sombra parcial</span>, que
        protege la planta del sol directo y regula la temperatura. Necesita
        entre{" "}
        <span className="rounded-sm px-1.5 py-0.5">1500 y 2000 mm</span> de lluvia
        anuales, bien distribuidos, con un período seco breve para estimular la
        floración.
      </>
    ),
  },
];

function PlantationCafeImage({ block }: { block: PlantationCafeBlock }) {
  return (
    <div className="sticky top-0 flex h-screen w-1/2 shrink-0 items-center self-start overflow-hidden p-16">
      <div className="relative h-[76vh] w-full overflow-hidden rounded-2xl">
        <Image
          src={block.image}
          alt={block.imageAlt}
          fill
          className="object-cover object-center"
          sizes="50vw"
          placeholder="blur"
        />
      </div>
    </div>
  );
}

function PlantationCafeText({ block }: { block: PlantationCafeBlock }) {
  return (
    <div className="w-1/2 bg-background">
      <div className="flex min-h-[140vh] items-center px-16 py-32">
        <div className="max-w-md">
          <h2 className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
            {block.title}
          </h2>

          <p className="mt-6 font-body text-lg font-normal leading-relaxed text-muted [&_span]:bg-accent/10 [&_span]:text-accent">
            {block.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlantationCafeBlock({ block }: { block: PlantationCafeBlock }) {
  const image = <PlantationCafeImage block={block} />;
  const text = <PlantationCafeText block={block} />;

  return (
    <section className="flex w-full flex-row bg-background">
      {block.imageSide === "left" ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </section>
  );
}

export default function PlantationCafe() {
  return (
    <section className="w-full border-t border-border bg-background">
      {BLOCKS.map((block) => (
        <PlantationCafeBlock key={block.title} block={block} />
      ))}
    </section>
  );
}
