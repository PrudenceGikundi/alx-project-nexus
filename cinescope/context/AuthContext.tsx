"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: { user_id: string; username: string } | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ user_id: string; username: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Load user & token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("auth-token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // ✅ Login function
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("https://cinewhisper.up.railway.app/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.access && data.refresh && data.user_id) {
        localStorage.setItem("auth-token", data.access);
        localStorage.setItem("refresh-token", data.refresh);
        localStorage.setItem(
          "user",
          JSON.stringify({ user_id: data.user_id, username: data.username })
        );
        localStorage.setItem("Authorization", `Bearer ${data.access}`);

        setUser({ user_id: data.user_id, username: data.username });
        setToken(data.access);

        router.push("/");
      } else {
        throw new Error(data.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    localStorage.removeItem("Authorization");

    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
