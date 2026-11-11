import { Compass, ShieldCheck, Utensils } from "lucide-react";

const features = [
  {
    icon: Utensils,
    title: "100% Zabiha Halal Dining",
    description:
      "Every partner hotel, restaurant, and culinary stop is thoroughly verified for authentic halal food and alcohol-free family comfort.",
  },
  {
    icon: Compass,
    title: "Prayer-Conscious Itineraries",
    description:
      "Daily schedules harmonize seamlessly with Salah timings, featuring nearby Masjids, quiet prayer spaces, and Qibla-ready rooms.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Heritage Guides",
    description:
      "Travel alongside knowledgeable local Muslim guides who bring sacred sites and Islamic history to life with warmth and care.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="islamic-lattice-bg w-full border-t border-[#C9A227]/40 bg-[#F3EFE6] px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-2xl border border-dashed border-[#047857]/30 bg-card/60 px-6 py-14 backdrop-blur-xs md:px-12">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#8a6508] uppercase">
            Our Amanah (Trust)
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
            Why Travel With Rihlah
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Thoughtfully crafted journeys where spiritual peace, cultural depth,
            and modern comfort meet.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#047857]/10 text-[#047857]">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

