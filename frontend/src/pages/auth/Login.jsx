import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import axios from 'axios';
import backgroundImage from "../../assets/ethiopia.png";

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            const { data } = response.data;
            // Handle successful login, e.g., save user data or token to localStorage
            console.log('Login successful', data);
            navigate('/user/dashboard'); // Navigate to dashboard after successful login
        } catch (error) {
            console.error('Login failed', error);
            // Handle login failure, e.g., display error message to the user
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-no-repeat bg-cover bg-center bg-transparent" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="w-full max-w-sm p-4 bg-green-100 border-4 border-white rounded-lg shadow-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <h2 className="text-center text-xl text-blue-600">Sign in to The system</h2>
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
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                id="password"
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
                    {/* remember and forgot */}
                    <div className="flex items-start">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                value=""
                                className="w-4 h-4 rounded"
                                required
                            />
                            <span className='px-2 text-slate-500'>Remember me</span>
                        </div>
                        <Link to="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                    {/* home and register links */}
                    <div className="text-sm">
                        <Link to="/" className="text-blue-700 hover:underline">Home</Link>
                        <span className='px-2 text-slate-600'>Don't have an account?</span>
                        <Link to="/auth/register" className="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
