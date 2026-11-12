"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Destination details route error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-7" />
      </div>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground">
        Unable to Load Package Details
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message ||
          "Could not retrieve this destination. The server might be offline or undergoing maintenance."}
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} className="bg-[#047857] text-white hover:bg-[#064E3B]">
          <RefreshCw className="size-4" />
          Retry
        </Button>
        <Link href="/destinations">
          <Button variant="outline">
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Button>
        </Link>
      </div>
    </main>
  );
}

