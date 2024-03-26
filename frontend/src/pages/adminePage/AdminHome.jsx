import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import AdminDashboard from './AdminDashboard';
import AdminBooking from './AdminBooking';
import AdminHotel from './AdminHotel';
import AdminDestination from './AdminDestination';
import AdminTourist from './AdminTourist';
import AdminGuides from './AdminGuides';
import AdminCar from './AdminCar';
import { AdminSidebarData } from '../../data/Data';
import TopNav from '../../components/header/TopNav';
import { selectName } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';

const AdminHome = () => {

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    AdminSidebarData[0].link
  );
  const name = useSelector(selectName); 
  const handleMenuItemClick = (link) => {
    setSelectedMenuItem(link);
  };

  const renderPageContent = () => {
    switch (selectedMenuItem) {
      case "/admin/dashboard":
        return (
          <>
            <AdminDashboard />
          </>
        );
      case "/admin/bookings":
        return (
          <>
            <AdminBooking />
          </>
        );
      case "/admin/cars":
        return (
          <>
            <AdminCar />
          </>
        );
      case "/admin/hotels":
        return (
          <>
            <AdminHotel />
          </>
        );

      case "/admin/tourists":
        return (
          <>
            <AdminTourist />
          </>
        );
      case "/admin/guides":
        return (
          <>
            <AdminGuides />
          </>
        );
      case "/admin/destinations":
        return (
          <>
            <AdminDestination />
          </>
        );

      default:
        return null;
    }
  };
  return (
    <div className="flex bg-green-50 px-2">
      <Sidebar role="admin" onMenuItemClick={handleMenuItemClick} />
      <div className="flex flex-col w-full">
        <TopNav
          roleData={AdminSidebarData}
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

export default AdminHome;
