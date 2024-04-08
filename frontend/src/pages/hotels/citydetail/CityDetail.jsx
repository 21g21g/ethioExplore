
import React, { useEffect } from 'react'
import Header from '../../../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import axios from 'axios'
const CityDetail = () => {
    const dispatch = useDispatch()
    const detailHotel = useSelector((state) => state.hotel.detailHotel)
    
   
    const location = useLocation()
    const split = location.pathname.split("/")
    const city = split[split.length - 1]
    //
    useEffect(() => {
        const fetchedSigledata = async (id) => {
            // console.log(id)
            dispatch(hotelSliceactions.setsingleDatastart(true))
            const response = await axios.get(`http://localhost:5000/api/hotels/gethotel/${id}`)
          
            dispatch(hotelSliceactions.setSingleHotelData(response.data))
           
            
            
        }
           detailHotel.forEach((hotel) => {
            fetchedSigledata(hotel._id)

        })
            
    
        
    }, [detailHotel,dispatch]
    );

    
   
    


  return (
    <div>
          <Header />
          <div className='mt-3 mb-4 text-custom-green1 text-2xl font-serif text-center' >
             <h1 >Hotels Found In {city} City</h1>
     
            <div className="grid grid-cols-2  mt-3 md:grid-cols-3 mx-auto pl-4 pr-4">
          {detailHotel.map((detail,index) => (
            <div key={index} className="flex flex-col flex-wrap ">
              
              <div className='p-2'>
               
                <img className="w-60 md:w-96 h-40 object-cover " src={`http://localhost:5000/${detail.photos[1]}`}/>

              
                  </div >
                  <div className='flex flex-col  '>
                      <p className="text-xl">{detail.name}</p>
              <h1 className="text-xl">{detail.type}</h1>
                  <p className="text-xl">${detail.cheapestPrice}</p>
                  <Link to={`/hotels/${detail._id}`}>
         <button className="bg-green-500 text-slate-200 hover:bg-green-600 hover:text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">availability </button>
           </Link></div>
             
                  
              
                  
              </div>
              
          ))}
    </div>

       </div>    
    </div>
  )
}

export default CityDetail
