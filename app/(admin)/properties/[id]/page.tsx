"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BaseCard from "@/src/components/cards/BaseCard";
import isAuth from "@/src/components/isAuth";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { manageProperty } from "@/services/backend";
import { CldImage } from "next-cloudinary";
import ConfirmModel from "@/src/components/models/ConfirmModel";

const PropertyPage = ({ user }: { user: any }) => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
  

  useEffect(() => {
    if (!params.id) return;
    (async () => {
      const result = await manageProperty(params.id);
      setProperty(result);
      setLoading(false);
    })();
  }, [params.id]);

  const deleteProperty = async (propert_id: string) => {
    const result = await manageProperty(propert_id, "DELETE");
    toast.success(`Your property was REMOVED successfuly!`, {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 2000,
    });
    router.replace("/dashboard");
  };
  
  if (loading)
    return (
      <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
        <div>Loading...</div>
      </BaseCard>
    );
  
    const handleConfirmDelete = () => {
      deleteProperty(property.property_id!);
      setOpen(false);
    };


  return (
    <BaseCard className="px-10 py-10 text-textDarkColor space-y-5">
      {open && (
        <ConfirmModel
          title={`Are you sure you want to delete "${property.title}"`}
          subtitle="This action is irreversible and permanent"
          loading={loading}
          handleConfirmed={handleConfirmDelete}
          handleClose={() => setOpen(false)}
          isDelete
        />
      )}
      <div className=" flex flex-row max-md:flex-col max-md:divide-y-2 md:divide-x-2">
        <div className="w-full pr-5">
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="text-lg font-semibold text-textDarkColor">
              {property?.title}
            </h1>
            <div>
              <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-textColor hover:text-white focus:outline-none">
                <Link href={`/properties/edit/${property?.property_id}`}>
                  <Icon icon="tabler:edit" fontSize={28} />
                </Link>
              </div>
              <button
                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                type="button"
                onClick={() => setOpen(true)}
              >
                <Icon icon="mdi:delete" fontSize={28} />
              </button>
            </div>
          </div>

          <p className="text-sm text-textLightColor py-5 text-justify">
            {property?.description}
          </p>
        </div>
        <div className="w-2/4">
          <div className="w-full md:px-10 max-md:pt-10 text-textLightColor">
            <h1 className="text-xl font-medium pb-5">More Details</h1>
            <p>Status: {property?.status}</p>
            <p>Price: {property?.price}</p>
            <p>Rooms: {property?.rooms}</p>
            <p>
              Address:
              {`${property?.province}, ${property?.district}, ${property?.sector}`}
            </p>
            <p>Furnished: {property?.furnished ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        {property?.photo_urls[0] && (
          <div className="py-2 space-y-2">
            <span className="text-sm text-textLightColor">Property images</span>
            <div className="flex flex-row flex-wrap items-center justify-start gap-5">
              {property?.photo_urls.map((imageUrl: any) => (
                <div key={imageUrl}>
                  <CldImage
                    width={200}
                    height={100}
                    src={imageUrl}
                    alt="Uploaded image"
                    className="rounded-lg h-28 w-52 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default isAuth(PropertyPage);
