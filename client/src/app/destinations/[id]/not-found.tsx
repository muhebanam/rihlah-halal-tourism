import Link from "next/link";
import { ArrowLeft, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DestinationNotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#064E3B]/10 text-[#047857]">
        <MapPinOff className="size-8 text-[#C9A227]" />
      </div>
      <h1 className="mt-6 font-serif text-4xl font-semibold text-[#064E3B]">
        Package Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn&apos;t load this Halal travel package. Make sure the Express
        server is running on port 8000 and the package ID exists in MongoDB.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/destinations">
          <Button>
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Button>
        </Link>
      </div>
    </main>
  );
}

