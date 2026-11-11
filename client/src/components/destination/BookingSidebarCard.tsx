"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  "Free cancellation up to 7 days before departure",
  "Comprehensive Halal travel assistance",
  "24/7 bilingual Salam support desk",
];

export function BookingSidebarCard({
  price,
  departureDate,
  destinationName,
}: {
  price: string;
  departureDate: string;
  destinationName: string;
}) {
  const [requested, setRequested] = useState(false);

  return (
    <aside className="h-fit rounded-xl border border-border bg-background/70 p-6">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Starting From
      </p>
      <p className="mt-1 font-serif text-4xl font-bold text-[#064E3B]">
        ${price}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">per person</p>

      <div className="mt-5">
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          Next Scheduled Departure
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground">
          <CalendarDays className="size-4 text-[#047857]" />
          <span>{departureDate}</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => setRequested(true)}
        className="mt-4 w-full bg-[#047857] text-white hover:bg-[#064E3B]"
        size="lg"
      >
        {requested ? "Inquiry Recorded" : "Request Halal Package"}
        <ArrowRight className="size-4 text-[#C9A227]" />
      </Button>

      {requested && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#047857]/25 bg-[#047857]/10 p-3 text-xs text-[#064E3B]">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#047857]" />
          <span>
            JazakAllahu Khayran! Your package inquiry for{" "}
            <strong>{destinationName}</strong> has been received by the Rihlah concierge.
          </span>
        </div>
      )}

      <ul className="mt-6 space-y-3 border-t border-border pt-5">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-xs text-muted-foreground"
          >
            <Check className="mt-0.5 size-3.5 shrink-0 text-[#047857]" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
