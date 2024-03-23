import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { HiTrash, HiEye } from "react-icons/hi";

const MyTable = ({ apiEndpoint, title, columns, dataKey, handleEdit, handleDelete }) => {
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
          console.log("Response data is not an array:", response.data.data[dataKey]);
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

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by name"
              value={searchText}
              onChange={handleSearch}
              className="border rounded-md py-2 px-4"
            />
            <h2 className="text-green-700 text-xl font-semibold mb-4">{title}</h2>
            <button className="border rounded-md py-2 px-4 mr-2 text-white bg-green-400">Add User</button>
          </div>
          {filteredData.length > 0 ? (
            <DataTable
              className="data-table"
              title={title}
              columns={columns.map(column => ({
                name: column.name,
                selector: column.selector,
                sortable: true,
                cell: row => <div>{row[column.selector]}</div>,
                sortFunction: (a, b) => {
                  if (a[column.selector] < b[column.selector]) return -1;
                  if (a[column.selector] > b[column.selector]) return 1;
                  return 0;
                }
              }))}
              data={filteredData}
              pagination
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              highlightOnHover
              striped
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id])
                  .toLowerCase()
                  .includes(filter.value.toLowerCase())
              }
              style={{ height: "400px" }}
              paginationComponentOptions={{
                rowsPerPageText: "Rows:",
                rangeSeparatorText: "of",
                noRowsPerPage: false,
                selectAllRowsItem: false,
                selectAllRowsItemText: "All",
              }}
            />
          ) : (
            <div>No records found</div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTable;
