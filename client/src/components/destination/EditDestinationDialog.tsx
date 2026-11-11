"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, PackageCheck, Pencil, X } from "lucide-react";
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
      const res = await fetch(
        `${API_BASE_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to update destination");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update destination."
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
            className="border-[#047857]/30 text-[#064E3B] hover:bg-[#047857]/5"
          >
            <Pencil className="size-4 text-[#C9A227]" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#064E3B]">
            Edit Halal Travel Package
          </DialogTitle>
          <DialogDescription>
            Update package details, pricing, or halal facilities for{" "}
            <span className="font-medium text-foreground">
              {destination.name}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2">
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}

          <DestinationFormFields
            form={form}
            onChange={updateField}
            idPrefix="edit"
          />

          <div className="mt-7 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#047857] text-white hover:bg-[#064E3B]"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <PackageCheck className="size-4 text-[#C9A227]" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

