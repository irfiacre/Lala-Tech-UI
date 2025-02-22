"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuItem = ({ content }: { content: any }) => {
  const pathname: any = usePathname();
  const active = pathname.includes(content.url);

  return (
    <Link href={`/${content.url}`} scroll={false}>
      <div
        className={`py-4 px-5 mx-3 flex flex-row justify-start items-center gap-4 ${
          active
            ? "bg-textColor rounded-3xl"
            : " hover:bg-menuIconBackground hover:rounded-3xl"
        }`}
      >
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full  ${
            active ? "bg-textColor" : "bg-menuIconBackground"
          }`}
        >
          <Icon
            icon={content.icon}
            fontSize={active ? 25 : 20}
            className={active ? "text-white" : ""}
          />
        </div>
        <div>
          <p className={`text-lg mb-1 ${active ? "text-white" : ""}`}>
            {content.title}
          </p>
          <p
            className="text-sm text-borderColorLight"
          >
            {content.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

const MenuSection = ({
  title,
  menuItems,
}: {
  title: string;
  menuItems: Array<any>;
}) => {
  return (
    <div className=" ml-4">
      <p className="text-textLightColor text-xl">{title}</p>
      {menuItems.map((item) => (
        <MenuItem key={item.title} content={item} />
      ))}
    </div>
  );
};

export default MenuSection;
