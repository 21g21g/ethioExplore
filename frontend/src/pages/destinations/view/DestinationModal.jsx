import React, { useState } from 'react';

const DestinationModal = ({ isOpen, closeModal, destinations }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredDestinations = destinations.filter(destination => 
    selectedCategory === "" || destination.category === selectedCategory
  );

  return isOpen ? (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>x</button>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown">
          <option value="">All Categories</option>
          <option value="National">National</option>
          <option value="International">International</option>
          <option value="Cultural">Cultural</option>
          <option value="Religious">Religious</option>
        </select>
        <div className="overflow-y-auto max-h-[90vh]">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest) => (
              <div key={dest._id} className="modal-content p-4">
                <h2 className="text-2xl font-bold mb-2">{dest.name} - {dest.category}</h2>
                <img src={dest.images.main} alt={dest.name} className="modal-image" />
                
                <div className="flex items-center text-sm ml-5">
                  <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.96 0 1.357 1.236.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.77-.574-.372-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                  <p className="text-green-400">Rating: <span className="font-semibold">{dest.ratings}</span></p>
                </div>

                <div className="flex items-center text-sm mb-1 ml-5">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4m10 4v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2zM7 13h10m-5 0v6" /></svg>
                  <p className="text-green-400">Region: <span className="font-semibold">{dest.location.region}</span></p>
                </div>

               <div className="flex items-center text-sm mb-4 ml-5">
                <svg className="w-6 h-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                  <p className="text-green-400">Address: <span className="font-semibold">{dest.location.address}</span></p>
                </div>

                <p className="mb-2">{dest.description}</p>

                <button className="book-button" type="button">Book Now</button>
              </div>
            ))
          ) : (
            <div className="p-20 text-red-500">No destinations found with the selected category in this region.</div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default DestinationModal;
