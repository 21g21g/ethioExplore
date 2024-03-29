import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SmallCard = ({ icon, linkTo, linkText, title, role, apiEndpoint }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]); // Re-fetch data when apiEndpoint changes

  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      const users = response.data.data.users || [];
      const filteredUsers = users.filter(user => user.role === role);
      setCount(filteredUsers.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="bg-white p-2 shadow-md rounded-md flex-col gap-y-2 justify-center items-center">
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-green-900">{title}</h3>
        <div className="text-xl font-bold text-green-900">{count}</div>
      </div>
      <div className="flex items-center justify-between mt-2 px-2">
        <Link to={`/admin/users/${role}`} className="text-green-500 underline">
          {linkText}
        </Link>
        {icon}
      </div>
    </div>
  );
};

export default SmallCard;
