import React, { useState } from "react";
import MyTable from "../../components/table/DataTable";
import ManagerFormModal from "../../components/managerformmodal/ManagerFormModal";

const Managers = () => {
  const url="http://localhost:5000/api/managers";
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    hotelName: "",
    phone: "",
    role: "hotelManager",
  });

  const columnData = [
    { name: "ID", selector: "id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Hotel Name", selector: "hotelName", sortable: true },
    { name: "Phone", selector: "phone", sortable: true },

  ];

  const handleManager = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally, reset managerData state here
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSuccess = () => {
    handleCloseModal();
    // Optionally, perform any success actions here
  };

  return (
    <div className="p-4">
      <ManagerFormModal
        url={url}
        isOpen={showModal}
        onClose={handleCloseModal}
        userData={userData}
        handleInputChange={handleInputChange}
        handleAddSuccess={handleAddSuccess}
      />

      {!showModal && (
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none"
            onClick={handleManager}
          >
            Add Manager
          </button>
        </div>
      )}
      <div className="p-6 bg-white border rounded-md border-green-100 shadow-md relative">
        <MyTable
          apiEndpoint="http://localhost:5000/api/managers"
          title="Hotel Managers"
          columns={columnData}
          dataKey="hotelManagers"
        />
        {showModal && <div className="fixed inset-0 bg-slate-400 bg-opacity-50 z-40"></div>}
      </div>
    </div>
  );
};

export default Managers;

