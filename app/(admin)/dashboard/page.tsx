"use client";
import LoginPage from "@/src/views/pages/home/LoginPage";
import DashboardPage from "@/src/views/pages/home/Dashboard";
import { useEffect, useState } from "react";
import { DEFAULT_USER } from "@/constants/fixtures";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // const userStr = localStorage.getItem("user");
    // if (userStr) {
    //   setUser(JSON.parse(userStr));
    // }
    setUser(DEFAULT_USER)
  }, []);
  return !user ? <LoginPage /> : <DashboardPage />;
}
