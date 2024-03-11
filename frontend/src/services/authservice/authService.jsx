import axios from "axios";
import { toast } from "react-toastify";
//  const BACKEND_URL = 'http://localhost:5000';


//register user service
export const registerService = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/register',
            userData, { withCredentials: true });
        if (response.statusText === "ok") {
            toast.success("User Registered Successfully")
        }
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
    }
}

export const loginService = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', userData, { withCredentials: true });
        if (response.status >= 200 && response.status < 300) {
            // Return response data if the request was successful
            return response.data;
        } else {
            // Handle non-2xx status codes (e.g., 401 Unauthorized)
            throw new Error(response.statusText || 'Failed to login');
        }
    } catch (error) {
        // Handle network errors or other exceptions
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        throw new Error(message);
    }
};