import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

   return (
    <div className="bg-gray-50 p-4">
      {destination && (
        <div>
          <h1 className="text-3xl mb-2">{destination.name}</h1>
          <img src={destination.images.main} alt={destination.name} className="mb-4" />
          <div className="mb-2"><strong>Location:</strong> {destination.location.region}</div>
          <div className="mb-2"><strong>Category:</strong> {destination.category}</div>
          <div className="mb-2"><strong>Rating:</strong> {destination.ratings}</div>
          <p className="mb-4">{destination.description}</p>
          {/* Display more details here as needed */}
        </div>
      )}
    </div>
  );
};

export default DestinationDetail;
