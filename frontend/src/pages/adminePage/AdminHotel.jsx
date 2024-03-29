import React, { useState } from "react";
import MyTable from "../../components/table/DataTable";
import ManagerFormModal from "../../components/managerformmodal/ManagerFormModal";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import axios from "axios";

const Managers = () => {
  const url = "http://localhost:5000/api/managers";
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    hotelName: "",
    phone: "",
    role: "hotelManager",
  });
  const handleEdit = (row) => {
    // Define the logic for handling the edit action
    console.log("Edit action clicked for row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete action clicked for row:", row);
    axios.delete(`${url}/${row.id}`)
      .then(response => {
        console.log("Deleted successfully:", response.data);
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200, sortable: true },
    { field: "name", headerName: "Name", sortable: true },
    { field: "email", headerName: "Email", width: 150,sortable: true },
    { field: "role", headerName: "Role",width: 150,sortable: true },
    { field: "phone", headerName: "Phone",width: 150, sortable: true },
    { field: "hotelName", headerName: "HotelName", sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center space-x-4">
          <HiPencilAlt
            onClick={() => handleEdit(params.row)}
            className="cursor-pointer text-green-500 text-2xl"
          />
          <HiTrash
            onClick={() => handleDelete(params.row)}
            className="cursor-pointer text-red-500 text-2xl"
          />
        </div>
      ),
    },
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
        <MyTable
          apiEndpoint="http://localhost:5000/api/managers"
          title="Hotel Managers"
          columns={columns}
          dataKey="hotelManagers"
        />
       {/* the laout */}
        {showModal && <div className="fixed inset-0 bg-slate-400 bg-opacity-50 z-40">
          <h1>try</h1>
          </div>}
    </div>
  );
};

export default Managers;

