"use client"
import React, { useState } from "react";
import BaseCard from "../cards/BaseCard";
import Image from "next/image";

const BaseModel = ({
  listing,
  onClose,
}: {
  listing: any;
  onClose: () => void;
}) => {
  const { title, description, photoUrl, propertId } = listing;
  const [loading, setLoading] = useState<boolean>(false)
  const handleReserveRoom = ()=>{
    console.log('Should reserve');
    
  }
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity flex justify-center items-center z-50">
      <div>
        <BaseCard className="h-1/4 p-5 space-y-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl text-textLightColor font-normal capitalize">
              {title}
            </h1>
            <button
              type="button"
              className="top-3 end-2.5 text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => onClose()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div>
            <div>
              <Image
                className="rounded-lg w-80 h-40 object-cover bg-textLightColor border border-borderColorLight"
                loader={() => photoUrl}
                src={photoUrl}
                alt={`${propertId}`}
                height={100}
                width={100}
                unoptimized
              />
            </div>
            <p className="text-textDarkColor text-lg font-bold">{title}</p>
            <p className="text-textLightColor text-sm">
              {description}
            </p>
          </div>
          <div className="w-full items-center justify-center">
          <button
        type="submit"
        onClick={handleReserveRoom}
        className="w-40 h-14 text-white bg-textColor hover:bg-white hover:text-textColor hover:border hover:border-textColor focus:outline-none font-medium rounded-md text-md text-center py-3 disabled:bg-borderColorLight"
        disabled={loading}
      >
        Reserve
      </button>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default BaseModel;
