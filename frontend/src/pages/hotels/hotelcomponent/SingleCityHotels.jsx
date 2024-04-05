import React, { useEffect } from 'react'
import jaka from "../../../assets/jaka.jpg"
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import { useDispatch } from 'react-redux'
const SingleCityHotels = ({ data }) => {
  const photo = `http://localhost:5000/${data.photos[1]}`;
  const dispatch=useDispatch()
 
   useEffect(() => {
        const fetchedSigledata = async () => {
            dispatch(hotelSliceactions.setsingleDatastart(true))
      const response = await axios.get(`http://localhost:5000/api/hotels/gethotel/${data._id}`)
          
            dispatch(hotelSliceactions.setSingleHotelData(response.data))
           
            
            
        }
        fetchedSigledata()
        
    }, [dispatch,data._id])
     useEffect(() => {
        const fetchRoom = async () => {
            const response = await axios.get(`http://localhost:5000/api/hotels/room/${data._id}`)
            console.log(response.data)
            dispatch(hotelSliceactions.setRoomData(response.data))
            
          

            
        }
        fetchRoom();
        
    }, [dispatch,data._id])
    
  return (
            <div className='mt-4 flex sm:flex-row sm:gap-1 md:flex-row gap-2 border border-gray-400'>
          <div>
         <img  src={photo} alt="photo" className='w-48 h-40 object-cover' />


            </div>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-sky-400'>{data.title}</h1>
            <p className='font-semibold'>{data.distance} from center</p>
            <p className='font-semibold'>this room is the confort room</p></div>
      
               <div className='flex flex-col gap-1 md:gap-3 md:p-3'>
              <p className='font-semibold'>{ data.description}</p>
              <p className='font-semibold'>{data.rating} <span>good</span></p>
              <p className='font-semibold'>${data.cheapestPrice}</p>
              <Link to={`/hotels/${data._id}`}>
                  <Button className='h-12 sm:h-9 sm:p-2 md:p-0 bg-green-400' >See availability</Button>
                    </Link>
           </div>
        
         
          </div>
  )
}

export default SingleCityHotels
