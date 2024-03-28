import React, { useState } from 'react';
import {  ManagerSidebarData } from '../../data/Data';
import { selectName } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import Dashboard from "./Dashboard"
import Rooms from "./Dashboard"
import Guests from "./Guests"
import Bookings from "./Bookings"
import TopNav from '../../components/header/TopNav';
import Sidebar from '../../components/sidebar/Sidebar';
const ManagerHome = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    ManagerSidebarData[0].link
  );
  const name = useSelector(selectName); 
  const handleMenuItemClick = (link) => {
    setSelectedMenuItem(link);
  };

  const renderPageContent = () => {
    switch (selectedMenuItem) {
      case "/hotelmanager/dashboard":
        return (
          <>
            <Dashboard />
          </>
        );
      case "/hotelmanager/bookings":
        return (
          <>
            <Bookings />
          </>
        );
      case "/hotelmanager/rooms":
        return (
          <>
            <Rooms />
          </>
        );

      case "/hotelmanager/guests":
        return (
          <>
            <Guests />
          </>
        );

      default:
        return null;
    }
  };
  return (
    <div className="flex bg-green-50 px-2">
      <Sidebar role="hotelManager" onMenuItemClick={handleMenuItemClick} />
      <div className="flex flex-col w-full">
        <TopNav
          roleData={ManagerSidebarData}
          onMenuToggle={() => console.log("Menu toggled")} // Example function for menu toggle
          onMenuClick={handleMenuItemClick}
          searchPlaceholder="Search..."
          userName={name }
        />
        {/* <div className='bg-white p-3 m-4 border-white border-2 rounded-md shadow-md'>
          <h1 className='text-green-500 '>{selectedMenuItem}</h1>
        </div> */}
        <div className=" m-4 ">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;
