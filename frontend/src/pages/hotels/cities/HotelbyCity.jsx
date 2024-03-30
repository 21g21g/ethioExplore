import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "flowbite-react";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";
import { useNavigate } from "react-router-dom";
import blunile from "../../../assets/blue.avif";

const HotelbyCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const hotelData = useSelector((state) => state.hotel.hotelData);

  useEffect(() => {
    const fetchHotelByCity = async () => {
      dispatch(hotelSliceactions.hotelfetchStart());
      try {
        const cities = ['bahrdar', 'addis', 'bdr', 'bure', 'Bahrdar'];
        const iter = cities.map((city) => `cities=${encodeURIComponent(city)}`);

        const response = await axios.get(`http://localhost:5000/api/hotels/countbycity?${iter.join("&")}`);
        const data = response.data;

        dispatch(hotelSliceactions.hotelfetchSuccess(data));
      } catch (error) {
        dispatch(hotelSliceactions.hotelfetchFailure(error.message));
      }
    };
    fetchHotelByCity();
  }, [dispatch]);

  const handleClick = (count) => {
    dispatch(hotelSliceactions.setDetailHotel(count));
    navigate('/hoteldetail');
  };

  return (
    <div className="flex flex-col md:flex-row">
      <h1>Cities</h1>
      <div className="flex flex-row justify-center gap-3 overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          hotelData.map((count, index) => (
            <div key={index} className="slider-container">
              <div className="w-60 flex-row md:w-full">
                <Card imgSrc={blunile} onClick={() => handleClick(count)} className="cursor-pointer">
                  <h1 className="text-yellow-300">{count[0]?.city}</h1>
                  <h3>{count.length} hotels</h3>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelbyCity;
