import { toast } from "react-toastify";
import { manageProperty } from "./backend";

const handleDeleteRental = async (propert_id: any) => {
  const result = await manageProperty(propert_id, "DELETE");
  toast.success(`Your property was REMOVED successfuly!`, {
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: 2000,
  });
};

function getEmptyFields(obj: any) {
  return Object.keys(obj).filter(key => {
    let value = obj[key];
    return (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && value !== null && Object.keys(value).length === 0)
    );
  });
}

export { handleDeleteRental, getEmptyFields };
