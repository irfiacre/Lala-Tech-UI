import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function LogoIcon({ size, color= "white" }: { size?: number, color?: string }) {
  
  return (
    <div>
      <Icon
        icon="game-icons:house-keys"
        fontSize={size}
        className={`text-[${color}]`}
      />
    </div>
  );
}

export default LogoIcon;
