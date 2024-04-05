import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleCityHotels from '../hotelcomponent/SingleCityHotels'
import { useLocation } from 'react-router-dom'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import axios from 'axios'

const ListHotel = () => {
 
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.hotel.loading)
  const error = useSelector((state) => state.hotel.error)
  const min = useSelector((state) => state.hotel.min)
  const max = useSelector((state) => state.hotel.max)
  const searchCity=useSelector((state)=>state.hotel.searchCity)
  const city = useSelector((state) => state.hotel.city)
  
  const options=useSelector((state)=>state.hotel.options)

  const dates=useSelector((state)=>state.hotel.dates)
 
  const [fiteredData, setFiteredData] = useState(searchCity)
 const handleClick = async() => {
    const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}&min=${min}&max=${max}`)
   setFiteredData(response.data)
  
    
  }
    return (
   

      <div className='flex flex-col md:flex-row gap-3 md:p-4 sm:p-2 sm:mr-3 justify-between'>
        <div className='p-4  md:w-2/4 '>
          <form className='bg-slate-500 mt-4 p-2 '>
            <h1>Search</h1>
            <div className='flex flex-col'>
              <h4>Destination</h4>
              <TextInput type='text' placeholder={city} />
            </div>
            <div className='flex flex-col'>
              <p>Check-in-date</p>
              <TextInput type='text' placeholder={`${new Date(dates[0].startDate).toLocaleDateString()} to ${new Date(dates[0].endDate).toLocaleDateString()}`} />
            </div>
            <div className='flex flex-col'>
              <p>Min price per night</p>
              <TextInput type='number' value={min} onChange={(event) => { dispatch(hotelSliceactions.setMin(event.target.value)) }} />
            </div>
            <div className='flex flex-col'>
              <p>Max price per night</p>
              <TextInput type='number' value={max} onChange={(event) => { dispatch(hotelSliceactions.setMax(event.target.value)) }} />
            </div>
            <div className='flex flex-col'>
              <p>Adult</p>
              <TextInput type='number' placeholder={options.adult} />
            </div>
            <div className='flex flex-col'>
              <p>Children</p>
              <TextInput type='number' placeholder={options.children} />
            </div>
            <div className='flex flex-col'>
              <p>Room</p>
              <TextInput type='number' placeholder={options.room} />
            </div>
            <Button onClick={handleClick} className='bg-green-500 text-white p-2 mt-4'>Search</Button>
          </form>
        </div>
        
        <div className='flex flex-col p-3'>
          {fiteredData.map((search) => (
            <SingleCityHotels key={search._id} data={search} />
          ))}
        </div>
      </div>
  );

}

export default ListHotel
