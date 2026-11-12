"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";
import { useLanguage } from "@/context/language-context";

export default function DeleteDestinationDialog({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteDestination = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/destination/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete destination");
      }

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete destination."
      );
      setDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!deleting) setOpen(next);
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="size-3.5" />
            {t.deleteDialog.trigger}
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-2xl text-red-950">
            {t.deleteDialog.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t.deleteDialog.desc}{" "}
            <span className="font-semibold text-foreground">{name}</span>{" "}
            {t.deleteDialog.fromCatalog}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>
            {t.deleteDialog.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDeleteDestination();
            }}
            disabled={deleting}
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
          >
            {deleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.deleteDialog.deleting}
              </>
            ) : (
              t.deleteDialog.confirm
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
