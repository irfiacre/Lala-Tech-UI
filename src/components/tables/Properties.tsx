"use client";
import React, { useEffect, useState } from "react";
import BaseCard from "../cards/BaseCard";
import SearchableInput from "../inputs/SearchInput";
import Pagination from "./Pagination";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { formatPrice } from "@/util/helpers";
import ConfirmModel from "../models/ConfirmModel";

const PropertiesTable = ({
  data,
  loading,
  deleteProperty,
}: {
  data: Array<any>;
  loading: boolean;
  deleteProperty: (id: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tableData, updateTableData] = useState(data);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);

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

  const handleConfirmDelete = () => {
    deleteProperty(propertyToDelete?.property_id!);
    setPropertyToDelete(null);
  };

  const handleDeleteButtonClicked = (propertyId: string) =>
    setPropertyToDelete(propertyId);

  return (
    <BaseCard className="px-10 py-5">
      {propertyToDelete && (
        <ConfirmModel
          title={`Are you sure you want to delete "${propertyToDelete.title}"`}
          subtitle="This action is irreversible and permanent"
          loading={loading}
          handleConfirmed={handleConfirmDelete}
          handleClose={() => setPropertyToDelete(null)}
          isDelete
        />
      )}
      <SearchableInput
        inputID="sidebarSearch"
        value={searchText}
        onInputChange={handleSearch}
        inputClassName="rounded-full"
      />

      <div className="py-5 text-textLightColor text-base font-semibold flex flex-row justify-between items-center">
        <span>Total = {data.length}</span>
        <div className="text-white bg-textColor hover:bg-white hover:text-textColor border border-textColor focus:outline-none font-normal rounded-3xl text-sm text-center p-4">
          <Link href="/properties">Add Another Property</Link>
        </div>
      </div>
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
      {loading || !tableData[0] ? (
        <div className="text-textLightColor text-base font-light text-center p-10 -ml-10">
          <span>{`${
            loading ? "Loading Data..." : "No Properties Found"
          }`}</span>
        </div>
      ) : (
        <div>
          {tableData.map((item) => (
            <div key={item.property_id}>
              <div className="flex flex-row align-middle items-start py-2.5 px-1.5 gap-1.5 cursor-pointer hover:bg-backgroundColor">
                <div className="text-sm w-full">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-medium">
                      {item.title}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-full max-sm:hidden">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {item.description.substring(0, 20)}
                    </span>
                  </Link>
                </div>

                <div className="text-sm w-2/4">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {item.status}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {formatPrice(item.price)}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4 max-sm:hidden">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {item.rooms}
                    </span>
                  </Link>
                </div>

                <div className="text-sm w-2/4 max-sm:hidden">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {`${item.province}, ${item.district}, ${item.sector}`}
                    </span>
                  </Link>
                </div>
                <div className="text-sm w-2/4">
                  <Link href={`/properties/${item.property_id}`}>
                    <span className="text-textLightColor font-light">
                      {item.furnished ? "Yes" : "No"}
                    </span>
                  </Link>
                </div>

                <div className="w-2/4">
                  <div className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-textLightColor bg-inherit rounded-full hover:bg-textColor hover:text-white focus:outline-none">
                    <Link href={`/properties/edit/${item.property_id}`}>
                      <Icon icon="tabler:edit" fontSize={20} />
                    </Link>
                  </div>
                  <button
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-red-600 bg-inherit rounded-full hover:bg-red-600 hover:text-white focus:outline-none"
                    type="button"
                    onClick={() => handleDeleteButtonClicked(item)}
                  >
                    <Icon icon="mdi:delete" fontSize={20} />
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      <div className="w-full py-10">
        <Pagination prevPage={1} currentPage={1} nextPage={3} totalPages={1} />
      </div>
    </BaseCard>
  );
};

export default PropertiesTable;
