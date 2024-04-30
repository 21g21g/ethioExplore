import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/destinations/${id}`);
        if (!response.ok) throw new Error('Failed to fetch destination details');
        const data = await response.json();
        setDestination(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]); // Dependency array includes id to refetch if it changes

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/initiate-payment');
      const checkoutUrl = response.data.checkout_url;
      window.location.href = checkoutUrl; // Redirect to Chapa checkout page
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="bg-gray-50 p-4 flex">
      {destination && (
        <div className='border mx-4 p-6 bg-white rounded-md'>
          <h1 className="text-3xl mb-2">{destination.name}</h1>
          <img src={destination.images.main} alt={destination.name} className="mb-4 destination-image" />
          <div className='flex gap-16'>
            <div className="mb-2 text-custom-green2"><strong>Location:</strong> {destination.location.region}</div>
            <div className="mb-2 text-custom-green2"><strong>Category:</strong> {destination.category}</div>
          </div>
          <div className="mb-2 text-custom-green2"><strong>Rating:</strong> {destination.ratings}</div>
          <p className="mb-4 sm:pr-20 font-serif">{destination.description}</p>
          <button className='bg-green-500 hover:bg-green-700 rounded-md p-2 text-white font-serif text-center w-full' onClick={handleBooking}>Book</button>
        </div>
      )}
      <div className='md:w-2/6 h-[600px] bg-white border rounded-md flex items-center justify-center md:mt-32'>
        <h1 className="text-green-500 text-center text-2xl">Map</h1>
        {/* <Map items={filteredDestinations} /> */}
      </div>
    </div>
  );
};

export default DestinationDetail;
