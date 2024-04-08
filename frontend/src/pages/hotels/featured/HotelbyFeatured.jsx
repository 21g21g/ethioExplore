import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sheratn from "../../../assets/sheratn.jpg";
import axios from "axios";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import addis from "../../../assets/addis.jpg"
import bure from "../../../assets/bure.jpg"
import bahrdar from "../../../assets/bahrdar.webp"

import bdr from "../../../assets/bdr.jpg"
import { FaStar } from "react-icons/fa";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "../hotelcomponent/CarousolCards";

const HotelbyFeatured = () => {
  
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.hotel.loading)
  const error=useSelector((state)=>state.hotel.error)
  const featuredHotel=useSelector((state)=>state.hotel.featuredHotel)
 
  useEffect(() => {
    const featuerdHotel = async () => {
      dispatch(hotelSliceactions.featuredHotelStart())
      try {
        const response = await axios.get("http://localhost:5000/api/hotels/gethotels?featured=true&limit=7")
        const data = response.data

        dispatch(hotelSliceactions.featuredHotelSuccess(data))
        
      } catch (error) {
        dispatch(hotelSliceactions.featuredHotelFailure(error))
      }
      
    }
    featuerdHotel();
    
    
  }, [dispatch])
  const featuredHotels = {
    "bure": bure,
    "addis": addis,
    "Bahrdar":bahrdar,
    "bdr":bdr
    
  }
  return (
    <div className="flex flex-col m-3 md:flex-col "> 
    <h1>Featured</h1>
      <div className="carousel-container my-8 w-full m-auto ">
         <Slider {...sliderSettings} >
        {featuredHotel.map((feature, index) => (
         <div className="cards mx-3  md:w-full " key={index}>  
            <div className="flex mx-4">
              <img className="card-images cursor-pointer" src={featuredHotels[feature.city]} />
              </div>
            <div className="card-body  mx-4 px-6 py-4">

               <h1>{feature.title}</h1>
         <h1 className="text-3xl">{feature.city}</h1>
          <p>Starting from ${feature.cheapestPrice}</p>
          <div className="flex flex-row gap-3"> <FaStar className="text-amber-300" /> 
          <p>Rating:{feature.rating}</p></div>
           
            </div>
        
            {/* {feature.rating<5&&<span></span>}  */}
             {/* {feature.rating<8&&feature.rating>5&&<span>Excellent</span>} {feature.rating<11&&feature.rating>8&&<span>Excellent</span>} */}
          



        
        </div>
        
      
      
     ))}

       </Slider>
     </div>
     </div>
   

    
  );
};

export default HotelbyFeatured;
