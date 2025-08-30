"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  const refreshUser = useCallback(
    async (authToken?: string) => {
      const activeToken = authToken || token;
      if (!activeToken) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${activeToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data: User = await res.json();
        setUser(data);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error fetching user:", error);
        logout();
      }
    },
    [token, logout, router]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      refreshUser(storedToken);
    }
  }, [refreshUser]);

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      refreshUser(data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error("Failed to login");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      refreshUser(data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Re-throw to handle in component
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, register, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
