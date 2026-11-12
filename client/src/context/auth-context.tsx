"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import type { IUser } from "@/lib/types/auth";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<IUser>) => Promise<void>;
}

const STORAGE_KEY = "rihlah_auth_token";
const USER_KEY = "rihlah_auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedToken) {
          setToken(savedToken);
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              // Ignore parse error
            }
          }

          // Verify with backend
          const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              setUser(data.user);
              localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
          } else {
            // Token is expired or invalid
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(USER_KEY);
            setToken(null);
            setUser(null);
          }
        }
      } catch {
        // Storage or network error on mount
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  const saveSession = (newToken: string, newUser: IUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    } catch {
      // Storage write error
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    saveSession(data.token, data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    saveSession(data.token, data.user);
  };

  const demoLogin = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/demo-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Demo login failed");
    }

    saveSession(data.token, data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // Storage error
    }
  };

  const updateProfile = async (data: Partial<IUser>) => {
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(resData.error || "Profile update failed");
    }

    if (resData.user) {
      setUser(resData.user);
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(resData.user));
      } catch {
        // Storage error
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
