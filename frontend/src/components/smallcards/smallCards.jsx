import React from "react";
import { Link } from "react-router-dom";

const SmallCard = ({ icon, title, value, linkTo, linkText }) => {
  return (
    <div className="bg-white p-2 shadow-md rounded-md flex-col gap-y-2 justify-center items-center">
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-green-500">{title}</h3>
        <div className="text-xl font-bold text-green-500">{value}</div>
      </div>
      <div className="flex items-center justify-between mt-2 px-4">
        <Link to={linkTo} className="text-green-500 underline">
          {linkText}
        </Link>
        {icon}
      </div>
    </div>
  );
};

export default SmallCard;
