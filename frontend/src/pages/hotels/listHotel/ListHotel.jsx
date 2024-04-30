import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleCityHotels from '../hotelcomponent/SingleCityHotels'
import Header from '../../../components/header/Header'
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useLocation } from 'react-router-dom'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListHotel = () => {
 
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.hotel.loading)
  const error = useSelector((state) => state.hotel.error)
  const min = useSelector((state) => state.hotel.min)
  const max = useSelector((state) => state.hotel.max)
  const searchCity = useSelector((state) => state.hotel.searchCity)
   const [openDate, setOpenDate] = useState(false);
  const city = useSelector((state) => state.hotel.city)
  
  const options=useSelector((state)=>state.hotel.options)

  const dates=useSelector((state)=>state.hotel.dates)
 
   const handleCitychange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setCity(value));
  };
  const handleMinChange = (event) => {
    const value = parseInt(event.target.value);
    
      dispatch(hotelSliceactions.setMin(value));
    
  };

  const handleMaxChange = (event) => {
    const value = parseInt(event.target.value);
  
      dispatch(hotelSliceactions.setMax(value));
    
  };

    useEffect(() => {
      const fechedData = async () => {
      dispatch(hotelSliceactions.setsearchCityStart())
      try {
          
          const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}`);
          if (response.data === '') {
            dispatch(hotelSliceactions.setsearchCityFailure("there is no city in this name"))
          }
          else {
            dispatch(hotelSliceactions.setsearchCitySuccess(response.data));
          }
         
        // setFiteredData(response.data)
        } catch (error) {
            dispatch(hotelSliceactions.setsearchCityFailure(error.message))
        }
    };
      if (city !== "") {
        fechedData();
      }
    
     // Call the function here

    }, [city, dispatch]);
  

  
    
  //   }
  useEffect(() => {
     const fetchData = async () => {
    dispatch(hotelSliceactions.setsearchCityStart());
    try {
      let url = `http://localhost:5000/api/hotels/gethotels?city=${city}`;

      // Append min and/or max price parameters if available
      if (min) {
        url += `&min=${min}`;
      }
      if (max) {
        url += `&max=${max}`;
      }

      const response = await axios.get(url);

      if (response.data === '') {
        dispatch(hotelSliceactions.setsearchCityFailure("There are no hotels for this city."));
      } else {
        dispatch(hotelSliceactions.setsearchCitySuccess(response.data));
      }
    } catch (error) {
      dispatch(hotelSliceactions.setsearchCityFailure(error.message));
      toast.error("Failed to fetch hotels. Please try again.");
    }
  };

    
    if (city !== "") {
      fetchData();
    }
    else {
      toast.error("first select the city")
}
    
   
  }, [ city,min, max,dispatch])
  
   const handleDateChange = (item) => {
        dispatch(hotelSliceactions.updateDates({selection:item.selection}))
        
  }
    const handleOptionChange = (event, optionName) => {
    const value = parseInt(event.target.value);
    
      dispatch(hotelSliceactions.setOptions({ ...options, [optionName]: value }));
    
  };
 
  
  return (
    <>
    <Header/>
      <div className='flex flex-col md:flex-row gap-3 md:p-4 sm:p-2 sm:mr-3 '>
        
        <div className='p-4  md:w-96 '>
          <form className='bg-green-500 mt-4 p-2 '>
            <h1>Search</h1>
            <div className='flex flex-col'>
              <h4>Destination</h4>
              <TextInput type='text' placeholder={city}
                onChange={handleCitychange}
 />
            </div>
            {/* <div className='flex flex-col'>
              <p>Check-in-date</p>
              <TextInput type='text' placeholder={`${new Date(dates[0].startDate).toLocaleDateString()} to ${new Date(dates[0].endDate).toLocaleDateString()}`} />
            </div> */}
             <div className='flex flex-col'>
              <p>Check-out-date</p>
              <div className="headerSearchItem mb-4  relative">
          <span
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText"
          >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && (
                    <DateRange
           
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date absolute mt-1"
                    minDate={new Date()}
                  />
                )}
        </div>
              
            </div>
            <div className='flex flex-col'>
              <p>Min price per night</p>
              <TextInput type='number' value={min} onChange={handleMinChange} min={1}/>
            </div>
            <div className='flex flex-col'>
              <p>Max price per night</p>
              <TextInput type='number' value={max}    onChange={handleMaxChange} min={1}/>
            </div>
            <div className='flex flex-col'>
              <p>Adult</p>
        <TextInput type="number" value={options.adult} placeholder={options.adult} onChange={(e) => handleOptionChange(e, 'adult')} min={0} />
            </div>
            <div className='flex flex-col'>
              <p>Children</p>
              <TextInput type='number' placeholder={options.children} value={options.children} onChange={(e)=>handleOptionChange(e,'children')} min={0}/>
            </div>
            <div className='flex flex-col'>
              <p>Room</p>
              <TextInput type='number' value={options.room} placeholder={options.room} onChange={(e)=>handleOptionChange(e,'room')} min={1}/>
            </div>
           
          </form>
        </div>
        
        <div className='flex flex-col p-3'>
          {loading && <p>Loading...</p>}
          {error && <p>{ error}</p>}
          {searchCity.map((search) => (
            <SingleCityHotels key={search._id} data={search} />
          ))}
        </div>
      </div></>
   

  );

}

export default ListHotel
