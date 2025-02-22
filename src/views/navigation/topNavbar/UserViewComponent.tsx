import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserViewComponent = ({
  user,
  isActive,
  handleDropdown,
  handleLogout,
}: {
  user: any;
  isActive: boolean;
  handleDropdown: (data: any) => void;
  handleLogout: () => void;
}) => {
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div>
      </div>
      <div>
        <div className="relative inline-block text-left">
          <div onClick={() => handleDropdown((prevState: any) => !prevState)}>
            <Image
              className="rounded-full cursor-pointer"
              loader={() => user?.image}
              src={user?.image || PLACEHOLDER_IMG}
              alt="Rounded avatar"
              height={38}
              width={38}
              unoptimized
            />
          </div>
          <div
            className={`${
              isActive ? "" : "hidden"
            } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
              >
                Profile
              </Link>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-backgroundColor2"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewComponent;
