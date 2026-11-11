import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/cta.jpg"
        alt="Lantern-lit Moroccan archway overlooking serene twilight sea"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#064E3B]/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center text-white">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#F6E299] uppercase">
          Begin Your Next Chapter
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          Ready To Plan Your Blessed Journey?
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/90">
          Browse our curated halal destinations or add a new community travel
          package directly to our catalog.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-3 rounded-lg bg-[#C9A227] px-8 py-4 text-sm font-bold tracking-wider text-[#12231B] uppercase transition-colors hover:bg-[#d8b136]"
          >
            Browse Packages
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/add-destination"
            className="rounded-lg border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Add Destination
          </Link>
        </div>
      </div>
    </section>
  );
}

