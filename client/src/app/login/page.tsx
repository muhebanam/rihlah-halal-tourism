"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, demoLogin } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to profile
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoSubmitting(true);
    setError(null);
    try {
      await demoLogin();
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to demo login");
    } finally {
      setDemoSubmitting(false);
    }
  };

  return (
    <main className="islamic-lattice-bg flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#047857]/10 text-[#047857]">
            <UserCheck className="size-6" />
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#064E3B]">
            {t.auth.loginTitle}
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {t.auth.loginSubtitle}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">{t.auth.emailLabel}</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                placeholder={t.auth.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">{t.auth.passwordLabel}</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder={t.auth.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting || demoSubmitting}
            className="w-full bg-[#047857] text-white hover:bg-[#064E3B] cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.auth.loggingInBtn}
              </>
            ) : (
              t.auth.loginBtn
            )}
          </Button>
        </form>

        {/* 1-Click Demo Login */}
        <div className="relative my-6 text-center text-xs text-muted-foreground">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-2">OR</span>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleDemoLogin}
          disabled={submitting || demoSubmitting}
          className="w-full border-[#C9A227]/50 bg-[#F3EFE6]/50 text-[#064E3B] hover:bg-[#F3EFE6] cursor-pointer"
        >
          {demoSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin text-[#C9A227]" />
              {t.auth.loggingInBtn}
            </>
          ) : (
            <>
              <Sparkles className="size-4 text-[#C9A227]" />
              {t.auth.demoLoginBtn}
            </>
          )}
        </Button>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
          {t.auth.demoLoginDesc}
        </p>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {t.auth.noAccount}{" "}
          <Link
            href="/register"
            className="font-semibold text-[#047857] hover:underline"
          >
            {t.auth.signupLink}
          </Link>
        </p>
      </div>
    </main>
  );
}
