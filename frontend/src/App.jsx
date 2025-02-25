import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Package from "./pages/packages/Package"
import Booking from "./pages/bookings/Booking"
import HotelHompage from "./pages/home/hotelHompage/HotelHompage"
// import DestinationDetail from "./pages/destinations/Destinations"
import CityDetail from './pages/hotels/citydetail/CityDetail';
import Destinations from './pages/destinations/Destinations';
import Layouts from "./pages/layout/Layouts"
import Home from "./pages/home/Home"
import ListHotel from "./pages/hotels/listHotel/ListHotel"
import SingleHotelAvailability from "./pages/hotels/availabiltyhotels/SingleHotelAvailability"

import PrivateRoute from "./utils/privateRoute"
import AdminHome from "./pages/adminePage/AdminHome";
import UserHome from "./pages/userPage/UserHome";
import ManagerHome from "./pages/hotelManager/ManagerHome";
import UserDetails from "./pages/adminePage/UserDetail";
import { ToastContainer } from "react-toastify"
import RegionDetails from './pages/destinations/view/RegionDetails';
import AllDestinations from './pages/destinations/view/AllDestinations';
import TopDestinations from './pages/destinations/view/TopDestinations';
import DestinationDetail from './pages/destinations/view/DestinationDetail';
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
          <Route path="destinations" element={<Destinations />} />
          <Route path="destinations/region/:region" element={<RegionDetails />} />
        </Route>
        <Route path="admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="admin/users/:role" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
        <Route path="user" element={<PrivateRoute><UserHome /></PrivateRoute>} />
        <Route path="hotelmanager" element={<PrivateRoute><ManagerHome /></PrivateRoute>} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/" element={<AllDestinations />} />
        <Route path="/" element={<TopDestinations />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/hotellist" element={<ListHotel />} />
        <Route path="/hotels/:id" element={<SingleHotelAvailability />} />
        <Route path='/hotels/city/:city' element={<CityDetail/>}/>
        
      </Routes>
    </BrowserRouter>
  );
};


export default App;
