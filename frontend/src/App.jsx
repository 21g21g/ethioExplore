import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Package from "./pages/packages/Package"
import Booking from "./pages/bookings/Booking"
import HotelHompage from "./pages/home/hotelHompage/HotelHompage"
import DestinationDetail from "./pages/destinations/DestinationDetail"
import Layouts from "./pages/layout/Layouts"
import Home from "./pages/home/Home"
import ListHotel from "./pages/hotels/listHotel/ListHotel"
import SingleHotelAvailability from "./pages/hotels/availabiltyhotels/SingleHotelAvailability"
import HotelAdmin from "./pages/hotels/hotelAdminPage/HotelAdmin"
import HotelDetail from "./pages/hotels/hoteldetail/HotelDetail"
import Roomadds from "./pages/hotels/hotelAdminPage/Roomadds"
import PrivateRoute from "./utils/privateRoute"
import AdminHome from "./pages/adminePage/AdminHome";
import UserHome from "./pages/userPage/UserHome";
import ManagerHome from "./pages/hotelManager/ManagerHome";
import UserDetails from "./pages/adminePage/UserDetail";
import { ToastContainer } from "react-toastify"
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<HotelHompage />} />
          <Route path="packages" element={<Package />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="destinations" element={<DestinationDetail />} />
        </Route>
        <Route path="admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="admin/users/:role" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
        <Route path="user" element={<PrivateRoute><UserHome /></PrivateRoute>} />
        <Route path="hotelmanager" element={<PrivateRoute><ManagerHome /></PrivateRoute>} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/hotellist" element={<ListHotel />} />
        <Route path="/hotels/:id" element={<SingleHotelAvailability />} />
        <Route path="/hoteladmin" element={<HotelAdmin />} />
        <Route path="/roomnumbers" element={<Roomadds />} />
        <Route path="/hoteldetail" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
