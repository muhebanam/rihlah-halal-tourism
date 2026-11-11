import type { Metadata } from "next";
import { DestinationsGrid } from "@/components/destination/destinations-grid";
import { API_BASE_URL } from "@/lib/api";
import type { IDestination } from "@/lib/types/destinations";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations | Halal & Islamic Heritage Journeys",
  description:
    "Explore our complete collection of curated Umrah packages, Islamic heritage tours, and peaceful family-friendly halal vacations.",
};

interface DestinationsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    maxPrice?: string;
  }>;
}

export default async function DestinationsPage({
  searchParams,
}: DestinationsPageProps) {
  const params = await searchParams;

  let destinations: IDestination[] = [];
  let serverError: string | null = null;

  try {
    const res = await fetch(`${API_BASE_URL}/destinations`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      serverError =
        body.details ||
        body.error ||
        `Server responded with status ${res.status}. Make sure MongoDB URI is configured in server/.env.`;
    } else {
      destinations = await res.json();
    }
  } catch {
    serverError = `Could not reach the backend server at ${API_BASE_URL}. Start the Express server (npm run dev:server) and refresh this page.`;
  }

  const gridKey = `${params.search || ""}-${params.category || "All"}-${
    params.maxPrice || ""
  }`;

  return (
    <main>
      <DestinationsGrid
        key={gridKey}
        destinations={destinations}
        initialSearch={params.search || ""}
        initialCategory={params.category || "All"}
        initialMaxPrice={params.maxPrice || ""}
        serverError={serverError}
      />
    </main>
  );
}
