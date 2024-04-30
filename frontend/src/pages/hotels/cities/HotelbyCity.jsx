import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { useNavigate } from "react-router-dom";
import blunile from "../../../assets/blue.avif"
import bahrdar from "../../../assets/bahrdar.webp"
import addis from "../../../assets/addis.jpg"
import bure from "../../../assets/bure.jpg"
import bdr from "../../../assets/bdr.jpg"
import hawasa from "../../../assets/hawasa.jpg"
import adama from "../../../assets/adama.jpg"
import injbara from "../../../assets/injbara.jpg"
import markos from "../../../assets/markos.jpg"
import debrebirhan from "../../../assets/debrebirhan.jpg"
import jimma from "../../../assets/jimma.jpg"
import arbaminch from "../../../assets/arbaminch.jpg"
import mekele from "../../../assets/mekele.jpg"

import { sliderSettings } from "../hotelcomponent/CarousolCards";
const HotelbyCity = () => {

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const hotelData = useSelector((state) => state.hotel.hotelData);
  console.log(hotelData)
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
  const cityImage={
    "bahrdar": bahrdar,
    "addis": addis,
    "bure": bure,
    "bdr": bdr,
    "adama": adama,
    "hawasa": hawasa,
    "mekele": mekele,
    "injbara": injbara,
    "markos": markos,
    "debrebirhan": debrebirhan,
    "jimma": jimma,
    "arbaminch":arbaminch,
    
    
  }

  return (

    <div className="flex flex-col m-3 md:flex-col ">
      <h1 className="text-3xl text-custom-green2">Explore By Cities</h1>
      <div className="flex flex-col justify-center gap-3 overflow-x-auto md:flex-row">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className=" my-8 w-full  ">
                <Slider {...sliderSettings}  >
                  
              {hotelData.map((hotels, index) => (
                <div key={index} className="cards md:w-full sm:gap-0   " >
                  <div className="flex mr-4"><img src={cityImage[hotels._id]} className="card-images cursor-pointer" onClick={() => handleClick(hotels.hotels)} />
                  </div>
                  <div className="card-body mx-4 px-6 py-4">
                    <div className="card-title" >{hotels._id}</div>
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
