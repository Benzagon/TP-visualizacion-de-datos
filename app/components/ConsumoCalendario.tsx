import CalendarHeatmap from "./CalendarHeatmap";
import Title from "./Title";

export default function ConsumoCalendario() {
  return (
    <section className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <Title>
          Ritmo diario de <span className="text-accent">consumo</span>
        </Title>
        <div className="mt-16 md:mt-20">
          <CalendarHeatmap />
        </div>
      </div>
    </section>
  );
}
