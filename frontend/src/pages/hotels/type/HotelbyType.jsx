import React, { useEffect, useState } from "react";

import blue from "../../../assets/blue.avif";
import hotelrep from "../../../assets/hotelrep.avif"
import apartama from "../../../assets/apartama.webp"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { Card } from "flowbite-react";

const HotelbyType = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.hotel.loading)
  const error = useSelector((state) => state.hotel.error)
  const hotelType = useSelector((state) => state.hotel.hotelType)

  useEffect(() => {
    const hotelfetchbyType = async () => {
      dispatch(hotelSliceactions.hoteltypefetchStart())
      try {
        const response = await axios.get("http://localhost:5000/api/hotels/countbytype")
        const data = response.data

        dispatch(hotelSliceactions.hotelfethtypeSuccess(data))





      } catch (error) {
        dispatch(hotelSliceactions.hotelfetchFailure("there is hotel in this type"))

      }

    }
    hotelfetchbyType();


  }, [dispatch])
  const typeofimae = {
    "hotel": hotelrep,
    "apartama": apartama,
    "resort":blue,
    
  }
  return (
    <div className="flex flex-col m-3 md:flex-col ">
      <h1 className="text-2xl">type</h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">

        {hotelType.map((hotel, index) => {
          return (
              <Card key={index} imgSrc={typeofimae[hotel.type]} className="w-full" >
              <h1>{hotel.type}</h1>
              <h3>{hotel.count} number of {hotel.type}s</h3>

            </Card>
           



          )
        })}

      </div>
    </div>



  );
};

export default HotelbyType;
