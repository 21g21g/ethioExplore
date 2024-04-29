import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Importing icons

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const initialVisibleDestinations = 4;
  const [visibleDestinations, setVisibleDestinations] = useState(initialVisibleDestinations);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations');
        if (!response.ok) throw new Error('Data fetching failed');
        const data = await response.json();
        setDestinations(data.data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error.message);
      }
    };

    fetchAllDestinations();
  }, []);

  const toggleDestinationsView = () => {
    setVisibleDestinations(visibleDestinations === initialVisibleDestinations ? destinations.length : initialVisibleDestinations);
  };

  const handleCardClick = (id) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div className=" h-auto mt-12 p-4">
      <div className='items-center justify-center text-center flex-col lg:mx-20 lg:my-10'>
        <h1 className="text-6xl mb-4 text-custom-green1 font-serif">Explore Amazing Place</h1>
        <p className='text-slate-300'> discover a range of vacation places in Ethiopia which have very intere
          sting attraction places most of the worlds admire and stay along over there</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {destinations.slice(0, visibleDestinations).map((destination) => (
          <div
            key={destination._id}
            className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
            onClick={() => handleCardClick(destination._id)}
          >
            <img className="w-full" src={destination.images.main} alt={destination.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{destination.name}</div>
              <div className='font-semibold'>Found in: {destination.location.region} region</div>
              <div className='font-semibold'>Ratings: {destination.ratings}</div>
            </div>
          </div>
        ))}
      </div>

        <h1
          onClick={toggleDestinationsView}
          className="mt-4 px-4 py-2 text-gray-500 text-end rounded transition duration-200 text-2xl cursor-pointer underline"
        >
          {visibleDestinations > initialVisibleDestinations ? (
            <>
              Show Less <FaAngleUp size={30} color='red' className='items-end' /> {/* Arrow pointing up when showing less */}
            </>
          ) : (
            <>
              See All <FaAngleDown size={30} color='green'/> {/* Arrow pointing down when showing all */}
            </>
          )}
        </h1>
      </div>
  );
};

export default AllDestinations;
