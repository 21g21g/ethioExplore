import React, { useEffect, useState } from 'react';

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // fetch top destinations
    const fetchTopDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations?top=8');
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
    <div className="bg-green-400 h-auto mt-8 p-4 text-red-700">
      <h1 className="text-2xl font-bold text-center mb-4 text-custom-yellow1">Top Destinations By Their Ratings</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((destination) => (
          <div key={destination._id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={destination.images.main} alt={destination.name} />
            <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{destination.name}</div>
                    <div className='font-semibold'>Found in: {destination.location.region}</div>
                    <div className='font-semibold'>Ratings: {destination.ratings}</div>
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;
