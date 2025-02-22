"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import Image from "next/image";
import PillComponent from "../PillComponent";
import ListingModel from "../models/ListingModel";
import { getProperties } from "@/services/backend";
import { DEFAULT_IMAGE } from "@/constants/fixtures";
import { formatPrice } from "@/util/helpers";
import Skeleton from "react-loading-skeleton";

const SecondSection = ({ user }: { user: any }) => {
  const [cardContent, setCardContent] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getProperties();
      setCardContent(result);
      setLoading(false);
    })();
  }, []);

  const [selectedRental, setSelectedRental] = useState<null | any>(null);

  return (
    <section className="px-10 pb-10 align-middle max-md:px-5">
      <div className="">
        <div className="py-10 px-10">
          <span className="text-textColor text-2xl font-semibold">
            Checkout our New Listings
          </span>
        </div>
        {selectedRental && (
          <ListingModel
            user={user}
            onClose={() => setSelectedRental(null)}
            listing={selectedRental}
          />
        )}
        <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-2.5 max-lg:grid-cols-3 max-md:grid-cols-2">
          {loading &&
            [1, 2, 3, 4].map((elt) => (
              <Skeleton
                key={elt}
                count={1}
                height={200}
                className="rounded-3xl"
              />
            ))}
          {cardContent.map((item: any) => (
            <BaseCard
              key={`${item.property_id}`}
              className="space-y-2 flex flex-col justify-start cursor-pointer hover:bg-primaryLight/5 rounded-3xl"
              onClick={() => setSelectedRental(item)}
            >
              <div>
                <Image
                  className="rounded-t-3xl w-full h-40 object-cover bg-textLightColor"
                  loader={() => item.photoUrl}
                  src={item.photo_urls[0] || DEFAULT_IMAGE}
                  alt={`${item.property_id}`}
                  height={200}
                  width={200}
                  unoptimized
                />
              </div>
              <div className="px-5 space-y-2 pb-2.5">
                <p className="text-lg font-medium">{item.title}</p>
                <PillComponent
                  text={item.furnished ? "Furnished" : "Unfurnished"}
                  hasCheck={item.furnished}
                />
                <p className="w-full text-textLightColor text-sm">
                  {item.description.substring(0, 50)}... (more)
                </p>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex justify-start items-center gap-2 text-textLightColor py-1.5  rounded-full text-center cursor-pointer">
                    <span className="text-xs">from</span>
                    <span className="text-black font-semibold">
                      RWF {formatPrice(item.price)}
                    </span>
                    <span className="text-xs">per night</span>
                  </div>
                </div>
              </div>
            </BaseCard>
          ))}
          {!loading && !cardContent[0] && (
            <div className="py-10 px-10">
              <span className="text-textLightColor text-2xl font-light">
                No Listing Available
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
