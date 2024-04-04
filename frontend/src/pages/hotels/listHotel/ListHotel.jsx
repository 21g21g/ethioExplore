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
    <div className='flex sm:flex-col  sm:ml-4 sm:mr-4 pl-4 pr-4'>
      <div>
        <h1 className='text-xl md:text-2xl text-green-400 md:self-center md:justify-center md:w-full bg-gray-800 '>This are Hotels,Resorts and Apartamas ocuured in {city}</h1></div>
  
    <div className='flex sm:flex-col  md:flex-row gap-3'>
        <div>
           <form className='flex sm:flex-row md:flex-col bg-slate-500 md:w-72 ml-7 gap-4 mt-4 p-2 h-1/2'>
          <h1>Search</h1>
          <div className='flex sm:flex-col'> <h4>destination</h4>
        <TextInput type='text' placeholder={city}/></div>
       
<div className='flex sm:flex-col'><p>check-in-date</p>
        <TextInput type='text'  placeholder={`${new Date(dates[0].startDate).toLocaleDateString()} to ${new Date(dates[0].endDate).toLocaleDateString()}`}/></div>
        
        <div className='flex sm:flex-col md:flex-row'>
          <p>min price per night</p>
          <TextInput type='number' value={min} onChange={(event)=>{dispatch(hotelSliceactions.setMin(event.target.value))}}/>
        </div>
          <div className='flex sm:flex-col md:flex-row'>
          <p>max price per night</p>
          <TextInput type='number' value={max} onChange={(event)=>{dispatch(hotelSliceactions.setMax(event.target.value))}}/>
        </div>
         <div className='flex sm:flex-col md:flex-row'>
          <p>Adult</p>
           <TextInput type='number' placeholder={options.adult}/>
        </div>
         <div className='flex sm:flex-col md:flex-row'>
          <p>Children</p>
          <TextInput type='number' placeholder={options.children}/>
        </div>
         <div className='flex sm:flex-col md:flex-row'>
          <p>Room</p>
          <TextInput type='number' placeholder={options.room}/>
        </div>
        <button onClick={handleClick}  className='bg-green-500 sm:h-12 sm:m-5 sm:w-24 text-white p-2 cursor-pointer' >search</button>
      </form>
     </div>
      <div className='flex sm:flex-col   p-3'>{fiteredData.map((search) => (
       <SingleCityHotels  key={search._id} data={search}/>
       
      ))}

         
         </div>
      
           
    </div>
  
       </div>
      
  )
}

export default ListHotel
