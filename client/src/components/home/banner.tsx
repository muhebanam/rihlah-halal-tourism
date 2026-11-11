"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { HALAL_CATEGORIES } from "@/lib/types/destinations";

export function Banner() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (category !== "All") params.set("category", category);
    if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());

    const query = params.toString();
    router.push(query ? `/destinations?${query}` : "/destinations");
  };

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] w-full overflow-hidden">
      {/* Hero Background Image */}
      <Image
        src="/images/banner.jpg"
        alt="Golden hour courtyard of Islamic palace architecture with emerald reflecting pool"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#064E3B]/70 via-[#064E3B]/50 to-[#052e23]/85" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-44 text-center text-white md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/50 bg-[#064E3B]/70 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#F6E299] uppercase backdrop-blur-sm">
          <Sparkles className="size-3.5 text-[#C9A227]" />
          Curated Halal & Spiritual Travel
        </span>

        <h1 className="mt-6 font-serif text-5xl leading-[1.08] font-semibold tracking-tight md:text-7xl">
          Discover Sacred &amp;
          <br />
          Halal Journeys
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          Explore Umrah &amp; Ziyarat sanctuaries, iconic Islamic heritage cities,
          and peaceful family-friendly halal resorts designed around prayer times
          and certified cuisine.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-3 rounded-lg bg-[#047857] px-7 py-3.5 text-sm font-semibold tracking-wider text-white uppercase shadow-lg transition-colors hover:bg-[#064E3B]"
          >
            Explore Destinations
            <ArrowRight className="size-4 text-[#C9A227]" />
          </Link>
          <Link
            href="/add-destination"
            className="rounded-lg border border-[#C9A227]/60 bg-white/15 px-7 py-3.5 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            Add Travel Package
          </Link>
        </div>
      </div>

      {/* Functional Search Bar */}
      <form
        onSubmit={handleSearch}
        className="relative z-10 mx-auto -mt-12 mb-8 flex max-w-6xl flex-col overflow-hidden rounded-xl border border-[#C9A227]/35 bg-[#064E3B]/90 shadow-2xl backdrop-blur-md md:absolute md:inset-x-6 md:bottom-8 md:mt-0 md:mb-0 md:flex-row"
      >
        <div className="flex-1 border-b border-white/15 px-5 py-3.5 md:border-r md:border-b-0">
          <label
            htmlFor="hero-search"
            className="block text-xs font-semibold tracking-wider text-[#C9A227] uppercase"
          >
            Destination or Country
          </label>
          <input
            id="hero-search"
            type="text"
            placeholder="e.g., Makkah, Istanbul, Granada..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>

        <div className="flex-1 border-b border-white/15 px-5 py-3.5 md:border-r md:border-b-0">
          <label
            htmlFor="hero-category"
            className="block text-xs font-semibold tracking-wider text-[#C9A227] uppercase"
          >
            Journey Type
          </label>
          <select
            id="hero-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-white focus:outline-none [&>option]:bg-[#064E3B] [&>option]:text-white"
          >
            <option value="All">All Halal Categories</option>
            {HALAL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 border-b border-white/15 px-5 py-3.5 md:border-r md:border-b-0">
          <label
            htmlFor="hero-budget"
            className="block text-xs font-semibold tracking-wider text-[#C9A227] uppercase"
          >
            Max Budget (USD)
          </label>
          <input
            id="hero-budget"
            type="number"
            min="0"
            placeholder="e.g., 1600"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[#C9A227] px-10 py-4 text-sm font-bold tracking-wider text-[#12231B] uppercase transition-colors hover:bg-[#d8b136] cursor-pointer"
        >
          <Search className="size-4" />
          Search
        </button>
      </form>
    </section>
  );
}

