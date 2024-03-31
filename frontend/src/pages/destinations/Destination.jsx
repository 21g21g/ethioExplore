import React, { useState } from 'react';
import ethiopianDestinations from '../../data/DestinationData'; // Assuming you have a file with destination data

const Destination = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredDestinations = ethiopianDestinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || destination.category === selectedCategory)
    );
  });

  const popularDestinations = filteredDestinations.slice(0, 3); // Display top 3 popular destinations

  return (
    <div className="p-8 bg-green-50">
      <h1 className="text-3xl font-bold mb-8">Explore Ethiopian Destinations</h1>

      {/* Search and Category Filter */}
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search destinations"
          value={searchTerm}
          onChange={handleSearchChange}
          className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(event) => handleCategoryChange(event.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Historical">Historical</option>
          <option value="Natural">Natural</option>
          <option value="Cultural">Cultural</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Popular Destinations */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Destinations */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destination;
