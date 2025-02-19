"use client";
import React, { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { RENTAL_PROPERTIES } from "@/constants/fixtures";
import Course from "@/src/components/Course";
import BaseCard from "@/src/components/cards/BaseCard";
import SearchableInput from "@/src/components/inputs/SearchInput";
import { formatDate } from "@/util/helpers";
import isAuth from "@/src/components/isAuth";
import { updateDocEntry } from "@/services/firebase/helpers";
import { PLANS_COLLECTION } from "@/constants/collectionNames";
import { toast } from "react-toastify";
import Loading from "@/src/components/LoadingComponent";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { manageProperty } from "@/services/backend";

const PropertyPage = ({ user }: { user: any }) => {
  const params = useParams();
  const [property, setProperty] = useState<any>({});
  const router = useRouter()


  useEffect(() => {
    (async () => {
      const result = await manageProperty(params.id);
    setProperty(result);
    })();
  }, [params.id]);

    const deleteProperty=async(propert_id: string)=>{
      const result = await manageProperty(propert_id, "DELETE");
      toast.success(`Your property was REMOVED successfuly!`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 2000,
      });
      router.replace("/dashboard");
    }

  return (
    <div>
      {!property.property_id ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
        <span >Loading Data...</span>
        </div>
      ) : (
        <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
          <div className=" flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2">
            <div className="w-full pr-5">
              <div className="w-full flex flex-row justify-between items-center">
                <h1 className="text-lg font-semibold text-textDarkColor">
                  {property.title}
                </h1>
                <div>
                  <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-textColor hover:text-white focus:outline-none">
                    <Link href={`/properties/edit/${property.property_id}`}>
                      <Icon icon="tabler:edit" fontSize={28} />
                    </Link>
                  </div>
                  <button
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                    type="button"
                    onClick={() => deleteProperty(property.property_id)}
                  >
                    <Icon icon="mdi:delete" fontSize={28} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-textLightColor py-5 text-justify">
                {property.description}
              </p>
            </div>
            <div className="w-2/4">
              <div className="w-full md:px-10 max-md:pt-10 text-textLightColor">
                <h1 className="text-xl font-medium  pb-5">More Details</h1>
                <p>Status: {property.status}</p>
                <p>Price: {property.price}</p>
                <p>Rooms: {property.rooms}</p>
                <p>Address: {`${property.province}, ${property.district}, ${property.sector}`}</p>
                <p>Furnished: {property.furnished ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* <h1 className="text-lg font-medium text-textLightColor py-2">
              Photos:
            </h1> */}
            {/* <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={RESPONSIVE}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-10-px"
            >
              {property.images.map((imageUrl: string) => (
                <div key={imageUrl} className="w-2/4">
                  <Image
                    className="rounded-md w-full h-full bg-textLightColor max-md:w-50 object-cover"
                    loader={() => imageUrl}
                    src={imageUrl}
                    alt={"Property images"}
                    height={100}
                    width={100}
                    unoptimized
                  />
                </div>
              ))}
            </Carousel> */}
          </div>
        </BaseCard>
      )}
    </div>
  );
};

export default isAuth(PropertyPage);
