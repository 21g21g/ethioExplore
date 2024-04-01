import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {  Modal, ModalBody, ModalHeader } from "flowbite-react";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { useNavigate } from "react-router-dom";
import blunile from "../../../assets/blue.avif";

import { sliderSettings } from "../hotelcomponent/CarousolCards";
const HotelbyCity = () => {

  const dispatch = useDispatch();
  const [modal,setModal]=useState(false)
  const navigate = useNavigate();
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const hotelData = useSelector((state) => state.hotel.hotelData);
  const detailHotel = useSelector((state) => state.hotel.detailHotel)
  console.log(hotelData)

  
 
  useEffect(() => {
    const fetchHotelByCity = async () => {
      dispatch(hotelSliceactions.hotelfetchStart());
      try {
       
        const response = await axios.get("http://localhost:5000/api/hotels/countbycity");

       
        console.log(response.data)
        dispatch(hotelSliceactions.hotelfetchSuccess(response.data));
      } catch (error) {
        dispatch(hotelSliceactions.hotelfetchFailure(error.message));
      }
    };
    fetchHotelByCity();
  }, [dispatch]);

  const handleClick = (hotels) => {
    
    dispatch(hotelSliceactions.setDetailHotel(hotels));
    setModal(true)
    // navigate('/hoteldetail');
  };

  return (
    
    <div className="flex flex-col md:flex-row">
      <h1 className="text-2xl mb-4 md:mb-0 md:mr-4">Cities</h1>
      <div className="flex flex-col justify-center gap-3 overflow-x-auto md:flex-row">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
          ) : ( 
              <div className="carousel-container my-8 w-3/4 m-auto ">
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
                    
                  <div className="flex justify-center items-center md:mt-10" >
                    <Modal show={modal} onClose={() => setModal(false)} className="w-full">
                      <ModalHeader />
                      <ModalBody>
            <div className="grid grid-cols-2 md:grid-cols-3">
          {detailHotel.map((detail,index) => (
            <div key={index} className="flex flex-col flex-wrap mx-3 my-3">
              <div>
               
                <img className="w-60 h-40 object-cover " src={`http://localhost:5000/${detail.photos[1]}`}/>

              
              </div>
              <p className="text-2xl">{detail.name}</p>
              <h1 className="text-2xl">{detail.type}</h1>
              <p className="text-2xl">${detail.cheapestPrice}</p>
              <button className="bg-green-500 text-slate-200">Book now</button>
              
                  
              </div>
              
          ))}
    </div>
     </ModalBody>

       </Modal></div>       
                  
   
               
              </Slider>
                  </div>

            
                

  )}
  </div>
    </div>
  );
};

export default HotelbyCity;
