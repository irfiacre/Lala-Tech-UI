"use client";
import SearchableInput from "@/src/components/inputs/SearchInput";
import React, { useState } from "react";
import { MenuItem } from "./MenuSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const Sidebar = () => {
  const sidebarMenu = {
    dashboard: [
      {
        title: "Dashboard",
        subtitle: "Latest Analytics",
        url: "dashboard",
        icon: "material-symbols:dashboard",
      },
    ],
  };
  const [searchText, setSearchText] = useState("");

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <div className="px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6">
      <div>
        <div className="flex justify-center align-middle items-center gap-2 text-textColor">
          <Link href="/" className="bg-textColor p-2 rounded-md">
            <Icon
              icon="game-icons:house-keys"
              fontSize={50}
              className="text-white"
            />
          </Link>
        </div>
        <div className="p-3.5">
          <SearchableInput
            inputID="sidebarSearch"
            value={searchText}
            onInputChange={handleSidebarSearch}
            inputClassName="rounded-full"
          />
        </div>
      </div>
      <div>
        <MenuItem content={sidebarMenu.dashboard[0]} />
      </div>
    </div>
  );
};
