import React from "react";
import MyTable from "../../components/table/DataTable";
import { HiTrash, HiPencilAlt } from "react-icons/hi"; // Importing HiTrash and HiPencilAlt icons
import axios from "axios";

const AdminTourist = () => {
  const handleEdit = (row) => {
    // Define the logic for handling the edit action
    console.log("Edit action clicked for row:", row);
  };

  const handleDelete = (row) => {
    // Define the logic for handling the delete action
    console.log("Delete action clicked for row:", row);
    // Example of deletion logic with axios
    axios.delete(`http://localhost:5000/api/users/${row.id}`)
      .then(response => {
        console.log("Deleted successfully:", response.data);
        // Optionally, you can perform additional actions after deletion
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        // Optionally, you can handle error cases
      });
  };

  const columnData = [
    { name: "ID", selector: "id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true },
    { name: "Role", selector: "role", sortable: true },
    { name: "Phone", selector: "phone", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          <HiPencilAlt
            onClick={() => handleEdit(row)}
            className="cursor-pointer text-green-500 text-2xl"
          />
          <HiTrash
            onClick={() => handleDelete(row)}
            className="cursor-pointer text-red-500 text-2xl"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white border rounded-md border-green-100 shadow-md">
      <MyTable
        apiEndpoint="http://localhost:5000/api/users"
        title="Tourists"
        columns={columnData}
        dataKey="users"
      />
    </div>
  );
};

export default AdminTourist;
