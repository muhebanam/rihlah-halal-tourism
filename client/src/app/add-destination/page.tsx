"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, PackageCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DestinationFormFields } from "@/components/destination/DestinationFormFields";
import { API_BASE_URL } from "@/lib/api";
import type { DestinationFormPayload } from "@/lib/types/destinations";

const initialForm: DestinationFormPayload = {
  name: "",
  country: "",
  category: "Umrah & Ziyarat",
  price: "",
  duration: "",
  departureDate: "",
  halalDining: "100% Zabiha Halal Certified",
  prayerFacilities: "Nearby Masjid & Prayer-Friendly Schedule",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const router = useRouter();
  const [form, setForm] = useState<DestinationFormPayload>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof DestinationFormPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.category) {
      setError("Please select a Halal tourism category.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.details || data.error || "Failed to add package");
      }

      if (data.insertedId) {
        router.push(`/destinations/${data.insertedId}`);
      } else {
        router.push("/destinations");
      }
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server. Make sure server is running on port 8000."
      );
      setSubmitting(false);
    }
  };

  return (
    <main className="islamic-lattice-bg min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#047857]"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-[#8a6508] uppercase">
          Curate New Journey
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
          Add Halal Travel Package
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Publish a new Islamic heritage, Umrah, or family-friendly halal
          destination to MongoDB.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-border bg-card p-7 shadow-sm md:p-8"
        >
          {error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <DestinationFormFields
            form={form}
            onChange={updateField}
            idPrefix="add"
          />

          <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-border pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => setForm(initialForm)}
            >
              <RotateCcw className="size-4" />
              Reset
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#047857] text-white hover:bg-[#064E3B]"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving Package...
                </>
              ) : (
                <>
                  <PackageCheck className="size-4 text-[#C9A227]" />
                  Add Travel Package
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

