import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations?top=5');
        if (!response.ok) throw new Error('Data fetching failed');
        const data = await response.json();
        setDestinations(data.data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error.message);
      }
    };

    fetchTopDestinations();
  }, []);
 
  return (
    <div className="bg-gray-50 h-auto mt-12 p-4">
      <h1 className="text-3xl mb-4 text-custom-green1 font-serif">Top Destinations By Their Ratings</h1>
      <div className="flex flex-wrap justify-center">
        {destinations.map((destination, index) => (
       <div
            key={destination._id}
            className={`rounded overflow-hidden shadow-lg m-2 relative md:h-[300px] h-auto cursor-pointer`}
             onClick={() => navigate(`/destination/${destination._id}`)}
            style={{
              width: index < 2 ? 'calc(50% - 1rem)' : 'calc(33.333% - 1rem)',
              display: "flex",
              justifyContent: "center",
              alignItems:"center",
              }}
          >
            <img
              className="w-full h-full object-cover"
              src={destination.images.main}
              alt={destination.name}
            />
            <div className="absolute top-2 left-1 text-white p-2 text-xl font-bold font-serif">
              {destination.name}
            </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;
