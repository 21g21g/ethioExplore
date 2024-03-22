import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

import {  UserSidebarData } from '../../data/Data';
import TopNav from '../../components/header/TopNav';
import { selectName } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import UserDashboard from './UserDashboard';
import UserBookings from './UserBookings';
import UserHotels from './UserHotels';
import UserPackages from './UserPackages';

const UserHome = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    UserSidebarData[0].link
  );
  const name = useSelector(selectName); 
  const handleMenuItemClick = (link) => {
    setSelectedMenuItem(link);
  };

  const renderPageContent = () => {
    switch (selectedMenuItem) {
      case "/user/dashboard":
        return (
          <>
            <UserDashboard />
          </>
        );
      case "/user/bookings":
        return (
          <>
            <UserBookings />
          </>
        );
     
      case "/user/hotels":
        return (
          <>
            <UserHotels />
          </>
        );


      case "/user/packages":
        return (
          <>
            <UserPackages />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex bg-green-100">
      <Sidebar role="user" onMenuItemClick={handleMenuItemClick} />
      <div className="flex flex-col w-full">
        <TopNav
          roleData={UserSidebarData}
          onMenuToggle={() => console.log("Menu toggled")} // Example function for menu toggle
          onMenuClick={handleMenuItemClick}
          searchPlaceholder="Search..."
          userName={name} // Example user name
        />
        <div className='bg-green-50 pl-3 m-4 border-white border-2 rounded-md'>
          <h1>{selectedMenuItem}</h1>
        </div>
        <div className="bg-green-50 pl-3 m-4 border-white border-2 rounded-md">
          <h1>this is the contents</h1>
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
