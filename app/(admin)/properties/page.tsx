"use client";
import React, { useEffect, useState } from "react";
import { PLANS_COLLECTION } from "@/constants/collectionNames";
import {
  getCollectionEntries,
  subscribeToCollection,
} from "@/services/firebase/helpers";
import isAuth from "@/src/components/isAuth";
import PropertyForm from "@/src/components/PropertyForm";

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = (data: any) => {
    setLoading(false);
    console.log("======", data);
    
  };


  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div><PropertyForm  onFormSubmit={handleOnSubmit}/></div>
  );
};

// export default isAuth(OnboardingPlans);
export default AddProperty;
