"use client";
import React, { useState } from "react";
import BaseCard from "../cards/BaseCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import PillComponent from "../PillComponent";
import ListingModel from "../models/ListingModel";

const SecondSection = () => {
  const cardContent = [
    {
      propertId: "xxx-yyy-zzz-01",
      title:
        "Kigali fully furnished luxury villa for rent on a hilltop in Kinyinya",
      photoUrl: "https://i.pravatar.cc/450?u=20",
      description:
        "The house is built in a large scale compound with a great view, a well designed garden and a modern parking lot. It has a unique design customized for an astonishing living experience filled with superior quality furniture with the following details:",
      rating: 4,
      furnished: true,
    },
    {
      propertId: "xxx-yyy-zzz-02",
      title:
        "Kigali fully furnished luxury villa for rent on a hilltop in Kinyinya",
      photoUrl: "https://i.pravatar.cc/450?u=20",
      description:
        "The house is built in a large scale compound with a great view, a well designed garden and a modern parking lot. It has a unique design customized for an astonishing living experience filled with superior quality furniture with the following details:",
      rating: 4,
      furnished: false,
    },
    {
      propertId: "xxx-yyy-zzz-03",
      title:
        "Kigali fully furnished luxury villa for rent on a hilltop in Kinyinya",
      photoUrl: "https://i.pravatar.cc/450?u=20",
      description:
        "The house is built in a large scale compound with a great view, a well designed garden and a modern parking lot. It has a unique design customized for an astonishing living experience filled with superior quality furniture with the following details:",
      rating: 4,
      furnished: true,
    },
    {
      propertId: "xxx-yyy-zzz-04s",
      title:
        "Kigali fully furnished luxury villa for rent on a hilltop in Kinyinya",
      photoUrl: "https://i.pravatar.cc/450?u=20",
      description:
        "The house is built in a large scale compound with a great view, a well designed garden and a modern parking lot. It has a unique design customized for an astonishing living experience filled with superior quality furniture with the following details:",
      rating: 4,
      furnished: false,
    },
    {
      propertId: "xxx-yyy-zzz-05",
      title:
        "Kigali fully furnished luxury villa for rent on a hilltop in Kinyinya",
      photoUrl: "https://i.pravatar.cc/450?u=20",
      description:
        "The house is built in a large scale compound with a great view, a well designed garden and a modern parking lot. It has a unique design customized for an astonishing living experience filled with superior quality furniture with the following details:",
      rating: 4,
      furnished: true,
    },
  ];

  const [selectedRental, setSelectedRental] = useState<null|any>(null)

  return (
    <section className="px-36 py-10 align-middle max-md:px-5">
      <div className="">
        <div className="space-y-5 text-center">
          <span className="text-textDarkColor text-5xl font-normal max-md:text-3xl py-2">
            Rental Listings
          </span>
        </div>
        {selectedRental && <ListingModel onClose={()=> setSelectedRental(null)} listing={selectedRental} />}
         <div className="grid grid-cols-4 md:grid-cols-3 gap-10 md:gap-5">
          {cardContent.map((item) => (
            <BaseCard
              key={item.propertId}
              className="px-8 py-6 space-y-2 flex flex-col items-center justify-start cursor-pointer hover:bg-primaryLight/5"
              onClick={()=> setSelectedRental(item)}
            >
              <div>
                <Image
                  className="rounded-lg w-80 h-40 object-cover bg-textLightColor border border-borderColorLight"
                  loader={() => item.photoUrl}
                  src={item.photoUrl}
                  alt={`${item.propertId}`}
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>
              <p className="text-textDarkColor text-lg font-bold">
                {item.title}
              </p>
              <p className="text-textLightColor text-sm">
                {item.description.substring(0, 100)}... (more)
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
