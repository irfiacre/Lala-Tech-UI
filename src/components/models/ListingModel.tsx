"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import Image from "next/image";
import {
  createBooking,
  findUserPropertyBooking,
  manageBooking,
  manageProperty,
} from "@/services/backend";
import { toast } from "react-toastify";
import Datepicker from "react-tailwindcss-datepicker";
import { formatDate } from "@/util/helpers";

const BaseModel = ({
  user,
  listing,
  onClose,
}: {
  user: any;
  listing: any;
  onClose: () => void;
}) => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 3),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<any>(null);
  const {
    title,
    description,
    photoUrl,
    property_id,
    price,
    rooms,
    province,
    district,
    sector,
    furnished,
    status,
  } = listing;

  useEffect(() => {    
    if (property_id && user?.user_id) {
      (async () => {
        setLoading(true);
        const result = await findUserPropertyBooking(user.user_id, property_id);
        setBooking(result);
        setLoading(false);
      })();
    }
  }, [listing]);

  const handleReserveRoom = async () => {
    setLoading(true);

    const result = await createBooking({
      property: property_id,
      user: user.user_id,
      price: price,
      start_date: formatDate(dateRange.startDate, "YYYY-MM-DD"),
      end_date: formatDate(dateRange.endDate, "YYYY-MM-DD"),
    });

    if (result.booking_id) {
      toast.success("Your Booking was added", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setBooking(result);
    setLoading(false);
  };

  const handleConfirmBooking = async (status: string) => {
    setLoading(true);

    const result = await manageBooking(booking.booking_id, "PATCH", { status });
    if (status === "confirmed") {
      await manageProperty(booking.property.property_id, "PATCH", {
        status: "reserved",
      });
    }

    if (result.booking_id) {
      toast.success(`Your Booking was ${status}`, {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 3000,
      });
    }

    setLoading(false);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity flex justify-center items-center z-50 p-5">
      <div className="h-screen w-3/4 p-5">
        <BaseCard className="h-3/4 space-y-5 mt-20">
          <div className="p-2 flex flex-row items-center justify-between">
            <button
              type="button"
              className="top-3 end-2.5 text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => onClose()}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-20">
            <div className="space-y-5">
              <div>
                <Image
                  className="rounded-lg w-80 h-40 object-cover bg-textLightColor border border-borderColorLight"
                  loader={() => photoUrl}
                  src={photoUrl}
                  alt={`${property_id}`}
                  height={100}
                  width={100}
                  unoptimized
                />
              </div>

              <div>
                <div className="w-full space-y-1">
                  <h1 className="text-lg font-semibold text-textColor">
                    {title} ({status})
                  </h1>
                  <p className="text-sm text-textLightColor py-5 text-justify">
                    {description}
                  </p>
                </div>
                <div className="w-full text-textLightColor space-y-1">
                  <p>
                    <span className="text-textColor pr-1">Price: </span>
                    {price}
                  </p>
                  <p>
                    <span className="text-textColor pr-1">Rooms: </span>
                    {rooms}
                  </p>
                  <p>
                    <span className="text-textColor pr-1">Address: </span>
                    {`${province}, ${district}, ${sector}`}
                  </p>
                  <p>
                    <span className="text-textColor pr-1">Furnished: </span>
                    {furnished ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className="w-full space-y-2">
                <h1 className="text-sm text-textLightColor">
                  Choose the dates
                </h1>
                {/* <Datepicker
                  value={dateRange}
                  onChange={(val: any) => setDateRange(val)}
                  primaryColor={"amber"}
                  inputClassName="w-1/4 border border-textColor rounded-lg p-2.5"
                  placeholder="Booking Date Range"
                  toggleClassName="hidden"
                  minDate={new Date()}
                  displayFormat="YYYY-MM-DD"
                /> */}
              </div>
            </div>
            <div className="w-full items-center justify-center pt-5">
              {!booking && (
                <button
                  type="submit"
                  onClick={handleReserveRoom}
                  className="w-40 h-14 text-white bg-textColor hover:bg-white hover:text-textColor hover:border hover:border-textColor focus:outline-none font-medium rounded-lg text-md text-center py-3 disabled:bg-borderColorLight"
                  disabled={loading}
                >
                  Book Now
                </button>
              )}
              {booking && (
                <div>
                  {booking.status === "pending" ? (
                    <div className="flex flex-row gap-5">
                      <button
                        type="submit"
                        onClick={() => handleConfirmBooking("confirmed")}
                        className="w-40 h-14 text-white bg-successGreen hover:bg-white hover:text-successGreen hover:border hover:border-successGreen focus:outline-none font-medium rounded-lg text-md text-center py-3 disabled:bg-borderColorLight"
                        disabled={loading}
                      >
                        Confirm Booking
                      </button>

                      <button
                        type="submit"
                        onClick={() => handleConfirmBooking("canceled")}
                        className="w-40 h-14 text-red-500 hover:bg-red-500 bg-white hover:text-white border border-red-500 focus:outline-none font-medium rounded-lg text-md text-center py-3 disabled:bg-borderColorLight"
                        disabled={loading}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ) : 
                  <h1 className="text-lg text-textLightColor">
                    Bookings is already <span className="text-lg font-semibold">{booking.status}</span>
                  </h1>
                  }
                </div>
              )}
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default BaseModel;
