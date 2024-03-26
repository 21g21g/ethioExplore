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
    const adult = useSelector((state) => state.hotel.numbers.adult)
  const children = useSelector((state) => state.hotel.numbers.children) 
  const room = useSelector((state) => state.hotel.numbers.room)

  const startDate = useSelector((state) => state.hotel.startDate)
  const endDate=useSelector((state)=>state.hotel.endDate)
  const [fiteredData, setFiteredData] = useState(searchCity)
 const handleClick = async() => {
    const response = await axios.get(`http://localhost:5000/api/hotels/gethotels?city=${city}&min=${min}&max=${max}`)
   setFiteredData(response.data)
  
    
  }

   console.log(fiteredData)
     return (
    <div className='flex flex-row gap-3'>
      <form className='flex flex-col bg-slate-500 w-72 ml-7 gap-4 mt-4 p-2 h-1/2'>
        <h1>Search</h1>
        <h4>destination</h4>
        <TextInput type='text' placeholder={city}/>

        <p>check-in-date</p>
        <TextInput type='text'  placeholder={`${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`}/>
        <h3>options</h3>
        <div className='flex flex-row'>
          <p>min price per night</p>
          <TextInput type='number' value={min} onChange={(event)=>{dispatch(hotelSliceactions.setMin(event.target.value))}}/>
        </div>
          <div className='flex flex-row'>
          <p>max price per night</p>
          <TextInput type='number' value={max} onChange={(event)=>{dispatch(hotelSliceactions.setMax(event.target.value))}}/>
        </div>
         <div className='flex flex-row'>
          <p>Adult</p>
           <TextInput type='number' placeholder={adult}/>
        </div>
         <div className='flex flex-row'>
          <p>Children</p>
          <TextInput type='number' placeholder={children}/>
        </div>
         <div className='flex flex-row'>
          <p>Room</p>
          <TextInput type='number' placeholder={room}/>
        </div>
        <Button onClick={handleClick}  className=' text-white p-3' outline>search</Button>
      </form>
      <div className='flex md:flex-col flex-row p-3'>{fiteredData.map((search) => (
       <SingleCityHotels  key={search._id} data={search}/>
       
      ))}

         
         </div>
      
           
    </div>
  
  )
}

export default ListHotel
