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

const testimonials = [
  {
    quote:
      '"Our family Umrah and Madinah Ziyarat was deeply peaceful. Having Haram-facing rooms and unhurried guidance for our elderly parents made every moment truly memorable."',
    name: "Tariq & Amina Rahman",
    location: "Dhaka, Bangladesh",
  },
  {
    quote:
      '"Walking through the Alhambra in Granada and praying at the Albaicin Mosque overlooking the hills felt surreal. Every meal was verified halal and effortless."',
    name: "Dr. Yusuf Al-Mansoor",
    location: "London, UK",
  },
  {
    quote:
      '"Istanbul with Rihlah was extraordinary—from Fajr near Sultanahmet to our private Bosphorus sunset cruise. Our guide knew every hidden Ottoman courtyard."',
    name: "Khadija Siddiqui",
    location: "Toronto, Canada",
  },
  {
    quote:
      '"Langkawi gave our children a clean, serene beachfront holiday without compromises. Prayer spaces and certified halal dining were thoughtfully arranged everywhere."',
    name: "Imran & Nadia Karim",
    location: "Kuala Lumpur, Malaysia",
  },
];

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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
              Traveler Reflections
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#064E3B] md:text-5xl">
              Stories From Our Community
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
            {testimonials.map((item) => (
              <CarouselItem key={item.name} className="md:basis-1/2">
                <article className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm">
                  <div>
                    <Quote className="size-8 text-[#C9A227]/70" />
                    <p className="mt-4 text-base leading-relaxed text-foreground/90">
                      {item.quote}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-border pt-4">
                    <p className="font-serif text-xl font-semibold text-[#064E3B]">
                      {item.name}
                    </p>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      {item.location}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                current === index ? "w-8 bg-[#047857]" : "w-2 bg-[#047857]/25"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

