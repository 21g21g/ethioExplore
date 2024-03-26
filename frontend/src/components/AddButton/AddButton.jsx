import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AddButton = ({ apiEndpoint, dataToAdd, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = () => {
    setIsLoading(true);
    if (!dataToAdd.name || !dataToAdd.email || !dataToAdd.password || !dataToAdd.hotelName || !dataToAdd.phone) {
      toast.error("Please fill in all required fields.");
      return setIsLoading(false);
      ;
    }
    axios
      .post(apiEndpoint, dataToAdd)
      .then((response) => {
        setIsLoading(false);
        onSuccess();
        // Optionally, you can handle success actions here
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error adding data:", error);
        // Optionally, you can handle error actions here
      });
  };

  return (
    <button
      className="bg-green-500 w-full mt-4 text-white px-4 py-2 rounded hover:bg-green-300 focus:outline-none"
      onClick={handleAdd}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg
          className="animate-spin text-white h-5 w-5 mr-3 border-t-2 border-b-2 border-green-500 rounded-full"
          viewBox="0 0 24 24"
        ></svg>
      ) : (
        "Add"
      )}
    </button>
  );
};

export default AddButton;
