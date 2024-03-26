import React from "react";
import AddButton from "../AddButton/AddButton";
import { IoClose } from "react-icons/io5";

const ManagerFormModal = ({ isOpen, onClose, managerData, handleInputChange, handleAddSuccess }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50  ">
                <div className="absolute top-1/2 lg:w-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg  shadow-lg  lg:px-32 p-8 w-full ">
                    <p className="pb-4 text-center text-3xl mb-3">Please Add the Hotel manager</p>
                    <button className="absolute top-4  right-4" onClick={onClose}>
                        <IoClose className="text-red-500 text-2xl cursor-pointer hover:text-red-500" />
                    </button>

                    <div className="flex flex-col gap-y-4">
                        <div>

                            <h1 className="text-green-900 mb-2 ">Manager Name</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={managerData.name}
                                onChange={handleInputChange}
                                className="input"
                            />
                        </div>
                        <div>

                            <h1 className="text-green-900 mb-2">Email</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={managerData.email}
                                onChange={handleInputChange}
                                className="input"

                            />
                        </div>
                        <div>
                            <h1 className="text-green-900 mb-2">password</h1>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={managerData.password}
                                onChange={handleInputChange}
                                className="input"
                            />
                        </div>
                        <div>

                            <h1 className="text-green-900 mb-2">Hotel Name</h1>

                            <input
                                type="text"
                                placeholder="Hotel Name"
                                name="hotelName"
                                value={managerData.hotelName}
                                onChange={handleInputChange}
                                className="input"
                            />
                        </div>
                        <div>

                            <h1 className="text-green-900 mb-2">Phone Number</h1>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                value={managerData.phone}
                                onChange={handleInputChange}
                                className="input"
                            />
                        </div>
                    </div>
                    <AddButton
                        apiEndpoint="http://localhost:5000/api/managers"
                        dataToAdd={managerData}
                        onSuccess={handleAddSuccess}
                    />
                </div>
            </div>
        )
    );
};

export default ManagerFormModal;
