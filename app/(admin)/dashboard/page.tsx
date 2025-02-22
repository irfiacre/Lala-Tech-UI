"use client";
import DashboardPage from "@/src/views/pages/Dashboard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return  <DashboardPage userInfo={session?.user} />
}
