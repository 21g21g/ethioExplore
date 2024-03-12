
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import backgroundImage from "../../assets/ethiopian1.png";
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/validateEmail';
import { loginService } from '../../services/authservice/authService';
import { setLogin, setName } from '../../redux/features/auth/authSlice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { email, password, } = formData;
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Please fill all fields");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        setIsLoading(true);
        try {
            const data = await loginService({ email, password });

            dispatch(setLogin(true));

            // Extract role from the user data returned in the response
            const userRole = data.data.user.role;

            if (userRole === 'admin') {
                navigate("/admin");
            } else if (userRole === 'tourGuide') {
                navigate("/tourGuide");
            } else if (userRole === 'user') {
                navigate("/user/dashboard");
            } else if (userRole === 'hotel') {
                navigate("/hotel");
            } else {
                navigate("/"); // Default route for unrecognized roles
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Invalid credentials");
            } else {
                toast.error(error.message); // Display the generic error message
            }
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div className='min-h-screen bg-gree pt-10 px-10 items-center bg-green-100 '>
            <div className='flex flex-col md:flex-row h-full w-full bg-green-50  border-white border-2 rounded-2xl shadow-lg shadow-green-500'>
                <div className='w-full md:w-1/2 bg-center bg-cover bg-no-repeat py-5 px-3 rounded-l-2xl' style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <h1 className='text-center text-3xl text-white'>Welcome to Ethio Explore System</h1>
                </div>
                <div className='md:w-1/2 py-10 md:py-20 px-6 md:px-36 border-white border-2  rounded-r-2xl'>
                    <h2 className="text-center text-2xl pb-10 text-green-900">Sign in to The system</h2>
                    <form className="space-y-3" onSubmit={handleSubmit}>
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
                            <label htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input"
                                    value={password}
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
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value=""
                                className="w-4 h-4 rounded" />
                            <span className='px-2 text-slate-500'>Remember me</span>
                            <Link to="#" className="ml-auto text-sm text-green-700 hover:underline dark:text-blue-500">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                        <div className="text-sm flex justify-center items-center pt-10">
                            <Link to="/" className="text-green-500 hover:underline">Home</Link>
                            <span className='px-2 text-slate-900'>Don't have an account?</span>
                            <Link to="/auth/register" className=" text-green-500 hover:underline">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
















