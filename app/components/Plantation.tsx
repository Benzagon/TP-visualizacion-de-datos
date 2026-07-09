import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import tierraImage from "../../public/tierra.jpg";
import climaImage from "../../public/clima.jpg";

type PlantationBlock = {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  imageSide: "left" | "right";
  content: ReactNode;
};

const BLOCKS: PlantationBlock[] = [
  {
    title: "Suelo",
    image: tierraImage,
    imageAlt: "Suelo rojo de cultivo de yerba mate",
    imageSide: "left",
    content: (
      <>
        La yerba mate prospera en{" "}
        <span className="rounded-sm px-1.5 py-0.5">
          suelos rojos profundos
        </span>
        , bien drenados y ricos en materia orgánica, con un pH ligeramente
        ácido (entre 4,5 y 6,5). Requiere{" "}
        <span className="rounded-sm px-1.5 py-0.5">
          buena permeabilidad
        </span>{" "}
        para evitar el encharcamiento de sus raíces.
      </>
    ),
  },
  {
    title: "Clima",
    image: climaImage,
    imageAlt: "Plantación de yerba mate en clima húmedo",
    imageSide: "right",
    content: (
      <>
        Se desarrolla mejor en{" "}
        <span className="rounded-sm px-1.5 py-0.5">
          climas subtropicales húmedos
        </span>
        , con temperaturas medias de entre 20°C y 22°C y precipitaciones
        abundantes y bien distribuidas a lo largo del año (1500-2000 mm).
        Tolera heladas leves pero prefiere ambientes con{" "}
        <span className="rounded-sm px-1.5 py-0.5">
          alta humedad relativa
        </span>
        .
      </>
    ),
  },
];

function PlantationImage({ block }: { block: PlantationBlock }) {
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

function PlantationText({ block }: { block: PlantationBlock }) {
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

function PlantationBlock({ block }: { block: PlantationBlock }) {
  const image = <PlantationImage block={block} />;
  const text = <PlantationText block={block} />;

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

export default function Plantation() {
  return (
    <section className="w-full border-t border-border bg-background">
      {BLOCKS.map((block) => (
        <PlantationBlock key={block.title} block={block} />
      ))}
    </section>
  );
}
