import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DestinationModal from './view/DestinationModal';
import SearchAndFilter from './utils/SearchAndFilter';
import InitialDestinations from './view/InitialDestinations';
import countByRegion from './utils/countByRegion';


const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState([]);


  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/destinations');
      setDestinations(response.data);
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

  const openModal = (destination) => {
    const destinationsInRegion = destinations.filter(d => d.location.region === destination.location.region);
    setSelectedDestination(destinationsInRegion);
    setIsModalOpen(true);
    document.body.classList.add('overflow-y-hidden');
  };


  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-y-hidden');
  };


  return (
    <div className="carousel-container my-8 w-5/6 m-auto   " >
      <div className='text-custom-green1 text-4xl font-serif'>
        <h1>All Destination By region</h1>
      </div>
      {/* <SearchAndFilter
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      regions={regions}
     /> */}

      <InitialDestinations
        destinations={getInitialDestinations(filteredDestinations)}
        settings={settings}
        openModal={openModal}
      />

      <DestinationModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        destinations={selectedDestination}
      />
      <div className='bg-green-400 h-80 mt-8'>
        <h1>all destinations</h1>
      </div>
    </div>
  );
};

export default Destinations;
