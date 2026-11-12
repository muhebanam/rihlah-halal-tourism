"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  MapPin,
  PlusCircle,
  Search,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import {
  HALAL_CATEGORIES,
  type IDestination,
} from "@/lib/types/destinations";
import { getDestinationRating } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/language-context";

interface DestinationsGridProps {
  destinations: IDestination[];
  initialSearch?: string;
  initialCategory?: string;
  initialMaxPrice?: string;
  serverError?: string | null;
}

export function DestinationsGrid({
  destinations,
  initialSearch = "",
  initialCategory = "All",
  initialMaxPrice = "",
  serverError = null,
}: DestinationsGridProps) {
  const { t, language, toBnNum, formatPrice, formatDuration } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  const categories = ["All", ...HALAL_CATEGORIES];

  const filteredDestinations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const numericMax = maxPrice.trim() ? Number(maxPrice) : null;

    return destinations.filter((dest) => {
      const matchesCategory =
        selectedCategory === "All" || dest.category === selectedCategory;

      const matchesSearch =
        !query ||
        dest.name.toLowerCase().includes(query) ||
        dest.country.toLowerCase().includes(query) ||
        dest.category.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query);

      const matchesPrice =
        numericMax === null ||
        Number.isNaN(numericMax) ||
        Number(dest.price) <= numericMax;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [destinations, searchTerm, selectedCategory, maxPrice]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice("");
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return t.destinationsGrid.allCategoryPill;
    return t.categories[cat as keyof typeof t.categories] || cat;
  };

  return (
    <section className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8a6508] uppercase">
              {t.destinationsGrid.kicker}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
              {t.destinationsGrid.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.destinationsGrid.subtitle}
            </p>
          </div>
          <Link href="/add-destination">
            <Button className="bg-[#047857] text-white hover:bg-[#064E3B]">
              <PlusCircle className="size-4 text-[#C9A227]" />
              {t.destinationsGrid.addNewBtn}
            </Button>
          </Link>
        </div>

        {/* Server connection alert */}
        {serverError && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold">Backend Connection Notice</p>
              <p className="mt-1 text-amber-900/90">{serverError}</p>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t.destinationsGrid.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Input
              type="number"
              min="0"
              placeholder={t.destinationsGrid.maxBudget}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {(searchTerm || selectedCategory !== "All" || maxPrice) && (
              <Button variant="outline" onClick={clearFilters}>
                {t.destinationsGrid.resetFilters}
              </Button>
            )}
          </div>

          {/* Category Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                    isSelected
                      ? "bg-[#047857] text-white"
                      : "bg-secondary text-foreground/80 hover:bg-[#047857]/10 hover:text-[#064E3B]"
                  )}
                >
                  {getCategoryLabel(cat)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <p className="mt-6 text-sm text-muted-foreground">
          {t.destinationsGrid.showingText}{" "}
          <span className="font-semibold text-foreground">
            {language === "bn" ? toBnNum(filteredDestinations.length) : filteredDestinations.length}
          </span>{" "}
          {t.destinationsGrid.ofText}{" "}
          {language === "bn" ? toBnNum(destinations.length) : destinations.length}{" "}
          {t.destinationsGrid.halalDestText}
        </p>

        {/* Empty State */}
        {filteredDestinations.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <Sparkles className="mx-auto size-10 text-[#C9A227]" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-[#064E3B]">
              {t.destinationsGrid.noResultsTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {destinations.length === 0
                ? (language === "bn"
                    ? "MongoDB Atlas-এ সংযোগ করুন অথবা আপনার প্রথম হালাল সফর প্যাকেজটি যোগ করুন।"
                    : "Connect your MongoDB Atlas URI in server/.env or add your first Halal travel package.")
                : t.destinationsGrid.noResultsDesc}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {destinations.length > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  {t.destinationsGrid.showAllBtn}
                </Button>
              )}
              <Link href="/add-destination">
                <Button>{t.destinationsGrid.addNewBtn}</Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Cards Grid */
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination) => (
              <article
                key={destination._id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Image linked */}
                <Link
                  href={`/destinations/${destination._id}`}
                  className="relative h-52 w-full overflow-hidden rounded-lg bg-muted block"
                >
                  <SafeImage
                    src={destination.imageUrl || "/images/banner.jpg"}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-[#064E3B]/90 px-2.5 py-1 text-[11px] font-semibold text-[#F6E299] backdrop-blur-xs">
                    {t.categories[destination.category as keyof typeof t.categories] || destination.category}
                  </span>
                  <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {language === "bn"
                      ? toBnNum(getDestinationRating(destination._id))
                      : getDestinationRating(destination._id)}
                    <Star className="size-3 fill-[#C9A227] text-[#C9A227]" />
                  </span>
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
                  <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#047857] uppercase">
                    <MapPin className="size-3.5" />
                    {destination.country}
                  </p>

                  <div className="mt-1.5 flex items-baseline justify-between gap-2">
                    <Link
                      href={`/destinations/${destination._id}`}
                      className="min-w-0 flex-1"
                    >
                      <h2 className="truncate font-serif text-xl font-semibold text-foreground hover:text-[#047857] transition-colors">
                        {destination.name}
                      </h2>
                    </Link>
                    <p className="shrink-0 text-base font-bold text-[#064E3B]">
                      {formatPrice(destination.price)}
                      <span className="text-xs font-normal text-muted-foreground">
                        {t.destinationsGrid.perPerson}
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-[#C9A227]" />
                      {formatDuration(destination.duration)}
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Utensils className="size-3.5 shrink-0 text-[#047857]" />
                      <span className="truncate">
                        {destination.halalDining || t.common.halalCertified}
                      </span>
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      href={`/destinations/${destination._id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-[#047857] uppercase transition-colors hover:text-[#064E3B]"
                    >
                      {t.destinationsGrid.viewDetails}
                      <ArrowUpRight className="size-3.5 text-[#C9A227]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
