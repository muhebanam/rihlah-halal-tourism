"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Compass,
  MapPin,
  Star,
  Utensils,
} from "lucide-react";
import type { IDestination } from "@/lib/types/destinations";
import {
  getDestinationRating,
  getDestinationReviewsCount,
} from "@/lib/format";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import { BookingSidebarCard } from "@/components/destination/BookingSidebarCard";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/language-context";
import {
  formatBilingualDepartureDate,
  localizeDestination,
} from "@/lib/i18n/destination-translations";

export function DestinationDetailsView({
  destination,
}: {
  destination: IDestination;
}) {
  const { t, language, toBnNum, formatDuration } = useLanguage();

  const item = localizeDestination(destination, language);
  const highlights = t.destinationDetails.defaultHighlights;

  const rating = getDestinationRating(destination._id);
  const reviewsCount = getDestinationReviewsCount(destination._id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#047857]"
        >
          <ArrowLeft className="size-4" />
          {t.destinationDetails.back}
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog destination={destination} />
          <DeleteDestinationDialog
            id={destination._id}
            name={item.name}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm md:h-96">
        <SafeImage
          src={destination.imageUrl || "/images/banner.jpg"}
          alt={item.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[#064E3B]/90 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#F6E299] uppercase backdrop-blur-xs">
          {t.categories[destination.category as keyof typeof t.categories] || destination.category}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_310px]">
          {/* Left Content */}
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#047857] uppercase">
              <MapPin className="size-4" />
              {item.country}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
              {item.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-[#C9A227] text-[#C9A227]" />
                <span className="font-semibold text-foreground">
                  {language === "bn" ? toBnNum(rating) : rating}
                </span>
                <span className="text-muted-foreground">
                  ({language === "bn" ? toBnNum(reviewsCount) : reviewsCount} {t.destinationDetails.reviews})
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4 text-[#047857]" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            {/* Halal Assurance Badges */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#047857]/20 bg-[#047857]/5 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#064E3B] uppercase">
                  <Utensils className="size-4 text-[#047857]" />
                  {t.destinationDetails.diningStandard}
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {item.halalDining || t.common.halalCertified}
                </p>
              </div>

              <div className="rounded-xl border border-[#C9A227]/35 bg-[#C9A227]/10 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#064E3B] uppercase">
                  <Compass className="size-4 text-[#C9A227]" />
                  {t.destinationDetails.prayerFacilities}
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {item.prayerFacilities || t.common.prayerSchedule}
                </p>
              </div>
            </div>

            <h2 className="mt-8 font-serif text-2xl font-semibold text-[#064E3B]">
              {t.destinationDetails.overview}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.description}
            </p>

            <h2 className="mt-8 font-serif text-2xl font-semibold text-[#064E3B]">
              {t.destinationDetails.highlightsTitle}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-sm text-foreground/85"
                >
                  <Check className="size-4 shrink-0 text-[#047857]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Booking Sidebar */}
          <BookingSidebarCard
            price={destination.price}
            departureDate={formatBilingualDepartureDate(destination.departureDate, language)}
            destinationName={item.name}
          />
        </div>
      </div>
    </main>
  );
}
