import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import type { IDestination } from "@/lib/types/destinations";
import { DestinationDetailsView } from "@/components/destination/DestinationDetailsView";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

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

  return <DestinationDetailsView destination={destination} />;
}
