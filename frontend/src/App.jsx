import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Package from "./pages/packages/Package";
import Hotel from "./pages/hotels/Hotel";
import Booking from "./pages/bookings/Booking";
import Destination from "./pages/destinations/Destination";
import Layouts from "./pages/layout/Layouts";
import Home from "./pages/home/Home";
import UserDashboard from "./pages/userPage/UserDashboard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/privateRoute";
import { selectIsLoggedIn } from "./redux/features/auth/authSlice";
import UserBookings from "./pages/userPage/UserBookings";
axios.defaults.withCredentials = true;

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Assuming you have a selector named selectIsLoggedIn

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotel />} />
          <Route path="packages" element={<Package />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="destinations" element={<Destination />} />
        </Route>
        <Route path="user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute> } />
        <Route path="user/bookings" element={<PrivateRoute><UserBookings /></PrivateRoute> } />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
