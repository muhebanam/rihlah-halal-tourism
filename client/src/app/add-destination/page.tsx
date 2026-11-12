"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, PackageCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DestinationFormFields } from "@/components/destination/DestinationFormFields";
import { API_BASE_URL } from "@/lib/api";
import type { DestinationFormPayload } from "@/lib/types/destinations";
import { useLanguage } from "@/context/language-context";

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
  const { t } = useLanguage();
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
          : "An unexpected error occurred while adding the package."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-[#FAF8F5] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#047857] uppercase transition-colors hover:text-[#064E3B]"
        >
          <ArrowLeft className="size-4" />
          {t.addDestination.back}
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8a6508] uppercase">
              {t.addDestination.kicker}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#064E3B] sm:text-4xl">
              {t.addDestination.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.addDestination.subtitle}
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
            <DestinationFormFields
              form={form}
              onChange={updateField}
              idPrefix="new-dest"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setForm(initialForm)}
                disabled={submitting}
                className="text-muted-foreground"
              >
                <RotateCcw className="size-4" />
                {t.addDestination.resetBtn}
              </Button>

              <Button
                type="submit"
                disabled={submitting}
                className="bg-[#047857] text-white hover:bg-[#064E3B]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {t.addDestination.savingBtn}
                  </>
                ) : (
                  <>
                    <PackageCheck className="size-4 text-[#C9A227]" />
                    {t.addDestination.submitBtn}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
