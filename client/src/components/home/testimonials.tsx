"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function Testimonials() {
  const { t } = useLanguage();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const testimonials = t.testimonials.items;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="w-full bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#8a6508] uppercase">
              {t.testimonials.kicker}
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonial"
              className="rounded-full border-[#047857]/30 text-[#064E3B]"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonial"
              className="rounded-full border-[#047857]/30 text-[#064E3B]"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="mt-10 w-full"
        >
          <CarouselContent>
            {testimonials.map((item, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2">
                <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#047857]/10 text-[#047857]">
                    <Quote className="size-5" />
                  </div>
                  <blockquote className="mt-6 text-sm leading-relaxed text-foreground/90 italic">
                    {item.quote}
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.location}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => api?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                current === idx
                  ? "w-8 bg-[#047857]"
                  : "w-2 bg-[#047857]/20 hover:bg-[#047857]/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
