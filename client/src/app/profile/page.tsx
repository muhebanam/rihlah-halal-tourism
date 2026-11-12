"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Globe,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Phone,
  PlusCircle,
  Save,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import { toBengaliNumber } from "@/lib/i18n/translations";
import type { IUser } from "@/lib/types/auth";
import { SafeImage } from "@/components/ui/safe-image";

function ProfileEditForm({ user }: { user: IUser }) {
  const { updateProfile } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [country, setCountry] = useState(user.country || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(false);

    try {
      await updateProfile({
        name,
        phone,
        country,
        bio,
        avatarUrl,
      });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#8a6508] uppercase">
          {t.auth.profileTitle}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-semibold text-[#064E3B]">
          {t.auth.profileSubtitle}
        </h2>
      </div>

      {successMsg && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#047857]/20 bg-[#047857]/10 p-3 text-xs text-[#064E3B]">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{t.auth.profileUpdated}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleUpdate} className="mt-6 space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="prof-name">{t.auth.nameLabel}</Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="prof-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="prof-phone">{t.auth.phoneLabel}</Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="prof-phone"
                placeholder={t.auth.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="prof-country">{t.auth.countryLabel}</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="prof-country"
                placeholder={t.auth.countryPlaceholder}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prof-avatar">{t.auth.avatarLabel}</Label>
          <Input
            id="prof-avatar"
            placeholder="https://..."
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prof-bio">{t.auth.bioLabel}</Label>
          <Textarea
            id="prof-bio"
            rows={3}
            placeholder={t.auth.bioPlaceholder}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="border-t border-border pt-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#047857] text-white hover:bg-[#064E3B] cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.auth.savingProfileBtn}
              </>
            ) : (
              <>
                <Save className="size-4 text-[#C9A227]" />
                {t.auth.saveProfileBtn}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isLoading, logout } = useAuth();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [token, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#047857]" />
      </div>
    );
  }

  const formatJoinedDate = (dateStr?: string) => {
    if (!dateStr) return language === "bn" ? "২০২৬" : "2026";
    const d = new Date(dateStr);
    const yr = d.getFullYear();
    return language === "bn" ? toBengaliNumber(yr) : String(yr);
  };

  const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=047857,064e3b&textColor=f6e299`;

  return (
    <main className="w-full bg-[#FAF8F5] px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Profile Header Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-[#064E3B] to-[#047857] p-8 text-white shadow-lg">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full border-4 border-[#C9A227] bg-white/10 shadow-md">
              <SafeImage
                src={user.avatarUrl || defaultAvatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
                <h1 className="font-serif text-3xl font-bold tracking-tight text-[#FAF8F5]">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A227] px-2.5 py-0.5 text-xs font-bold text-[#12231B]">
                  <ShieldCheck className="size-3.5" />
                  {t.auth.verifiedTraveler}
                </span>
              </div>
              <p className="flex items-center justify-center gap-1.5 text-xs text-white/80 sm:justify-start">
                <Mail className="size-3.5" />
                {user.email}
              </p>
              <p className="flex items-center justify-center gap-1.5 text-xs text-[#F6E299] sm:justify-start">
                <Calendar className="size-3.5" />
                {t.auth.memberSince} {formatJoinedDate(user.createdAt)}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <LogOut className="size-4" />
              {t.auth.logoutBtn}
            </Button>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main Edit Form */}
          <ProfileEditForm key={user.id} user={user} />

          {/* Sidebar Quick Shortcuts */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-[#064E3B]">
                {language === "bn" ? "ভ্রমণ শর্টকাট" : "Travel Actions"}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {language === "bn"
                  ? "আপনার প্রিয় হালাল গন্তব্য দেখুন বা নতুন প্যাকেজ যোগ করুন"
                  : "Explore sacred retreats or publish a new halal destination"}
              </p>

              <div className="mt-4 space-y-2.5">
                <Link href="/destinations" className="block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs font-semibold text-[#064E3B]"
                  >
                    <Globe className="size-3.5 text-[#047857]" />
                    {t.nav.exploreTours}
                  </Button>
                </Link>

                <Link href="/add-destination" className="block">
                  <Button
                    size="sm"
                    className="w-full justify-start bg-[#047857] text-xs font-semibold text-white hover:bg-[#064E3B]"
                  >
                    <PlusCircle className="size-3.5 text-[#C9A227]" />
                    {t.nav.addPackage}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Halal Travel Trust Badge */}
            <div className="rounded-2xl border border-[#C9A227]/30 bg-[#F3EFE6]/60 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8a6508] uppercase">
                <Sparkles className="size-4 text-[#C9A227]" />
                {language === "bn" ? "রিহলাহ আমানত" : "Rihlah Amanah"}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {language === "bn"
                  ? "সকল প্যাকেজ ১০০% জবিহা হালাল খাবার ও সালাতের ওয়াক্ত অনুসরণ নিশ্চিত করে পরিচালনা করা হয়।"
                  : "All community journeys adhere strictly to verified Zabiha Halal dining and mindful Salah pacing."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
