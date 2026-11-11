import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  Compass,
  MapPin,
  RefreshCw,
  Star,
  Utensils,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import {
  formatDepartureDate,
  getDestinationRating,
  getDestinationReviewsCount,
} from "@/lib/format";
import type { IDestination } from "@/lib/types/destinations";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import { BookingSidebarCard } from "@/components/destination/BookingSidebarCard";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const defaultHighlights = [
  "100% Zabiha Halal meals throughout",
  "Daily prayer-conscious itinerary pacing",
  "Experienced Muslim heritage & local guide",
  "Alcohol-free family-friendly accommodations",
  "Airport transfers & curated site entry fees",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE_URL}/destination/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return { title: "Package Details | Rihlah" };
    }
    const destination: IDestination = await res.json();
    return {
      title: `${destination.name} | Rihlah`,
      description:
        destination.description?.slice(0, 160) ||
        `Experience ${destination.name} with curated halal hospitality.`,
      openGraph: {
        title: `${destination.name} — Rihlah Halal Journeys`,
        description: destination.description,
        images: [destination.imageUrl || "/images/banner.jpg"],
      },
    };
  } catch {
    return { title: "Package Details | Rihlah" };
  }
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let destination: IDestination | null = null;
  let connectionError: string | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/destination/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404 || res.status === 400) {
      notFound();
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      connectionError =
        body.details ||
        body.error ||
        `Server returned status ${res.status}. Check MongoDB connection.`;
    } else {
      destination = await res.json();
    }
  } catch {
    connectionError = `Could not reach backend at ${API_BASE_URL}. Ensure Express server is running (npm run dev:server).`;
  }

  // If server is down/503, show connection error UI instead of false 404
  if (connectionError || !destination) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <AlertTriangle className="size-7" />
        </div>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground">
          Backend Connection Notice
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{connectionError}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/destinations">
            <Button variant="outline">
              <ArrowLeft className="size-4" />
              Back to Destinations
            </Button>
          </Link>
          <Link href={`/destinations/${id}`}>
            <Button className="bg-[#047857] text-white hover:bg-[#064E3B]">
              <RefreshCw className="size-4" />
              Retry Connection
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#047857]"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog destination={destination} />
          <DeleteDestinationDialog
            id={destination._id}
            name={destination.name}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm md:h-96">
        <SafeImage
          src={destination.imageUrl || "/images/banner.jpg"}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[#064E3B]/90 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#F6E299] uppercase backdrop-blur-xs">
          {destination.category}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_310px]">
          {/* Left Content */}
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#047857] uppercase">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-[#C9A227] text-[#C9A227]" />
                <span className="font-semibold text-foreground">
                  {getDestinationRating(destination._id)}
                </span>
                <span className="text-muted-foreground">
                  ({getDestinationReviewsCount(destination._id)} reviews)
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4 text-[#047857]" />
                {destination.duration}
              </span>
            </div>

            {/* Halal Assurance Badges */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#047857]/20 bg-[#047857]/5 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#064E3B] uppercase">
                  <Utensils className="size-4 text-[#047857]" />
                  Halal Dining Standard
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {destination.halalDining || "100% Zabiha Halal Certified"}
                </p>
              </div>

              <div className="rounded-xl border border-[#C9A227]/35 bg-[#C9A227]/10 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#064E3B] uppercase">
                  <Compass className="size-4 text-[#C9A227]" />
                  Prayer Facilities
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {destination.prayerFacilities ||
                    "Nearby Masjid & Prayer-Friendly Schedule"}
                </p>
              </div>
            </div>

            <h2 className="mt-8 font-serif text-2xl font-semibold text-[#064E3B]">
              Journey Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {destination.description}
            </p>

            <h2 className="mt-8 font-serif text-2xl font-semibold text-[#064E3B]">
              Halal &amp; Spiritual Highlights
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {defaultHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-foreground/85"
                >
                  <Check className="size-4 shrink-0 text-[#047857]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Booking Sidebar */}
          <BookingSidebarCard
            price={destination.price}
            departureDate={formatDepartureDate(destination.departureDate)}
            destinationName={destination.name}
          />
        </div>
      </div>
    </main>
  );
}
