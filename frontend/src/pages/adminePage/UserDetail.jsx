import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
    const apiEndpoint = "http://localhost:5000/api/users";
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { role } = useParams();

    useEffect(() => {
        fetchData();
    }, [apiEndpoint]); // Re-fetch data when apiEndpoint changes

    const fetchData = async () => {
        try {
            const response = await axios.get(apiEndpoint);
            const allUsers = response.data.data.users || [];
            const filteredUsers = allUsers.filter(user => user.role === role);
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to filter users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-col bg-green-50">
            <div className="text-green-700 text-center bg-green-50 mt-3">
                <h1>the list of users of the system</h1>
            </div>
            <div className="px-32 my-4">
                <input
                    type="text"
                    className="input"
                    placeholder="Search User..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-24 gap-4">
                {filteredUsers.map(user => (
                    <div key={user.id} className="bg-white p-4 rounded-md shadow-md cursor-pointer">
                        <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                        <p className="text-gray-600 mb-2">{user.email}</p>
                        <p className="text-gray-600">{user.role}</p>
                        <p className="text-gray-600">{user.phone}</p>
                        <p className="text-gray-600">{user.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDetails;
