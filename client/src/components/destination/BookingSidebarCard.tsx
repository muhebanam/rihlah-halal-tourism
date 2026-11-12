"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export function BookingSidebarCard({
  price,
  departureDate,
  destinationName,
}: {
  price: string;
  departureDate: string;
  destinationName: string;
}) {
  const { t, formatPrice } = useLanguage();
  const [requested, setRequested] = useState(false);

  const perks = [
    t.destinationDetails.freeCancel,
    t.destinationDetails.assistance,
    t.destinationDetails.supportDesk,
  ];

  return (
    <aside className="h-fit rounded-xl border border-border bg-background/70 p-6">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {t.destinationDetails.startingFrom}
      </p>
      <p className="mt-1 font-serif text-4xl font-bold text-[#064E3B]">
        {formatPrice(price)}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {t.destinationDetails.perPerson}
      </p>

      <div className="mt-5">
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          {t.destinationDetails.nextDeparture}
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground">
          <CalendarDays className="size-4 text-[#047857]" />
          <span>{departureDate}</span>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => setRequested(true)}
        className="mt-4 w-full bg-[#047857] text-white hover:bg-[#064E3B] cursor-pointer"
        size="lg"
      >
        {requested ? t.destinationDetails.requestDone : t.destinationDetails.requestBtn}
        <ArrowRight className="size-4 text-[#C9A227]" />
      </Button>

      {requested && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#047857]/25 bg-[#047857]/10 p-3 text-xs text-[#064E3B]">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#047857]" />
          <span>
            {t.destinationDetails.inquirySuccessMessage} ({destinationName})
          </span>
        </div>
      )}

      <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
        {perks.map((perk, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Check className="size-3.5 text-[#047857]" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
