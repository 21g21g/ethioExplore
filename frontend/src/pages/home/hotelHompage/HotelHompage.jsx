import React, { useState, useEffect } from "react";
import HotelbyCity from "../../hotels/cities/HotelbyCity";
import HotelbyFeatured from "../../hotels/featured/HotelbyFeatured";
import HotelbyType from "../../hotels/type/HotelbyType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hotelSliceactions } from "../../../redux/hotelRedux/hoteSlice";

const HotelHompage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const city = useSelector((state) => state.hotel.city);
  const adult = useSelector((state) => state.hotel.numbers.adult);
  const children = useSelector((state) => state.hotel.numbers.children);
  const room = useSelector((state) => state.hotel.numbers.room);
  const startDate = useSelector((state) => state.hotel.startDate);
  const endDate = useSelector((state) => state.hotel.endDate);
  const [selectedStartdate, setSelectedStartdate] = useState(new Date(startDate));
  const [selectedEnddate, setSelectedEnddate] = useState(new Date(endDate));

  const handleCitychange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setCity(value));
  };

  const handleAdultchange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setAdult(value));
  };

  const handleChildrenchange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setChildren(value));
  };

  const handleRoomchange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setRoom(value));
  };

  const handleSelectedStartdate = (date) => {
    setSelectedStartdate(date);
    dispatch(hotelSliceactions.setStartDate(date.toISOString()));
  };

  const handleSelectedEnddate = (date) => {
    setSelectedEnddate(date);
    dispatch(hotelSliceactions.setEndDate(date.toISOString()));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}`);
      const data = response.data;
      dispatch(hotelSliceactions.setsearchCitySuccess(data));
      navigate('/hotellist');
    } catch (error) {
      console.log("there is an error", error);
    }
  };

  return (
     <div className="flex flex-col gap-3 mt-3 md:gap-6 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row md:gap-3 w-full">
        <TextInput type="text" placeholder="Where do you want to go?" value={city} onChange={handleCitychange} className="w-96 md:w-auto" />
        <div className="flex flex-col gap-3 md:flex-row md:gap-3">
          <DatePicker
            showIcon
            selected={selectedStartdate}
            onChange={handleSelectedStartdate}
            placeholderText="Select start date"
            className="w-96 md:w-auto"
          />
          <DatePicker
            showIcon
            selected={selectedEnddate}
            onChange={handleSelectedEnddate}
            placeholderText="Select end date"
            className="w-96 md:w-auto"
          />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:gap-3">
          <TextInput type="number" value={adult} onChange={handleAdultchange} className="w-96 md:w-auto " />
          <span>Adult</span>
          <TextInput type="number" value={children} onChange={handleChildrenchange} className="w-96 md:w-auto" />
          <span>Children</span>
          <TextInput type="number" value={room} onChange={handleRoomchange} className="w-96 md:w-auto" />
          <span>Room</span>
        </div>
        <Button type="submit" className="bg-blue-500 text-white">
          Search
        </Button>
      </form>
      <div className="w-full  ">
        <HotelbyCity />
      </div>
      <div className="w-full ">
        <HotelbyType />
      </div>
      <div className="w-full ">
        <HotelbyFeatured />
      </div>
    </div>
  );
};

export default HotelHompage;
