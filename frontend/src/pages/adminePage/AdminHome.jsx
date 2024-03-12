import React, { useState } from 'react';
import AdminTopNav from '../../components/header/AdminTopNav'; // Import the AdminTopNav component
import Sidebar from '../../components/sidebar/Sidebar'; // Import the Sidebar component
import AdminDashboard from './AdminDashboard'; // Import your AdminDashboard component
import AdminBooking from './AdminBooking'; // Import your AdminBooking component
import AdminHotel from './AdminHotel'; // Import your AdminHotel component
import AdminDestination from './AdminDestination'; // Import your AdminDestination component
import AdminTourist from './AdminTourist'; // Import your AdminTourist component
import AdminGuides from './AdminGuides'; // Import your AdminGuides component
import AdminCar from './AdminCar'; // Import your AdminCar component

const AdminHome = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('/admin/dashboard');

  const renderComponent = (link) => {
    setSelectedMenuItem(link);
  };

  const toggleSidebar = () => {
    // Toggle the sidebar visibility
    // You can implement the logic to toggle the sidebar here
  };

  return (
    <div className="flex bg-green-100">
      <Sidebar role="admin" onMenuItemClick={renderComponent} />
      <div className="flex flex-col w-full">
        <AdminTopNav onMenuToggle={toggleSidebar} renderComponent={renderComponent} />
        <div className='bg-green-50 pl-3 m-4 border-white border-2 rounded-md'>
          <h1>{selectedMenuItem}</h1>
        </div>
        <div className="">
          {selectedMenuItem === '/admin/dashboard' && <AdminDashboard />}
          {selectedMenuItem === '/admin/bookings' && <AdminBooking />}
          {selectedMenuItem === '/admin/hotels' && <AdminHotel />}
          {selectedMenuItem === '/admin/destinations' && <AdminDestination />}
          {selectedMenuItem === '/admin/tourists' && <AdminTourist />}
          {selectedMenuItem === '/admin/guides' && <AdminGuides />}
          {selectedMenuItem === '/admin/cars' && <AdminCar />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
