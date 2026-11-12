"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Globe,
  LogIn,
  LogOut,
  Menu,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/destinations", label: t.nav.destinations },
    { href: "/add-destination", label: t.nav.addDestination },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-card/95 backdrop-blur-md">
      <nav className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Left: Primary Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors hover:text-[#047857]",
                  isActive(link.href)
                    ? "text-[#047857] after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-[#C9A227]"
                    : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="inline-flex items-center justify-center rounded-lg border border-border p-2 text-foreground md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Center Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#064E3B] text-[#C9A227] shadow-sm">
            <Compass className="size-5" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#064E3B]">
              Rihlah
            </span>
            <span className="text-[10px] font-semibold tracking-[0.22em] text-[#C9A227] uppercase">
              {language === "bn" ? "হালাল ভ্রমণ" : "Halal Journeys"}
            </span>
          </div>
        </Link>

        {/* Right: Quick Action, Auth State & Language Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={language === "en" ? "বাংলা ভাষায় পরিবর্তন করুন" : "Switch to English"}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-[#047857]/50 hover:bg-[#047857]/10 hover:text-[#064E3B] cursor-pointer"
          >
            <Globe className="size-3.5 text-[#047857]" />
            <span>{t.nav.langSwitchLabel}</span>
          </button>

          {/* User Auth Buttons or Profile Badge */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 hover:border-[#047857]/50 transition-colors"
                title={user.name}
              >
                <div className="flex size-7 items-center justify-center rounded-full border border-[#047857]/30 bg-[#047857] text-xs font-bold text-[#F6E299]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden text-xs font-semibold text-foreground lg:inline-block max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                type="button"
                onClick={logout}
                title={t.nav.logout}
                className="rounded-full p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/80 hover:text-[#064E3B]"
                >
                  <LogIn className="size-4 text-[#047857]" />
                  {t.nav.login}
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-[#C9A227] text-[#12231B] font-semibold hover:bg-[#d8b136]"
                >
                  <User className="size-4" />
                  {t.nav.register}
                </Button>
              </Link>
            </div>
          )}

          <Link href="/add-destination" className="hidden xl:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="border-[#047857]/30 text-[#064E3B] hover:bg-[#047857]/5"
            >
              <PlusCircle className="size-4 text-[#C9A227]" />
              {t.nav.addPackage}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          {/* User Profile Summary (Mobile) */}
          {user ? (
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex size-10 items-center justify-center rounded-full border border-[#047857]/30 bg-[#047857] text-sm font-bold text-[#F6E299]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                title={t.nav.logout}
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="mb-4 grid grid-cols-2 gap-2 border-b border-border pb-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-semibold text-foreground hover:bg-muted"
              >
                <LogIn className="size-3.5 text-[#047857]" />
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#C9A227] py-2 text-xs font-semibold text-[#12231B] hover:bg-[#d8b136]"
              >
                <User className="size-3.5" />
                {t.nav.register}
              </Link>
            </div>
          )}

          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[#047857]/10 text-[#064E3B]"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive("/profile")
                      ? "bg-[#047857]/10 text-[#064E3B]"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {t.nav.profile}
                </Link>
              </li>
            )}
            <li className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-[#064E3B] bg-[#047857]/10"
              >
                <span className="flex items-center gap-2">
                  <Globe className="size-4 text-[#047857]" />
                  {language === "en" ? "ভাষা পরিবর্তন করুন" : "Switch Language"}
                </span>
                <span className="rounded-full bg-[#047857] px-2.5 py-0.5 text-xs text-white">
                  {t.nav.langSwitchLabel}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
