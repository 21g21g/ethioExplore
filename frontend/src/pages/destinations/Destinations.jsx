import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InitialDestinations from './view/InitialDestinations';
import countByRegion from './utils/countByRegion';
import TopDestinations from './view/TopDestinations';


const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
 


  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/destinations');
      setDestinations(response.data.data);
    } catch (error) {
      console.error("Error fetching destinations", error);
    }
  };

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedRegion === "" || destination.location.region === selectedRegion)
  );

  const destinationCountsByRegion = countByRegion(destinations);


  const getInitialDestinations = (destinations) => {
    const groupedByRegion = {};

    destinations.forEach((destination) => {
      const region = destination.location.region;
      if (!groupedByRegion[region]) {
        groupedByRegion[region] = { ...destination, count: destinationCountsByRegion[region] };
      }

    });

    return Object.values(groupedByRegion);

  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    className: "slider variable-width ",
    variableWidth: true,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
  return (
    <div className="carousel-container my-8 w-5/6 m-auto   " >
      <div className='text-custom-green1 text-4xl font-serif'>
        <h1>All Destination By region</h1>
</div>
     <InitialDestinations
        destinations={getInitialDestinations(filteredDestinations)}
        settings={settings}
       />
     <TopDestinations/>
    </div>
  );
};

export default Destinations;
