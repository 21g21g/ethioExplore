import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectName, selectUser, setLogin } from "../../redux/features/auth/authSlice"; // Import selectors and actions
import { HiOutlineUserCircle } from "react-icons/hi"; // Import user icon
import { IoMdLogOut } from "react-icons/io"; // Import logout icon

const UserDashboard = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName); // Get user's name from Redux store
  const user = useSelector(selectUser); // Get user information from Redux store
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can implement saving the user preference in local storage or redux store here
  };

  // Function to handle logout
  const handleLogout = () => {
    dispatch(setLogin(false)); // Dispatch action to set isLoggedIn to false
    // You can implement clearing user data from local storage or redux store here
  };

  return (
    <div className={`container mx-auto ${darkMode ? 'dark' : 'light'}`}>
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-green-600">Welcome, {name}</h1>
          <div className="ml-4 flex items-center">
            <span className="mr-2 text-gray-600 dark:text-gray-400">Dark Mode</span>
            <label className="switch relative">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="relative">
          <HiOutlineUserCircle className="text-3xl text-green-600 cursor-pointer" />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Profile
              </button>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard content goes here */}
    </div>
  );
};

export default UserDashboard;
