import React from "react";
import MyTable from "../../components/table/DataTable";
import { HiTrash, HiPencilAlt } from "react-icons/hi";
import axios from "axios";

const AdminTourist = () => {
  const url = "http://localhost:5000/api/users";

  const handleEdit = (row) => {
    // Define the logic for handling the edit action
    console.log("Edit action clicked for row:", row);
  };

  const handleDelete = (row) => {
    // Define the logic for handling the delete action
    console.log("Delete action clicked for row:", row);
    axios.delete(`${url}/${row.id}`)
      .then(response => {
        console.log("Deleted successfully:", response.data);
        // Optionally, you can perform additional actions after deletion
      })
      .catch(error => {
        console.error("Error deleting user:", error);
        // Optionally, you can handle error cases
      });
  };

  const columns = [
    { field: "id", headerName: "ID", sortable: true },
    { field: "name", headerName: "Name", sortable: true },
    { field: "email", headerName: "Email", sortable: true },
    { field: "role", headerName: "Role", sortable: true },
    { field: "phone", headerName: "Phone", sortable: true },
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

  return (
    <>
      <MyTable
        apiEndpoint={url}
        title="Tourists"
        columns={columns}
        dataKey="users"
      />
      <div>
        <h1>the most frequent user</h1>
      </div>
    </>

  );
};

export default AdminTourist;
