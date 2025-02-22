"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import UserViewComponent from "./UserViewComponent";

const TopNav = ({ user, title }: { user: any; title: string }) => {
  const params: any = useParams();
  const [isActive, handleDropdown] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Overview");

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/` });
  };

  useEffect(() => {
    const currentUrl = window.location.href.split("/");
    setCurrentTitle(
      params.id
        ? `Property (${params.id?.substring(0, 50)})`
        : currentUrl[currentUrl.length - 1]
        ? currentUrl[currentUrl.length - 1]
        : "overview"
    );
  }, [params]);

  const hasBack = false;

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-textColor text-2xl capitalize">{currentTitle}</h1>
      <div className="mr-6 flex flex-row gap-3 items-center text-notificationIconColor">
        <div className="">
          <Icon icon="zondicons:notification" fontSize={20} />
        </div>
        <div>|</div>
        <UserViewComponent
          user={user}
          isActive={isActive}
          handleDropdown={handleDropdown}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default TopNav;
