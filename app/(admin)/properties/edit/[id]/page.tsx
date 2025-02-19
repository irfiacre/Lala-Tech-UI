"use client";
import { manageProperty } from "@/services/backend";
import PropertyForm from "@/src/components/forms/PropertyForm";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditRentalPage = () => {
  const params = useParams();
  const [property, setProperty] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await manageProperty(params.id);
      setProperty(result);
    })();
  }, [params.id]);

  const handleUpdateProperty = async (data: any) => {
    setLoading(true);
    const result = await manageProperty(params.id, "PATCH", data);
    if (result.title) {
      toast.success(`Your property "${result.title}" updated successfuly!`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {!property.property_id ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
          <span>Loading Data...</span>
        </div>
      ) : (
        <div>
          <PropertyForm
            onFormSubmit={handleUpdateProperty}
            loading={loading}
            defaultValues={property}
          />
        </div>
      )}
    </div>
  );
};

export default EditRentalPage;
