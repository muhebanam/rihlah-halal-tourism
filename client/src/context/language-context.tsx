"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import {
  Language,
  translations,
  toBengaliNumber,
  formatBilingualPrice,
  formatBilingualDuration,
} from "@/lib/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof translations)["en"];
  toBnNum: (val: string | number) => string;
  formatPrice: (price: string | number) => string;
  formatDuration: (duration: string) => string;
}

const STORAGE_KEY = "rihlah_language_preference";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("rihlah_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("rihlah_lang_change", callback);
  };
}

function getSnapshot(): Language {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
      window.dispatchEvent(new Event("rihlah_lang_change"));
    } catch {
      // Storage access may fail in strict private browsing environments
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  const currentTranslations = translations[language] || translations.en;

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: currentTranslations,
    toBnNum: toBengaliNumber,
    formatPrice: (price: string | number) => formatBilingualPrice(price, language),
    formatDuration: (duration: string) => formatBilingualDuration(duration, language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
