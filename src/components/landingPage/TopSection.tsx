"use client";
import React from "react";
import dynamic from "next/dynamic";
import LogoIcon from "../logo/LogoIcon";
import { Icon } from "@iconify/react/dist/iconify.js";
import animationData from "../../../public/assets/car_animation.json";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const TopSection = () => {
  const router = useRouter();

  const handleBtnClicked = (condition: string) => {
    if (condition === "login") {
      router.push("/dashboard");
    } else {
      console.log("Send User to Download App Page");
    }
  };

  const handleLoginWithGoogle = () =>
    signIn("google", { callbackUrl: `http://localhost:3000/dashboard` });

  return (
    <section className="px-36 py-5 space-y-5 bg-primaryLight/50 max-md:px-5">
      <div className="flex flex-row items-center justify-between">
        <div>
          <LogoIcon size={26} />
        </div>
        <div className="flex flex-row items-center justify-end gap-5">
          <button
            type="button"
            onClick={() => handleBtnClicked("join")}
            className="text-primary bg-white hover:text-white hover:bg-primary focus:outline-none  font-medium rounded-md text-md text-center py-2.5 px-5"
          >
            Become a laHost
          </button>
          <button
            type="button"
            onClick={() => handleLoginWithGoogle()}
            className="capitalize text-white bg-textColor hover:text-textColor hover:bg-white focus:outline-none  font-medium rounded-md text-md text-center py-2.5 px-5 disabled:bg-borderColorLight"
          >
            Login
          </button>
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
