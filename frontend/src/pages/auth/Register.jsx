import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { name: username, email, password });
      const { data } = response.data;
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.user.name));
      toast.success("Registration successful");
      console.log(data);
      navigate("/auth/login"); // Navigate to login page after successful registration
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <div className="w-full max-w-sm p-4 bg-green-50 border-4 border-white rounded-lg shadow-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <h2 className="text-center text-xl text-blue-600">Sign in to The system</h2>
          <div>
            <label>Username</label>
            <input
              name="username"
              placeholder='User name'
              type="text"
              required
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              placeholder='example@gmail.com'
              type="email"
              required
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label >Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <HiEyeOff className="h-6 w-6 text-gray-500" /> : <HiEye className="h-6 w-6 text-gray-500" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <HiEyeOff className="h-6 w-6 text-gray-500" /> : <HiEye className="h-6 w-6 text-gray-500" />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Register </button>
          <div className="text-sm ">
            <Link to="/" className="text-blue-700 hover:underline">Home</Link>
            <span className='px-2 text-slate-600'>Have an account?</span>
            <Link to="/auth/login" className="text-blue-700 hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
