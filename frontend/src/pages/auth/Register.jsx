
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import backgroundImage from "../../assets/ethiopian1.png";
import { validateEmail } from '../../utils/validateEmail';
import { registerService } from '../../services/authservice/authService';
import { setLogin, setName } from '../../redux/features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = formData;
  const [isLoading, setIsLoading] = useState(false);

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
    if (!name || !email || !password) {
      return toast.error("Please fill all fields")
    }

    if (password.length < 6) {
      return toast.error("Passwords Not less than 6 characters")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")

    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)
    try {
      const data = await registerService(userData)
      dispatch(setLogin(true));
      if (data && data.name) {
        dispatch(setName(data.name));
      } else {
        // Handle the case where 'name' property is not present in the data object
      }
      navigate("/auth/login");
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
    }

  };

  return (
    <div className='min-h-screen bg-green-50 py-6 px-6'>
      <div className='min-w-screen mx-auto'>
        <div className='flex flex-col md:flex-row h-full w-full  border-white border-2   bg-green-50  rounded-2xl shadow-md shadow-green-200'>
          <div className='md:w-1/2 bg-center bg-cover rounded-l-2xl bg-no-repeat px-3 pt-5  ' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className='text-center text-3xl text-white'>Welcome to Ethio Explore System</h1>
          </div>
          <div className='md:w-1/2 py-10 md:py-20  md:px-36  border-2  rounded-r-2xl border-white '>
            <h2 className="text-center text-xl text-green-600">Sign Up To The System</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  name="name"
                  placeholder='Name'
                  type="text"
                  className="input"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  name="email"
                  placeholder='example@gmail.com'
                  type="email"
                  className="input"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label >Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="input"
                    value={password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <HiEyeOff className="h-6 w-6 text-gray-500" />
                     : <HiEye className="h-6 w-6 text-gray-500" />}
                  </button>
                </div>
              </div>
              <div>
                <label >Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <HiEyeOff className="h-6 w-6 text-gray-500" /> 
                    : <HiEye className="h-6 w-6 text-gray-500" />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Register </button>
              <div className="text-sm ">
                <Link to="/" className="text-green-500 hover:underline">Home</Link>
                <span className='px-2 text-slate-900'>Have an account?</span>
                <Link to="/auth/login" className="text-green-500 hover:underline">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
