import React from "react";
import MyTable from "../../components/table/DataTable";
import { HiTrash, HiEye } from "react-icons/hi"; // Importing HiTrash and HiEye icons

const AdminTourist = () => {
  const handleEdit = (row) => {
    // Define the logic for handling the edit action
    console.log("Edit action clicked for row:", row);
  };

  const handleDelete = (row) => {
    // Define the logic for handling the delete action
    console.log("Delete action clicked for row:", row);
  };

  const Usercolumns = [
    { name: "ID", selector: "id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Phone", selector: "phone", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <HiEye
            onClick={() => handleEdit(row)}
            className="cursor-pointer text-green-500 text-3xl"
          />
          <HiTrash
            onClick={() => handleDelete(row)}
            className="cursor-pointer text-red-500 text-3xl"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="MainTourist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-4">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <MyTable
              apiEndpoint="http://localhost:5000/api/users"
              title="Tourists"
              columns={Usercolumns}
              dataKey="users"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTourist;
