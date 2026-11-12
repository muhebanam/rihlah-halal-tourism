import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/context/language-context";
import { AuthProvider } from "@/context/auth-context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const solaimanLipi = localFont({
  src: [
    {
      path: "../../public/fonts/SolaimanLipi.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SolaimanLipi.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-solaiman",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rihlah | Curated Halal & Islamic Heritage Journeys",
    template: "%s | Rihlah",
  },
  description:
    "Discover thoughtful Umrah & Ziyarat tours, Islamic heritage explorations, and family-friendly halal retreats around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${cormorant.variable} ${solaimanLipi.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
