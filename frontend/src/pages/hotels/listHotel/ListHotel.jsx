import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleCityHotels from '../hotelcomponent/SingleCityHotels';
import Header from '../../../components/header/Header';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import hotel from "../../../assets/hotel.png"
import { FaArrowAltCircleRight } from 'react-icons/fa';
const ListHotel = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.hotel.loading);
  const error = useSelector((state) => state.hotel.error);
  const min = useSelector((state) => state.hotel.min);
  const max = useSelector((state) => state.hotel.max);
  const searchCity = useSelector((state) => state.hotel.searchCity);
  const [openDate, setOpenDate] = useState(false);
  const city = useSelector((state) => state.hotel.city);
  const options = useSelector((state) => state.hotel.options);
  const dates = useSelector((state) => state.hotel.dates);

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
      dispatch(hotelSliceactions.setsearchCityStart());
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}`);
        if (response.data === '') {
          dispatch(hotelSliceactions.setsearchCityFailure('there is no city in this name'));
        } else {
          dispatch(hotelSliceactions.setsearchCitySuccess(response.data));
        }
      } catch (error) {
        dispatch(hotelSliceactions.setsearchCityFailure(error.message));
      }
    };
    if (city !== '') {
      fechedData();
    }
  }, [city, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(hotelSliceactions.setsearchCityStart());
      try {
        let url = `http://localhost:5000/api/hotels/gethotels?city=${city}`;
        if (min) {
          url += `&min=${min}`;
        }
        if (max) {
          url += `&max=${max}`;
        }
        const response = await axios.get(url);
        if (response.data === '') {
          dispatch(hotelSliceactions.setsearchCityFailure('There are no hotels for this city.'));
        } else {
          dispatch(hotelSliceactions.setsearchCitySuccess(response.data));
        }
      } catch (error) {
        dispatch(hotelSliceactions.setsearchCityFailure(error.message));
        toast.error('Failed to fetch hotels. Please try again.');
      }
    };
    if (city !== '') {
      fetchData();
    } else {
      toast.error('First select the city');
    }
  }, [city, min, max, dispatch]);

  const handleDateChange = (item) => {
    dispatch(hotelSliceactions.updateDates({ selection: item.selection }));
  };

  const handleOptionChange = (event, optionName) => {
    const value = parseInt(event.target.value);
    dispatch(hotelSliceactions.setOptions({ ...options, [optionName]: value }));
  };

  return (
    <>
      <Header />
      <div className=' flex flex-col justify-center items-center '>
        <div className='  gap-6 items-center flex flex-col md:flex-row p-6 '>
          <div className="bg-green-100 rounded-md flex flex-col p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto">
            <h1 className="text-2xl text-custom-green2 font-bold">List of hotels in</h1>
            <h1 className="text-lime-500 text-4xl font-bold font-serif">{city}</h1>
            <div className="bg-lime-600 h-2"></div>
            {searchCity.map((item) => (
              <div key={item.name} className="flex gap-3 items-center ">
                <FaArrowAltCircleRight className='text-orange-600' />
                <h1>{item.name}</h1>
              </div>
            ))}
          </div>

          <div className=' w-2/3 h-[300px] '>
            <img src={hotel} alt="Hotels" className='object-fill h-full ' />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:p-4 sm:p-2 bg-green-50 justify-center rounded-md">
          <div className="p-4 md:w-96 items-center   ">
            <form className="bg-white sticky top-20 mt-4 p-4 rounded-md ">
              <h1 className="pb-4 text-2xl text-lime-500 font-bold">Search</h1>
              <div className="flex flex-col gap-2">
                <h4>Destination</h4>
                <input type="text" placeholder={city} onChange={handleCitychange} />
              </div>
              <div className="flex flex-col gap-2">
                <p>Pick Date</p>
                <div className="headerSearchItem mb-4 relative">
                  <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
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
              <div className="flex flex-col gap-2">
                <p>Min price per night</p>
                <input type="number" value={min} onChange={handleMinChange} min={1} />
              </div>
              <div className="flex flex-col gap-2">
                <p>Max price per night</p>
                <input type="number" value={max} onChange={handleMaxChange} min={1} />
              </div>
              <div className="flex flex-col gap-2">
                <p>Adult</p>
                <input type="number" value={options.adult} onChange={(e) => handleOptionChange(e, 'adult')} min={0} />
              </div>
              <div className="flex flex-col gap-2">
                <p>Children</p>
                <input type="number" value={options.children} onChange={(e) => handleOptionChange(e, 'children')} min={0} />
              </div>
              <div className="flex flex-col gap-2">
                <p>Room</p>
                <input type="number" value={options.room} onChange={(e) => handleOptionChange(e, 'room')} min={1} />
              </div>
            </form>
          </div>
          <div className="flex flex-col p-4 bg-white rounded-md">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {searchCity.map((search) => (
              <SingleCityHotels key={search._id} data={search} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListHotel;
