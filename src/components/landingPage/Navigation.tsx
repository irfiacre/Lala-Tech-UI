"use client";
import React, { useState } from "react";
import LogoIcon from "../logo/LogoIcon";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import UserViewComponent from "@/src/views/navigation/topNavbar/UserViewComponent";
import ConfirmModel from "../models/ConfirmModel";
import { make_user_a_host } from "@/services/backend";
import { toast } from "react-toastify";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavigationSection = ({ user }: { user: any }) => {
  const router = useRouter();
  const [isActive, handleDropdown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBtnClicked = () => {
    setOpen(true);
  };

  const handleLoginWithGoogle = () => signIn("google");

  const handleLogout = async () => {
    await signOut({ callbackUrl: process.env.APP_BASE_URL });
  };

  const handleUpdateRole = async () => {
    setLoading(true);
    const result = await make_user_a_host(user.email);
    setOpen(false);

    if (result.role) {
      toast.success("You are now a host!", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <section className="px-10 py-2.5 space-y-5 max-md:px-5 bg-cover bg-no-repeat bg-center">
      {open && (
        <ConfirmModel
          title="Want to become a host"
          subtitle="Allows you to Rent your properties"
          loading={loading}
          handleConfirmed={handleUpdateRole}
          handleClose={() => setOpen(false)}
        />
      )}

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            icon="game-icons:house-keys"
            fontSize={32}
            className="text-textColor"
          />
          <span className="text-textColor font-semibold">LaRental</span>
        </div>
        <div className="flex flex-row items-center justify-end">
          {user?.role === "host" ? (
            <Link
              href={`/dashboard`}
              className="text-textColor hover:text-primary focus:outline-none font-medium rounded-lg text-md text-center py-2.5 px-5"
            >
              Dashboard
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handleBtnClicked()}
              className="text-textColor bg-white hover:text-white hover:bg-textColor focus:outline-none font-medium rounded-lg text-md text-center py-2.5 px-5"
            >
              Become a Host
            </button>
          )}

          {user ? (
            <UserViewComponent
              user={user}
              isActive={isActive}
              handleDropdown={handleDropdown}
              handleLogout={handleLogout}
            />
          ) : (
            <button
              type="button"
              onClick={() => handleLoginWithGoogle()}
              className="capitalize text-white bg-textColor hover:text-textColor hover:bg-white focus:outline-none  font-medium rounded-md text-md text-center py-2.5 px-5 disabled:bg-borderColorLight"
            >
              Login
            </button>
          )}

          <div className="mr-6 flex flex-row gap-3 items-center text-textColor"></div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
