import React, { useEffect, useState } from "react";

import  blue from "../../../assets/blue.avif";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { Card } from "flowbite-react";

const HotelbyType = () => {

  const dispatch=useDispatch()
  const loading=useSelector((state)=>state.hotel.loading)
  const error=useSelector((state)=>state.hotel.error)
  const hotelType=useSelector((state)=>state.hotel.hotelType)
 
  useEffect(()=>{
    const hotelfetchbyType=async()=>{
      dispatch(hotelSliceactions.hoteltypefetchStart())
      try{
        const response=await axios.get("http://localhost:5000/api/hotels/countbytype")
        const data=response.data
        
        dispatch(hotelSliceactions.hotelfethtypeSuccess(data))
         localStorage.setItem("hoteltype",JSON.stringify(data))
       
       
       
       

      }catch(error)
      {
        dispatch(hotelSliceactions.hotelfetchFailure("there is hotel in this type"))

      }

    }
    hotelfetchbyType();
    

  }, [])
  return (
    <div className="flex flex-col md:flex-row ">
      <h1 className="text-2xl">type</h1>
      <div className="flex flex-row gap-4 justify-center mt-4"> 
     
      {hotelType.map((hotel,index)=>{
        return (
          <Card imgSrc={blue}>
              <h1>{hotel.type}</h1>
      <h3>{hotel.count} number of hotels</h3>

          </Card>
      
    
     

        )
      })}
    
       </div>
       </div>
    
    
    
  );
};

export default HotelbyType;
