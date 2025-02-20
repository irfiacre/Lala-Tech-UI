"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import PillComponent from "../PillComponent";
import ListingModel from "../models/ListingModel";
import { getProperties } from "@/services/backend";

const SecondSection = ({ user }: { user: any }) => {
  const [cardContent, setCardContent] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getProperties();
      setCardContent(result);
    })();
  }, []);

  const [selectedRental, setSelectedRental] = useState<null | any>(null);

  return (
    <section className="px-36 py-10 align-middle max-md:px-5">
      <div className="">
        <div className="space-y-5 text-center">
          <span className="text-textDarkColor text-5xl font-normal max-md:text-3xl py-2">
            Rental Listings
          </span>
        </div>
        {selectedRental && (
          <ListingModel
            user={user}
            onClose={() => setSelectedRental(null)}
            listing={selectedRental}
          />
        )}
        <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-10 max-md:grid-cols-2 md:gap-5">
          {cardContent.map((item: any) => (
            <BaseCard
              key={item.propert_id}
              className="px-8 py-6 space-y-2 flex flex-col items-center justify-start cursor-pointer hover:bg-primaryLight/5"
              onClick={() => setSelectedRental(item)}
            >
              {/* <div>
                <Image
                  className="rounded-lg w-80 h-40 object-cover bg-textLightColor border border-borderColorLight"
                  loader={() => item.photoUrl}
                  src={item.photoUrl}
                  alt={`${item.propert_id}`}
                  height={100}
                  width={100}
                  unoptimized
                />
              </div> */}
              <p className="text-textDarkColor text-lg font-bold">
                {item.title}
              </p>
              <p className="w-full text-textLightColor text-sm">
                {item.description.substring(0, 50)}... (more)
              </p>
              <div className="w-full flex flex-row items-center justify-between">
                <div className="flex justify-start items-center gap-2 text-textColor py-1.5  rounded-full text-center cursor-pointer hover:bg-primary/20 capitalize">
                  <Icon icon="fluent:star-20-filled" fontSize={20} />
                  <span>{item.rating}</span>
                </div>

                <PillComponent
                  text={item.furnished ? "Furnished" : "Unfurnished"}
                  hasCheck={item.furnished}
                />
              </div>
            </BaseCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
