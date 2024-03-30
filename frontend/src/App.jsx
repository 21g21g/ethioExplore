import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Package from "./pages/packages/Package"
import Hotel from "./pages/hotels/Hotel"
import Booking from "./pages/bookings/Booking"
import DestinationDetail from "./pages/destinations/DestinationDetail"
import Layouts from "./pages/layout/Layouts"
import Home from "./pages/home/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotel />} />
          <Route path="packages" element={<Package />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="destinations" element={<DestinationDetail />} />
        </Route>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App