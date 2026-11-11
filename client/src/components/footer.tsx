"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
];

const categoryLinks = [
  { label: "Umrah & Ziyarat", href: "/destinations?category=Umrah+%26+Ziyarat" },
  { label: "Islamic Heritage", href: "/destinations?category=Islamic+Heritage" },
  { label: "Halal Beach Resorts", href: "/destinations?category=Halal+Beach+Resort" },
  { label: "Nature & Mountains", href: "/destinations?category=Nature+%26+Mountain" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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
              Purposeful journeys anchored in faith, comfort, and authentic
              Islamic hospitality across historic Muslim civilizations and serene
              halal retreats.
            </p>
          </div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#C9A227] uppercase">
            100% Halal Dining • Prayer-Friendly Itineraries
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              Travel Dispatches
            </h3>
            <p className="mt-3 text-sm text-[#FAF8F5]/75">
              Receive seasonal Umrah & Islamic heritage departure alerts.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex w-full max-w-xs items-center rounded-lg border border-white/20 bg-white/10"
            >
              <input
                type="email"
                placeholder="Enter your email"
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
                className="px-3.5 text-[#C9A227] transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-5" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-[#C9A227]">
                JazakAllahu Khayran! You are subscribed.
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF8F5]/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              Tour Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#FAF8F5]/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-[#C9A227] uppercase">
              Salam Desk
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#FAF8F5]/75">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-[#C9A227]" />
                <a
                  href="mailto:salam@rihlahjourneys.com"
                  className="transition-colors hover:text-white"
                >
                  salam@rihlahjourneys.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-[#C9A227]" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-[#C9A227]" />
                <span>Dhaka • Makkah • Istanbul</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
          <p className="text-xs text-[#FAF8F5]/65">
            © 2026 Rihlah Halal Journeys. Built for meaningful travel.
          </p>
          <p className="text-xs text-[#FAF8F5]/65">
            Module 46 • Next.js + Express + MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}

