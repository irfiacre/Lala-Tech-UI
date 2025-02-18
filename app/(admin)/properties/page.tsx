"use client";
import React, { useEffect, useState } from "react";
import { PLANS_COLLECTION } from "@/constants/collectionNames";
import {
  getCollectionEntries,
  subscribeToCollection,
} from "@/services/firebase/helpers";
import isAuth from "@/src/components/isAuth";
import PropertyForm from "@/src/components/PropertyForm";
import { createProperty } from "@/services/backend";

// { "title": "Test Property", "description": "Very Good property", "host": "27718c66-e8d9-4e5b-abd3-9ea4bbe09411", "price": 10000, "rooms": 5, "province": "Kigali", "district": "Kicukiro", "sector":"Kanombe", "furnished": true }

const AddProperty = ({ user }: any) => {
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async (data: any) => {
    setLoading(true);
    const propertyData = {
      ...data,
      host: user.user_id,
      furnished: data.furnished == "true",
    };

    const result = await createProperty(propertyData);
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div>
      <PropertyForm onFormSubmit={handleOnSubmit} loading={loading}/>
    </div>
  );
};

export default isAuth(AddProperty);
