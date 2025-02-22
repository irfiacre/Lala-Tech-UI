import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const PillComponent = ({
  text,
  hasCheck = false,
}: {
  text: string;
  hasCheck: boolean;
}) => {
  return (
    <div className={`${hasCheck ?"text-successGreen": "text-textLightColor"} py-1.5 m-1 rounded-full text-center cursor-pointer capitalize`}>
      <div className="flex flex-row items-center gap-1.5">
       {hasCheck && <Icon icon="fluent-mdl2:completed-solid" fontSize={20} />}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default PillComponent;
