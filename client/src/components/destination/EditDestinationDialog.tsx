"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PackageCheck, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DestinationFormFields } from "@/components/destination/DestinationFormFields";
import { API_BASE_URL } from "@/lib/api";
import type {
  DestinationFormPayload,
  IDestination,
} from "@/lib/types/destinations";
import { useLanguage } from "@/context/language-context";

function toFormState(destination: IDestination): DestinationFormPayload {
  return {
    name: destination.name || "",
    country: destination.country || "",
    category: destination.category || "Umrah & Ziyarat",
    price: destination.price || "",
    duration: destination.duration || "",
    departureDate: destination.departureDate || "",
    halalDining: destination.halalDining || "100% Zabiha Halal Certified",
    prayerFacilities:
      destination.prayerFacilities || "Nearby Masjid & Prayer-Friendly Schedule",
    imageUrl: destination.imageUrl || "",
    description: destination.description || "",
  };
}

export default function EditDestinationDialog({
  destination,
}: {
  destination: IDestination;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<DestinationFormPayload>(() =>
    toFormState(destination)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (submitting) return;
    setOpen(nextOpen);
    if (nextOpen) {
      setForm(toFormState(destination));
      setError(null);
    }
  };

  const updateField = (field: keyof DestinationFormPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/destination/${destination._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.details || data.error || "Failed to update package");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-[#047857]/40 text-[#064E3B] hover:bg-[#047857]/5 cursor-pointer"
          >
            <Pencil className="size-3.5 text-[#C9A227]" />
            {t.editDialog.trigger}
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#064E3B]">
            {t.editDialog.title}
          </DialogTitle>
          <DialogDescription>
            {t.editDialog.desc}{" "}
            <span className="font-medium text-foreground">
              {destination.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 grid gap-6">
          <DestinationFormFields
            form={form}
            onChange={updateField}
            idPrefix="edit-dest"
          />

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => setOpen(false)}
            >
              {t.editDialog.cancel}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#047857] text-white hover:bg-[#064E3B]"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.editDialog.saving}
                </>
              ) : (
                <>
                  <PackageCheck className="size-4 text-[#C9A227]" />
                  {t.editDialog.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
