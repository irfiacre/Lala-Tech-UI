import React from "react";
import { Poppins } from "next/font/google";
import { Icon } from "@iconify/react/dist/iconify.js";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
});

const LogoComponent = ({
  small,
  medium,
}: {
  small?: boolean;
  medium?: boolean;
}) => {
  const logoParams = {
    iconSize: small ? 50 : medium ? 80 : 110,
    fontSize1: small ? 22 : medium ? 32 : 48,
    fontSize2: small ? 34 : medium ? 48 : 88,
  };
  return (
    <div className="flex justify-center align-middle items-center gap-2 text-textColor">
      <div
            className="bg-primary p-2 rounded-md"
            // style={{ backgroundColor:  }}
          >
            <Icon
              icon="game-icons:house-keys"
              fontSize={logoParams.iconSize}
              className="text-white"
            />
          </div>
    </div>
  );
};

export default LogoComponent;
