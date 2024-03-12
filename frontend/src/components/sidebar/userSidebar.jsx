// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { RiHotelBedFill, RiDashboardFill, RiCalendar2Fill, RiMapPin2Fill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="h-full w-24 flex flex-col items-center justify-between bg-green-600 py-4">
      <div className="flex flex-col items-center">
        <NavLink to="/dashboard" activeClassName="text-yellow-500">
          <RiDashboardFill size={30} />
          <span className="text-xs text-white mt-1">Dashboard</span>
        </NavLink>
        <NavLink to="/bookings" activeClassName="text-yellow-500">
          <RiCalendar2Fill size={30} />
          <span className="text-xs text-white mt-1">Bookings</span>
        </NavLink>
        <NavLink to="/hotels" activeClassName="text-yellow-500">
          <RiHotelBedFill size={30} />
          <span className="text-xs text-white mt-1">Hotels</span>
        </NavLink>
        <NavLink to="/destinations" activeClassName="text-yellow-500">
          <RiMapPin2Fill size={30} />
          <span className="text-xs text-white mt-1">Destinations</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
