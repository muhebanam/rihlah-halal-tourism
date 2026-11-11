import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#064E3B]/10 text-[#047857]">
        <Compass className="size-8 text-[#C9A227]" />
      </div>
      <h1 className="mt-6 font-serif text-4xl font-semibold text-[#064E3B]">
        Destination Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The journey or page you are looking for may have been removed or its ID
        could not be found in the database.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/destinations">
          <Button>Explore All Destinations</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}

