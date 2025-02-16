"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Pagination from "./Pagination";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { generateId } from "@/util/helpers";
import {
  createDocEntry,
  deleteDocEntryById,
  updateDocEntry,
} from "@/services/firebase/helpers";
import { PLANS_COLLECTION } from "@/constants/collectionNames";
import { toast } from "react-toastify";
import { handleDeleteRental } from "@/services/helpers";

const PropertiesTable = ({ data }: { data: Array<any> }) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [openModel, setOpenCourseModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    updateTableData(
      data.filter((item) =>
        searchText.trim() === ""
          ? item
          : item.title.toLowerCase().includes(searchText.trim().toLowerCase())
      )
    );
  }, [data, searchText]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  return (
    <BaseCard className="px-10 py-5">
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSearch}
        inputClassName="rounded-md"
      />

      <div className="py-5 text-textLightColor text-base font-semibold flex flex-row justify-between items-center">
        <span>Total = {data.length}</span>
        <div className="text-white bg-textColor hover:bg-white hover:text-textColor hover:border hover:border-textColor focus:outline-none font-medium rounded-lg text-md text-center p-4">
          <Link href="/properties">Add Another Property</Link>
        </div>
      </div>
      {/* - Properties (id, propertyId, title, description, hostId, status, rating(Default 3), price, rooms,  [Extra] imageUrls(3), address, furnished) */}
      <div className="py-2.5 text-textLightColor text-base font-semibold flex flex-row align-middle items-center px-1.5 gap-3.5 cursor-pointer bg-backgroundColor">
        <span className="w-full">Title</span>
        <span className="w-full max-sm:hidden">Description</span>
        <span className="w-2/4">Status</span>
        <span className="w-2/4">Price</span>
        <span className="w-2/4 max-sm:hidden">Rooms</span>
        <span className="w-2/4 max-sm:hidden">Address</span>
        <span className="w-2/4">Furnished</span>
        <span className="w-2/4">Actions</span>
      </div>
      <hr />
      <div>
        {tableData.map((item) => (
          <div key={item.propertyId}>
            <div className="flex flex-row align-middle items-start py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
              <div className="text-sm w-full">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-medium">
                    {item.title}
                  </span>
                </Link>
              </div>
              <div className="text-sm w-full max-sm:hidden">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.description.substring(0, 20)}
                  </span>
                </Link>
              </div>

              <div className="text-sm w-2/4">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.status}
                  </span>
                </Link>
              </div>
              <div className="text-sm w-2/4">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.price}
                  </span>
                </Link>
              </div>
              <div className="text-sm w-2/4 max-sm:hidden">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.rooms}
                  </span>
                </Link>
              </div>

              <div className="text-sm w-2/4 max-sm:hidden">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.address}
                  </span>
                </Link>
              </div>
              <div className="text-sm w-2/4">
                <Link href={`/properties/${item.propertyId}`}>
                  <span className="text-textLightColor font-light">
                    {item.furnished ? "Yes" : "No"}
                  </span>
                </Link>
              </div>

              <div className="w-2/4">
                <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-textColor hover:text-white focus:outline-none">
                  <Link href={`/properties/edit/${item.propertyId}`}>
                    <Icon icon="tabler:edit" fontSize={20} />
                  </Link>
                </div>
                <button
                  className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                  type="button"
                  onClick={() => handleDeleteRental(item)}
                >
                  <Icon icon="mdi:delete" fontSize={20} />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={3} totalPages={1} />
      </div>
    </BaseCard>
  );
};

export default PropertiesTable;
