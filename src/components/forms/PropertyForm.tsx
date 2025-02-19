"use client";
import React, { useEffect, useState } from "react";
import BaseInput from "../inputs/BaseInput";

// - Properties (title, description, price, rooms,  [Extra] imageUrls(3), address, furnished)

interface PropertyState {
  title: string;
  description: string;
  price: string;
  rooms: string;
  province: string;
  district: string;
  sector: string;
  furnished: boolean;
}

const PropertyForm = ({
  onFormSubmit,
  loading,
  defaultValues,
}: {
  onFormSubmit: (obj: PropertyState) => void;
  loading: boolean;
  defaultValues?: any;
}) => {
  const [state, setState] = useState<PropertyState>({
    title: "",
    description: "",
    price: "",
    rooms: "",
    furnished: false,
    province: "",
    district: "",
    sector: "",
  });

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setState((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    onFormSubmit(state);
  };

  useEffect(() => {
    setState({
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "",
      rooms: defaultValues?.rooms || "",
      furnished: defaultValues?.furnished,
      province: defaultValues?.province || "",
      district: defaultValues?.district || "",
      sector: defaultValues?.sector || "",
    });
  }, [defaultValues]);

  return (
    <form className="w-full">
      <div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="Title"
              value={state.title}
              placeholder="Title for the listing"
              onInputChange={handleInputChange}
              required
            />
          </div>

          <div className="w-full p-3.5">
            <label
              htmlFor="furnished"
              className="block mb-2 text-base text-textDarkColor font-bold"
            >
              Is the Property Furnished
            </label>
            <select
              id="furnished"
              className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
              onChange={handleInputChange}
              value={state.furnished}
            >
              <option value={"false"}>False</option>
              <option value={"true"}>True</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full p-3.5">
            <label
              htmlFor="price"
              className="block mb-2 text-base text-textDarkColor font-bold"
            >
              Price *
            </label>
            <input
              type="number"
              id="price"
              className={`block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none`}
              placeholder="Enter desired price property..."
              value={state.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full p-3.5">
            <label
              htmlFor="rooms"
              className="block mb-2 text-base text-textDarkColor font-bold"
            >
              Number of Rooms *
            </label>
            <input
              type="number"
              id="rooms"
              className={`block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none`}
              placeholder="Enter number of rooms in the property..."
              value={state.rooms}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="Province"
              value={state.province}
              placeholder="province address"
              onInputChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full">
            <BaseInput
              label="District"
              value={state.district}
              placeholder="district address"
              onInputChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <BaseInput
              label="Sector"
              value={state.sector}
              placeholder="sector address"
              onInputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full p-3.5">
          <label
            htmlFor="furnished"
            className="block mb-2 text-base text-textDarkColor font-bold"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className={`block w-full p-2 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none`}
            placeholder="Enter description for the property..."
            value={state.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>


      <div className="text-textLightColor text-sm font-light p-2.5">
        <span >* Is for Required Fields</span>
        </div>
      <div className="p-3.5">
        <button
          type="submit"
          onClick={handleSubmitForm}
          className="w-full h-16 text-white bg-textColor hover:bg-primaryDark focus:outline-none  font-medium rounded-md text-md text-center py-3 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
