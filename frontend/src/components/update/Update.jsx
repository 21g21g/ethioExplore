import React, { useState } from "react";
import axios from "axios";

const Update = ({ apiEndpoint, dataToUpdate, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);
    axios
      .put(`${apiEndpoint}/${dataToUpdate.id}`, dataToUpdate)
      .then((response) => {
        setIsLoading(false);
        onSuccess();
        // Optionally, you can handle success actions here
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error updating data:", error);
        // Optionally, you can handle error actions here
      });
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
      onClick={handleUpdate}
      disabled={isLoading}
    >
      {isLoading ? "Updating..." : "Update"}
    </button>
  );
};

export default Update;
