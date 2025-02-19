"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { data: session } = useSession();
    if (!session) {
      // redirect("/");
    }

    return <Component user={session?.user} {...props} />;
  };
}
