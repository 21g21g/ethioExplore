import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { useNavigate } from "react-router-dom";
import blunile from "../../../assets/blue.avif";

import { sliderSettings } from "../hotelcomponent/CarousolCards";
const HotelbyCity = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const hotelData = useSelector((state) => state.hotel.hotelData);
const navigate=useNavigate()
  
 
  useEffect(() => {
    const fetchHotelByCity = async () => {
      dispatch(hotelSliceactions.hotelfetchStart());
      try {
       
        const response = await axios.get("http://localhost:5000/api/hotels/countbycity");

       
        dispatch(hotelSliceactions.hotelfetchSuccess(response.data));
      } catch (error) {
        dispatch(hotelSliceactions.hotelfetchFailure(error.message));
      }
    };
    fetchHotelByCity();
  }, [dispatch]);

  const handleClick = (hotels) => {
    
    const city = hotels.map((hoo) => hoo.city)
    
    dispatch(hotelSliceactions.setDetailHotel(hotels));
    navigate(`/hotels/city/${city[0]}`)

  };

  return (
    
    <div className="flex flex-col m-3 md:flex-col">
      <h1 className="text-2xl ">Cities</h1>
      <div className="flex flex-col justify-center gap-3 overflow-x-auto md:flex-row">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
          ) : ( 
              <div className="carousel-container my-8 w-full m-auto ">
                <Slider {...sliderSettings} >
                    {hotelData.map((hotels, index) => (
                  <div key={index} className="cards md:w-full sm:gap-0" >
                  <div className="flex mx-4"><img src={blunile}  className="card-images cursor-pointer" onClick={()=>handleClick(hotels.hotels)}/>
</div>
                    <div className="card-body mx-4 px-6 py-4">
                      <div className="card-title">{hotels._id}</div>
                      <div className='text-gray-500 mb-2 flex items-center'>
                        <h3>{hotels.count} hotels</h3>
                       </div>
                      
                  </div>
                   
    </div>
  ))}
                    
                 
   
               
              </Slider>
                  </div>

            
                

  )}
  </div>
    </div>
  );
};

export default HotelbyCity;
