
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Package from "./pages/packages/Package"
import Booking from "./pages/bookings/Booking"
import HotelHompage from "./pages/home/hotelHompage/HotelHompage"
import Destination from "./pages/destinations/Destination"
import Layouts from "./pages/layout/Layouts"
import Home from "./pages/home/Home"
import UserDashboard from "./pages/userPage/UserDashboard"
import ListHotel from "./pages/hotels/listHotel/ListHotel"
import SingleHotelAvailability from "./pages/hotels/availabiltyhotels/SingleHotelAvailability"
import HotelAdmin from "./pages/hotels/hotelAdminPage/HotelAdmin"
import HotelReserved from "./pages/hotels/hotelreserved/HotelReserved"
import HotelDetail from "./pages/hotels/hoteldetail/HotelDetail"
import Roomadds from "./pages/hotels/hotelAdminPage/Roomadds"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="/hotels" element={<HotelHompage />} />
          <Route path="packages" element={<Package />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="destinations" element={<Destination />} />
        </Route>
        <Route path="/user">
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/hotellist" element={<ListHotel />} />
        <Route path="/hotels/:id" element={<SingleHotelAvailability />} />
        <Route path="/hoteladmin" element={<HotelAdmin />} />
        <Route path="/roomnumbers" element={<Roomadds/>}/>
        <Route path="/hotels/room/:id" element={<HotelReserved />} />
        <Route path="/hoteldetail" element={<HotelDetail />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App