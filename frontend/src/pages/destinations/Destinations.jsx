import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InitialDestinations from './view/InitialDestinations';
import countByRegion from './utils/countByRegion';
import TopDestinations from './view/TopDestinations';
import AllDestinations from './view/AllDestinations';
import place from "../../assets/place.png"
import { FaSearch } from 'react-icons/fa';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // State to manage the animated text
  const [animatedText, setAnimatedText] = useState('');

  // List of animated texts
  const animatedTexts = ['Rich history', 'Breathtaking landscapes', 'Vibrant culture', 'Diverse wildlife', 'Warm hospitality.'];

  // Function to rotate through the animated texts
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(animatedTexts[index]);
      index = (index + 1) % animatedTexts.length;
    }, 2000); // Change the interval duration as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

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
        style={{ ...style, display: "block", background: "grey", fontSize: "40px", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
  return (
    <div className="carousel-container w-5/6 m-auto   " >
      <div className="flex flex-col gap-3 text-6xl font-serif items-center py-6 ">
        <div className='flex flex-col '>
          <h1 className='text-custom-green2  '>Ethiopia </h1>
          <h1 className='text-custom-yellow2 text-center'> Has </h1>
        </div>
        <h2 className='text-red-500 p-4'>{animatedText}</h2>
      </div>
      <div className='flex gap-3 mt-3'>
        <input type="text" className="input rounded-full my-2" placeholder="Where do you want to stay?" />
        <button className='bg-green-400 my-2 p-2 px-6 rounded-lg text-white font-serif'>Search</button>
      </div>
      <div className='px-6 mb-4'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='md:w-1/2'>
            <h1 className='text-custom-green1 text-4xl font-serif py-4'>Explore Ethiopia <b className='text-red-300'>Land of origin!</b></h1>
            <p>
              <b>Ethiopia's</b> attraction places offer a mesmerizing blend of natural
              wonders, ancient history, and vibrant culture, beckoning travelers
              to explore its diverse landscapes and rich heritage. From the towering
              peaks of the Simien Mountains to the depths of the Danakil Depression,
              Ethiopia boasts awe-inspiring geological formations that leave visitors
              in awe. The country's UNESCO World Heritage Sites, such as Lalibela's rock-hewn
              churches and the ancient city of Aksum, bear witness to its rich history and architectural marvels.
            </p>
          </div>
          <div className='md:w-1/2 h-64'>
            <img src='https://www.shutterstock.com/image-illustration/addis-ababa-city-colored-watercolor-600nw-1025824582.jpg' alt="destination" className='object-cover h-full w-full rounded-md' />
          </div>
        </div>
      </div>

      <div className='bg-green-50 rounded-full border'>
        <h1 className='text-6xl text-green-500 text-center font-serif py-10 '>Explore by region</h1>
      </div>

      <InitialDestinations
        destinations={getInitialDestinations(filteredDestinations)}
        settings={settings}
      />
      <TopDestinations />
      <AllDestinations />
    </div>
  );
};

export default Destinations;
