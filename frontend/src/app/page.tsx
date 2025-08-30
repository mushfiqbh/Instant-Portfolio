"use client";

import { LandingPage } from "@/components/LandingPage";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  redirect("/dashboard");
}
