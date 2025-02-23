"use client";
import React, { useEffect, useState } from "react";
import BaseInput from "../inputs/BaseInput";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";

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
  photo_urls?: Array<string>;
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
  const [imageUrlArray, setImageUrlArray] = useState<Array<string>>([]);
  const [error, setError] = useState<any>({
    title: "",
    price: "",
    rooms: "",
    province: "",
    imageUpload: "",
  });

  const handleInputChange = (e: any) => {
    e.preventDefault();

    setState((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    setError((prevState: any) => ({ ...prevState, [e.target.id]: "" }));
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (state.title === "") {
      setError((prevState: any) => ({
        ...prevState,
        title: "Title is required!",
      }));
      return;
    }
    if (state.price === "") {
      setError((prevState: any) => ({
        ...prevState,
        price: "Price is required!",
      }));
      return;
    }
    if (state.rooms === "") {
      setError((prevState: any) => ({
        ...prevState,
        rooms: "Rooms is required!",
      }));
      return;
    }
    if (state.province === "") {
      setError((prevState: any) => ({
        ...prevState,
        province: "Province is required!",
      }));
      return;
    }
    onFormSubmit({ ...state, photo_urls: imageUrlArray });
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
    setImageUrlArray(defaultValues?.photo_urls || []);
  }, [defaultValues]);

  const handleSuccess = (result: any, widget: any) => {
    console.log("-----", result);

    if (result?.info) {
      setImageUrlArray((prevState: any) => [
        ...prevState,
        result?.info.secure_url,
      ]);
    }
    setError((prevState: any) => ({
      ...prevState,
      imageUpload: "",
    }));
    widget.close({ quiet: true });
  };

  const handleError = (error: any, _widget: any) => {
    setError(error);
    setError((prevState: any) => ({
      ...prevState,
      imageUpload: error,
    }));
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
              required
              error={error.title}
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
              value={`${state.furnished}`}
            >
              <option value={"false"}>False</option>
              <option value={"true"}>True</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between mb-2">
          <div
            className={`w-full p-3.5 block mb-2 ${
              error.price && "text-red-500"
            }`}
          >
            <label htmlFor="price" className="block mb-2 text-base">
              Price per night *
            </label>
            <input
              type="number"
              id="price"
              className={`block w-full p-2 h-14 ${
                error.price
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight"
              } text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2`}
              placeholder="Enter desired price property..."
              value={state.price}
              onChange={handleInputChange}
              required
            />
            {error.rooms && (
              <p className="mt-2 text-sm text-red-500">{error.price}</p>
            )}
          </div>
          <div
            className={`w-full p-3.5 block mb-2 ${
              error.rooms && "text-red-500"
            }`}
          >
            <label htmlFor="rooms" className="block mb-2 text-base">
              Number of Rooms *
            </label>
            <input
              type="number"
              id="rooms"
              className={`block w-full p-2 h-14 ${
                error.rooms
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight"
              } text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2`}
              placeholder="Enter number of rooms in the property..."
              value={state.rooms}
              onChange={handleInputChange}
            />
            {error.rooms && (
              <p className="mt-2 text-sm text-red-500">{error.rooms}</p>
            )}
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
              error={error.province}
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
        <div className="w-full p-3.5 block mb-2">
          <label htmlFor="furnished" className="mb-2 text-base">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full p-2 h-14 bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2"
            placeholder="Enter description for the property..."
            value={state.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="m-3.5">
          <label className="block mb-2 text-base text-textDarkColor font-bold">
            Upload Property Images
          </label>
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            className="m-1.5 flex gap-2 text-textLightColor bg-white hover:bg-textColor hover:text-white hover:border-textColor focus:outline-none rounded-lg text-sm text-center p-2 border border-borderColorLight"
            onError={handleError}
            onSuccess={handleSuccess}
            options={{
              clientAllowedFormats: ["image"],
              sources: ["local", "camera", "url"],
            }}
          >
            <Icon icon="line-md:cloud-upload-loop" fontSize={20} /> Upload
          </CldUploadButton>
          {error && (
            <p className="mt-2 text-xs text-red-600">{error.statusText}</p>
          )}

          {imageUrlArray[0] && (
            <div className="py-2 space-y-2">
              <p className="text-sm text-textLightColor">Uploaded images</p>
              <div className="flex flex-row flex-wrap items-center justify-start gap-5">
                {imageUrlArray.map((imageUrl: any) => (
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

        <div className="text-textLightColor text-sm font-light p-2.5">
          <span>* Is for Required Fields</span>
        </div>
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
