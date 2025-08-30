"use client";

import { LandingPage } from "@/components/general/LandingPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return <LandingPage />;
  }

  return null;
}
