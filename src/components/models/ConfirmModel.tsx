"use client"
import React, { useState } from "react";
import BaseCard from "../cards/BaseCard";
import Image from "next/image";
import { DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const ConfirmModel = ({
  title,
  subtitle,
  loading,
  handleConfirmed,
  handleClose,
  isDelete
}: {
  title: string;
  subtitle: string;
  loading: boolean;
  handleConfirmed: () => void;
  handleClose: () => void;
  isDelete?: boolean
}) => {

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity flex justify-center items-center z-50">
      <div>
        <BaseCard className="h-1/4 p-5 space-y-5">
        <div className="flex flex-col min-h-full items-end justify-center p-2.5 text-center sm:items-center sm:p-0">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-textColor" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <p>
                    {title}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     {subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleConfirmed()}
                disabled={loading}
                className={`inline-flex w-full justify-center rounded-md ${isDelete?"bg-red-600 hover:bg-red-500":"bg-textColor hover:bg-textColor/80"} px-10 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto disabled:bg-gray-500`}
              >
                Yes
              </button>
              <button
                type="button"
                data-autofocus
                disabled={loading}
                onClick={() => handleClose()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:text-gray-500"
              >
                Cancel
              </button>
            </div>
        </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default ConfirmModel;
