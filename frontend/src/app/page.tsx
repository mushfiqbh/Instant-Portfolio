"use client";

import { LandingPage } from "@/components/LandingPage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return <LandingPage />;
  }

  router.push("/dashboard");
  return null;
}
