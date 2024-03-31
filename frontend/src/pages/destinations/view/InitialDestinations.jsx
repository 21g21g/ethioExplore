import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const InitialDestinations = ({ destinations, settings, openModal }) => {
  if (!destinations.length) return <div className="text-center">No results found</div>;

  return (
    <Slider {...settings}>
      {destinations.map(destination => (
        <div key={destination._id} className="card" style={{ width: 300 }}>
          <img src={destination.images.main} alt={destination.name} className="card-image" />
          <div className="card-body px-6 py-4">
            <div className="card-title">{destination.location.region}</div>
            <div className='text-gray-500 mb-2 flex items-center'>
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Number of Destinations: {destination.count}</span>
             </div>
            <p className="card-text" style={{height: "40px"}}>{destination.description}</p>
            <div className="flex justify-center">
              <button className="see-details-btn" onClick={() => openModal(destination)}>See Details</button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default InitialDestinations;
