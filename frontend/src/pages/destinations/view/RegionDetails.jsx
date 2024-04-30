import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { MdCategory, MdLocationCity, MdOutlineLocationOn } from 'react-icons/md';
import Map from '../../../components/map/Map';

const RegionDetails = () => {
  const [destinations, setDestinations] = useState([]);
  const { region } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter(destination =>
    (selectedCategory === "" || destination.category === selectedCategory) &&
    destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const fetchDestinationsByRegion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/destinations/region/${region}`);
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Error fetching destinations by region", error);
      }
    };

    fetchDestinationsByRegion();
  }, [region]);

  return (
    <div className='flex flex-col md:flex-row px-4 md:px-20 gap-3 '>
      <div className='md:w-4/6'>
        <div className='py-6 mb-4 text-custom-green1 text-4xl  font-serif text-center'>
          <h1>Destinations Found In {region}</h1>
        </div>
        <div className="search-and-filter">
          <input
            type="text"
            placeholder="Search destinations in this region"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown ">
            <option value="">All Categories</option>
            <option value="National">National</option>
            <option value="International">International</option>
            <option value="Cultural">Cultural</option>
            <option value="Religious">Religious</option>
          </select>
        </div>
        <div className="overflow-y-auto max-w-5xl mx-auto">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => (
              <div key={dest._id} className="py-4 px-10 border rounded-lg bg-white my-4">
                <h2 className="text-2xl font-bold mb-2">{dest.name} - {dest.category}</h2>
                <img src={dest.images.main} alt={dest.name} className="main-image" />
                <div className='flex items-center justify-between'>

                  <div className="flex items-center text-sm mb-2">
                    <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.96 0 1.357 1.236.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.77-.574-.372-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                    <p className="text-green-400">Rating: <span className="font-semibold">{dest.ratings}</span></p>
                  </div>

                  <div className="flex items-center text-sm mb-2">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4m10 4v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2zM7 13h10m-5 0v6" /></svg>
                    <p className="text-green-400">Region: <span className="font-semibold">{dest.location.region}</span></p>
                  </div>
                </div>
                <div className='flex items-center justify-between'>

                  <div className="flex items-center text-sm mb-2 gap-2">
                    <MdCategory className='text-green-500 text-2xl' />
                    <p className="text-green-400">Category: <span className="font-semibold">{dest.category}</span></p>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                    <Link className='flex' >
                    <MdOutlineLocationOn className='text-red-500 text-2xl'/>
                    <p className="text-green-400">Address: <span className="font-semibold">{dest.location.address}</span></p>
                    </Link>
                  </div>
                </div>

                <p className="mb-2">{dest.description}</p>

                <button className="text-white w-full bg-green-500 rounded-md hover:bg-green-700  p-2" type="button">Book Now</button>
              </div>
            ))
          ) : (
            <div className="p-20 text-red-500">No destinations found.</div>
          )}
        </div>
      </div>
  
      <div className='md:w-2/6 h-[600px] bg-white border rounded-md flex items-center justify-center md:mt-32'>
        <h1 className="text-green-500 text-center text-2xl">Map</h1>
        {/* <Map items={filteredDestinations} /> */}
      </div>
    </div>
  );


};

export default RegionDetails;
