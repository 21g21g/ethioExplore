import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HotelDetail = () => {
    const detailHotel = useSelector((state) => state.hotel.detailHotel)
    console.log(detailHotel)

   return (
      <div>
          {detailHotel.map((detail,index) => (
              <div key={index}>
                  <h1>{detail.city}</h1>
                  
              </div>
              
          ))}
    </div>
  )
}

export default HotelDetail
