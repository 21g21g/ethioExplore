import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sheratn from "../../../assets/sheratn.jpg";
import axios from "axios";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";

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
    
    
  }, [])
  // console.log(featuredHotel)
  return (
    <div className="flex flex-col md:flex-row "> 
    <h1>Featured</h1>
    <div className="flex flex-row gap-4 justify-center ">
        {featuredHotel.map((feature, index) => {
          
      return(
        <div className="flex flex-col " key={index}>  
         
        <img className="w-48 h-40 object-cover cursor-pointer md:w-80 md:h-80"  src={feature.photos[0]}/>
         <h1>{feature.title}</h1>
         <h1 className="text-3xl">{feature.city}</h1>
         <p>Starting from ${feature.cheapestPrice}</p>
           <p>{feature.rating} {feature.rating<5&&<span>Good</span>} 
           {feature.rating<8&&feature.rating>5&&<span>Excellent</span>} {feature.rating<11&&feature.rating>8&&<span>Excellent</span>}</p>



        
        </div>
        
      
      )
     })}


     </div>
     </div>
   

    
  );
};

export default HotelbyFeatured;
