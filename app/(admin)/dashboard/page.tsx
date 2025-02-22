"use client";
import LoginPage from "@/src/views/pages/home/LoginPage";
import DashboardPage from "@/src/views/pages/home/Dashboard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return  <DashboardPage userInfo={session?.user} />
}
