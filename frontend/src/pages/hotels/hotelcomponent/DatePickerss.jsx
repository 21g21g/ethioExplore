import React, { useState } from 'react';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice';
import { useNavigate } from 'react-router-dom';
const DatePickerss = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const city = useSelector((state) => state.hotel.city);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const room = useSelector((state) => state.hotel.options.room)
  const adult = useSelector((state) => state.hotel.options.adult)
  const children = useSelector((state) => state.hotel.options.children)

  const options = useSelector((state) => state.hotel.options)
  const dates = useSelector((state) => state.hotel.dates)



  const handleCitychange = (event) => {
    const value = event.target.value;
    dispatch(hotelSliceactions.setCity(value));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}`);
      const data = response.data;
      dispatch(hotelSliceactions.setsearchCitySuccess(data));
      navigate('/hotellist');
    } catch (error) {
      console.error("Error occurred", error);
      // Handle error
    }
  };

  const handleOption = (name, operation) => {
    dispatch(hotelSliceactions.updateOptions({ name, operation }));
  };
  const handleDateChange = (item) => {
    dispatch(hotelSliceactions.updateDates({ selection: item.selection }))

  }

  return (
    <div className='flex  bg-white flex-col md:flex-row justify-between border mt-8 rounded-md'>
      <div className=' text-gray-300'>
        <input
          type="text"
          value={city}
          placeholder="Where are you going?"
          className="border-none rounded-md"
          onChange={handleCitychange}
        />
      </div>
      <div className="headerSearchItem rounded-md px-4 relative">
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
      <div className="headerSearchItem rounded-md px-4 relative">
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="headerSearchText"
        >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
        {openOptions && (
          <div className="options absolute z-20 ">
            <div className="optionItem ">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">
                  {options.adult}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">
                  {options.children}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  disabled={options.room <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">
                  {options.room}
                </span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="headerSearchItem ">
        <button className=' p-3 bg-custom-green2 text-white' type='submit' onClick={handleSubmit}>Submit</button>
      </div>
    </div>


  );
};

export default DatePickerss;
