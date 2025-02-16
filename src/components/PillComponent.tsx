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
    <div className="border text-textLightColor py-1.5 px-2.5 m-1  rounded-full text-center cursor-pointer hover:bg-primary/20 capitalize">
      <div className="flex flex-row items-end gap-1.5">
       {hasCheck && <Icon icon="fluent-mdl2:completed-solid" fontSize={20} />}
        <span>{text} </span>
      </div>
    </div>
  );
};

export default PillComponent;
