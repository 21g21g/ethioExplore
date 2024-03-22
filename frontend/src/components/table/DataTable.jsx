import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiTrash, HiEye } from "react-icons/hi"; // Importing HiTrash and HiEye icons

const MyTable = ({ apiEndpoint, title, columns, dataKey, handleEdit, handleDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Change the number of items per page as needed

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
          console.log(
            "Response data is not an array:",
            response.data.data[dataKey]
          );
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
    setCurrentPage(1); // Reset current page to 1 when searching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    ).length / itemsPerPage
  );

  return (
    <div className=" px-3 ">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by name"
            value={searchText}
            onChange={handleSearch}
            className="border rounded-md py-2 px-4 mb-4"
          />
          {currentItems.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.selector}
                        className="px-4 py-2 bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {column.name}
                      </th>
                    ))}
                    
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row) => (
                    <tr key={row.id} className="border-t">
                      {columns.map((column) => (
                        <td
                          key={column.selector}
                          className="px-4 py-2 text-sm text-gray-600"
                        >
                          {row[column.selector]}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <HiEye
                            onClick={() => handleEdit(row)}
                            className="cursor-pointer text-green-500 text-2xl"
                          />
                          <HiTrash
                            onClick={() => handleDelete(row)}
                            className="cursor-pointer text-red-500 text-2xl"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <nav className="inline-block">
                    <ul className="flex items-center">
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                          <button
                            className={`px-3 py-1 ${
                              currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                            } border border-blue-500 rounded-md mx-1 hover:bg-blue-200 hover:text-white focus:outline-none`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <div className="text-red-500">No records found</div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTable;
