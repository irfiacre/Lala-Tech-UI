"use client";
import React, { useEffect, useState } from "react";
import BaseInput from "./inputs/BaseInput";

// - Properties (title, description, price, rooms,  [Extra] imageUrls(3), address, furnished)

interface PropertyState {
  title : string;
  description : string;
  price: string;
  rooms: string;
  province: string;
  district: string;
  sector: string;
  furnished: boolean;
}

const PropertyForm = ({
  onFormSubmit,
  loading
}: {
  onFormSubmit: (obj: PropertyState) => void;
  loading: boolean
}) => {
  const [state, setState] = useState<PropertyState>({
    title : '',
    description : '',
    price: '',
    rooms: '',
    furnished: false,
    province:'',
    district:'',
    sector:''
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
            />
          </div>
          <div className="w-full">
            <BaseInput
              label="Price"
              value={state.price}
              placeholder="desired price"
              onInputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="Rooms"
              value={state.rooms}
              placeholder="Number of rooms in the property"
              onInputChange={handleInputChange}
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
            >
              <option value={'false'}>False</option>
              <option value={'true'}>True</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-full">
            <BaseInput
              label="Province"
              value={state.province}
              placeholder="province address"
              onInputChange={handleInputChange}
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
      <div className="p-3.5">
        <button
          type="submit"
          onClick={handleSubmitForm}
          className="w-full h-16 text-white bg-textColor hover:bg-primaryDark focus:outline-none  font-medium rounded-md text-md text-center py-3"
          disabled={loading}
        >
          {loading ? "Saving...":"Submit"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
