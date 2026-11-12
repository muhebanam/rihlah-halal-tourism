"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.destinationsGrid.title, href: "/destinations" },
    { label: t.nav.addDestination, href: "/add-destination" },
  ];

  const categoryLinks = [
    { label: t.categories["Umrah & Ziyarat"], href: "/destinations?category=Umrah+%26+Ziyarat" },
    { label: t.categories["Islamic Heritage"], href: "/destinations?category=Islamic+Heritage" },
    { label: t.categories["Halal Beach Resort"], href: "/destinations?category=Halal+Beach+Resort" },
    { label: t.categories["Nature & Mountain"], href: "/destinations?category=Nature+%26+Mountain" },
  ];

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full border-t-4 border-[#C9A227] bg-[#064E3B] px-6 pt-16 pb-8 text-[#FAF8F5]">
      <div className="mx-auto max-w-7xl">
        {/* Brand Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#C9A227] text-[#064E3B]">
                <Compass className="size-6" />
              </span>
              <p className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Rihlah
              </p>
            </div>
            <p className="mt-3 max-w-md text-sm text-[#FAF8F5]/75">
              {t.footer.brandSubtitle}
            </p>
          </div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#C9A227] uppercase">
            {t.footer.tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              {t.footer.newsletterTitle}
            </h3>
            <p className="mt-3 text-sm text-[#FAF8F5]/75">
              {t.footer.newsletterDesc}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex w-full max-w-xs items-center rounded-lg border border-white/20 bg-white/10"
            >
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                required
                className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-3.5 text-[#C9A227] transition-colors hover:text-white cursor-pointer"
              >
                <ArrowUpRight className="size-5" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-[#C9A227]">
                {t.footer.subscribedMsg}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              {t.footer.navCol}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F5]/75">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#C9A227]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              {t.footer.categoriesCol}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F5]/75">
              {categoryLinks.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="transition-colors hover:text-[#C9A227]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Salam Desk */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              {t.footer.contactCol}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#FAF8F5]/75">
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-[#C9A227]" />
                <span>{language === "bn" ? "ঢাকা • ইস্তাম্বুল • মক্কা" : "Dhaka • Istanbul • Makkah"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#C9A227]" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-[#C9A227]" />
                <span>salam@rihlah-halal.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#FAF8F5]/60 md:flex-row">
          <p>{t.footer.copyright}</p>
          <p className="flex items-center gap-2">
            <span>{t.footer.footerNote}</span>
            <span>•</span>
            <span className="text-[#C9A227]">{t.common.halalCertified}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
