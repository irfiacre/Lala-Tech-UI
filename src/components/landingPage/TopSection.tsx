"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import LogoIcon from "../logo/LogoIcon";
import animationData from "../../../public/assets/car_animation.json";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";
import UserViewComponent from "@/src/views/navigation/topNavbar/UserViewComponent";
import ConfirmModel from "../models/ConfirmModel";
import { make_user_a_host } from "@/services/backend";
import { toast } from "react-toastify";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const TopSection = ({ user }: { user: any }) => {
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
    <section className="px-36 py-5 space-y-5 bg-primaryLight/50 max-md:px-5">
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
        <div>
          <LogoIcon size={26} />
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          {user?.role === "host" ? (
            <Link
              href={`/dashboard`}
              className="text-textColor bg-white hover:text-white hover:bg-textColor focus:outline-none font-medium rounded-md text-md text-center py-2.5 px-5 border border-textColor"
            >
              Dashboard
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handleBtnClicked()}
              className="text-textColor bg-white hover:text-white hover:bg-textColor focus:outline-none font-medium rounded-md text-md text-center py-2.5 px-5 border border-textColor"
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

      <div className="flex flex-row items-center justify-between pt-24 max-md:flex-wrap">
        <div className="space-y-5">
          <div>
            <span className="text-textDarkColor text-8xl font-semibold max-md:text-5xl">
              Welcome to
            </span>
            <br />
            <span className="text-primary text-7xl font-semibold max-md:text-4xl">
              laRental
            </span>
          </div>
          <p className="text-textLightColor">
            Find a Rental Property around Kigali
          </p>
        </div>
        <div className="max-md:pt-10">
          <Lottie
            animationData={animationData}
            height={"100%"}
            width={"100%"}
            loop={true}
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
