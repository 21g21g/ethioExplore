import React, { useEffect, useState } from "react";
import axios from "axios";
import blunile from "../../../assets/blue.avif"
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card } from "flowbite-react";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { useNavigate } from "react-router-dom";

const HotelbyCity = () => {
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const hotelData = useSelector((state) => state.hotel.hotelData);
  useEffect(() => {
    const getHotelBycity = async () => {
      dispatch(hotelSliceactions.hotelfetchStart());
      try {
        const cities = ['bahrdar', 'addis', 'bdr', 'bure', 'Bahrdar'];
        const iter = cities.map((city) => `cities=${encodeURIComponent(city)}`);

        const response = await axios.get(`http://localhost:5000/api/hotels/countbycity?${iter.join("&")}`);
        if (!response.ok) {
          dispatch(hotelSliceactions.hotelfetchFailure("there is no data on this route"));
        }

        const data = response.data;
        dispatch(hotelSliceactions.hotelfetchSuccess(data));
        localStorage.setItem("hotel", JSON.stringify(data));
      } catch (error) {
        dispatch(hotelSliceactions.hotelfetchFailure(error));
      }
    };
    getHotelBycity();
  }, []);

  const handleClick = (hotel) => {
   
   
      dispatch(hotelSliceactions.setDetailHotel(hotel))
       localStorage.setItem("detailhotel",JSON.stringify(hotel))

  
    


    navigate('/hoteldetail')
  }


  return (
    <div className="flex flex-col md:flex-row">
      <h1>Cities</h1>
      <div className="flex flex-row justify-center gap-3 overflow-x-auto">
         {/* <Slider {...settings}> */}
        {hotelData.map((count, index) => (
         <div key={index} className="slider-container">
           
              <div className="w-60 flex-row md:w-full">
                <Card imgSrc={blunile} onClick={() => handleClick(count)} className="cursor-pointer">
                  <h1 className="text-yellow-300">{count[0].city}</h1>
                  <h3>{count.length} hotels</h3>
                </Card>
              </div>
           
           
          </div>
        ))}
         {/* </Slider> */}
        
      </div>
    </div>
  );
};

export default HotelbyCity;