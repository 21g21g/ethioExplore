import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { HiTrash, HiEye } from "react-icons/hi";

const MyTable = ({ apiEndpoint, title, columns, dataKey, }) => {
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
    <div className=" p-3">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
           <div className="flex flex-col lg:flex-row items-center justify-between ">
            <h2 className="text-green-500 text-xl font-semibold mb-4 lg:mb-0">{title}</h2>
              <input
                type="text"
                placeholder="Search by name"
                value={searchText}
                onChange={handleSearch}
                className="input w-2/5"
              />
          </div>
          {filteredData.length > 0 ? (
            <DataTable
              className="data-table"
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
              selectableRows
              pagination
              paginationPerPage={5}
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
            <div className="text-red-500">No records found</div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTable;
