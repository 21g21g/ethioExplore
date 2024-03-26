import React, { useState,useEffect } from "react";
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
 
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const city=useSelector((state)=>state.hotel.city)
  const adult = useSelector((state) => state.hotel.numbers.adult)
  const children = useSelector((state) => state.hotel.numbers.children) 
  const room = useSelector((state) => state.hotel.numbers.room)
  const startDate = useSelector((state) => state.hotel.startDate)
  const endDate=useSelector((state)=>state.hotel.endDate)
  const [selectedStartdate, setSelectedStartdate] = useState(new Date(startDate))
  const [selectedEnddate,setSelectedEnddate]=useState(new Date(endDate))
  
  // console.log(startDate)
  // console.log(endDate)
  

  
  const handleCitychange = (event) => {
    const value=event.target.value
    dispatch(hotelSliceactions.setCity(value))
    localStorage.setItem("cit",JSON.stringify(value))
  }
  const handleAdultchange = (event) => {
  const value=event.target.value
    dispatch(hotelSliceactions.setAdult(value))
    localStorage.setItem("adult",JSON.stringify(value))

    
  }
  const handleChildrenchange = (event) => {
        const value=event.target.value
    dispatch(hotelSliceactions.setChildren(value))
    localStorage.setItem("child",JSON.stringify(value))
  }
  const handleRoomchange = (event) => {
        const value=event.target.value
    dispatch(hotelSliceactions.setRoom(value))
    localStorage.setItem("room",JSON.stringify(value))
  }
  const handleSelectedStartdate = (date) => {
    setSelectedStartdate(date)
    dispatch(hotelSliceactions.setStartDate(date.toISOString()))
    localStorage.setItem("startdate",JSON.stringify(date))
  }
  const handleSelectedEnddate = (date) => {
    setSelectedEnddate(date)
    dispatch(hotelSliceactions.setEndDate(date.toISOString()))
    localStorage.setItem("enddate",JSON.stringify(date))
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}`)
      const data = response.data
      dispatch(hotelSliceactions.setsearchCitySuccess(data))
      localStorage.setItem("city", JSON.stringify(data))

      navigate('/hotellist')
      
    } catch (error) {
      console.log("there is an error")
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row">
        <form onSubmit={handleSubmit} className="flex flex-row gap-3 w-full ml-5">
        <TextInput type="text" placeholder="where city you want?" value={city} onChange={handleCitychange} className=" w-full"/>
          <DatePicker
             showIcon
            selected={selectedStartdate}
          

              onChange={handleSelectedStartdate} placeholderText="Select date start" />
          <DatePicker
            showIcon

            selected={selectedEnddate}
           

             onChange={handleSelectedEnddate} placeholderText="Select date end" />
          <div className="flex flex-row">
            <TextInput className="w-full h-auto" type="number" value={adult} onChange={handleAdultchange} /><span>Adult</span>
            <TextInput className="w-full h-auto" type="number" value={children} onChange={handleChildrenchange}/><span>children</span>
            <TextInput className="w-full h-auto" type="number" value={room} onChange={handleRoomchange}/><span>room</span>
          </div>
        <Button type="submit" className="bg-sky-700 text-white" outline>
          
          search
        </Button>
       
        </form></div>
     

      <HotelbyCity />
      <HotelbyType />
      <HotelbyFeatured />
    </div>
  );
};

export default HotelHompage;
