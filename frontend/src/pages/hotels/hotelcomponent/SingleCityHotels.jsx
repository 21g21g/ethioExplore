import React from 'react'
import jaka from "../../../assets/jaka.jpg"
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
const SingleCityHotels = ({ data }) => {
  console.log(data)
  const photo = `http://localhost:5000/${data.photos[1]}`;
  

  console.log(photo)  
    
    
  return (
            <div className='mt-4 flex flex-col md:flex-row gap-2 border border-gray-400'>
          <div>
        {/* {data.photos.map((photo, index) => ( */}
         <img  src={photo} alt="photo" className='w-48 h-40 object-cover' />

        {/* ) */}
{/*                 `


              )} */}
            </div>
            <div className='flex flex-col'>  <h1>{data.title}</h1>
            <p>{data.distance} from center</p>
            <p>this room is the confort room</p></div>
      
               <div className='flex flex-col p-3'>
              <p>{ data.description}</p>
              <p>{data.rating} <span>good</span></p>
              <p>${data.cheapestPrice}</p>
              <Link to={`/hotels/${data._id}`}>
                  <Button className='h-12 bg-teal-500' >See availability</Button>
                    </Link>
           </div>
        
         
          </div>
  )
}

export default SingleCityHotels
