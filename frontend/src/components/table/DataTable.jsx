import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const MyTable = ({ apiEndpoint, title, columns, dataKey }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(apiEndpoint)
      .then((response) => {
        if (Array.isArray(response.data.data[dataKey])) {
          const updatedData = response.data.data[dataKey].map((item) => {
            const { _id, ...rest } = item;
            return {
              ...rest,
              id: _id,
            };
          });
          setData(updatedData);
        } else {
          console.log("Response data is not an array:", response.data[dataKey]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [apiEndpoint, dataKey]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };


  return (
    <div className="bg-white border rounded-md shadow-md h-auto">
      <div className="p-6">
        <div className="flex gap-1">

          <h2 className="text-xl font-semibold text-green-500 mb-4">{title}</h2>
          <h1 className="text-xl font-semibold text-green-900 mb-4">:{data.length}</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="p-6">Loading...</div>
      ) : data.length > 0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          slotProps={{

            toolbar: {
              showQuickFilter: true
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          pageSizeOptions={[5, 10, 15]} />

      ) : (
        <div className="p-6 text-red-500">No records found</div>
      )}
    </div>
  );
};

export default MyTable;
