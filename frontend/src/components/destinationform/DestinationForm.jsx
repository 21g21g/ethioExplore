import React from "react";
import AddButton from "../AddButton/AddButton";
import { IoClose } from "react-icons/io5";

const DestinationForm = ({ isOpen, onClose, url, userData, handleInputChange, handleAddSuccess }) => {

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50  ">
        <div className="absolute top-1/2 lg:w-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg  shadow-lg  lg:px-32 p-8 w-full ">
          <p className="pb-4 text-center text-3xl mb-3 font-serif"> Please Add Destination</p>
          <hr className="bg-green-800 mb-3 h-2" />
          <button className="absolute top-4  right-4" onClick={onClose}>
            <IoClose className="text-red-500 text-2xl cursor-pointer hover:text-red-500" />
          </button>

          <div className="flex flex-col gap-y-4 overflow-y-scroll max-h-96  " style={{ scrollbarWidth: 'none' }}>
            <div>

              <h1 className="text-green-900 mb-2 ">Name</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div>

              <h1 className="text-green-900 mb-2">description</h1>
              <input
                type="description"
                placeholder="description"
                name="description"
                value={userData.description}
                onChange={handleInputChange}
                className="input"

              />
            </div>
            <div>
              <h1 className="text-green-900 mb-2">location</h1>
              <input
                type="location"
                placeholder="location"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
                className="input"
              />
            </div>

          </div>
          <AddButton
            apiEndpoint={url}
            userData={userData}
            onSuccess={handleAddSuccess}
          />
        </div>
      </div>
    )
  );
};

export default DestinationForm;
