import React, { useEffect } from 'react'
import jaka from "../../../assets/jaka.jpg"
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import { useDispatch } from 'react-redux'
const SingleCityHotels = ({ data }) => {
  const photo = `http://localhost:5000/${data.photos[1]}`;
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchedSigledata = async () => {
      dispatch(hotelSliceactions.setsingleDatastart(true))
      const response = await axios.get(`http://localhost:5000/api/hotels/gethotel/${data._id}`)

      dispatch(hotelSliceactions.setSingleHotelData(response.data))



    }
    fetchedSigledata()

  }, [dispatch, data._id])
  useEffect(() => {
    const fetchRoom = async () => {
      const response = await axios.get(`http://localhost:5000/api/hotels/room/${data._id}`)
      console.log(response.data)
      dispatch(hotelSliceactions.setRoomData(response.data))




    }
    fetchRoom();

  }, [dispatch, data._id])

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4 border border-gray-200 shadow-lg rounded-md p-4">
      <div>
        <img src={photo} alt="photo" className="w-48 h-56 object-cover rounded-md" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-blue-500 font-semibold">{data.name}</h1>
          <p className="text-gray-600 font-semibold">{data.distance} from center</p>
          <p className="text-gray-600 font-semibold">Comfortable rooms</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="text-gray-700 font-semibold">{data.rating} <span className="text-gray-500">Rating</span></p>
          <p className="text-green-600 font-semibold">${data.cheapestPrice}</p>
          <Link to={`/hotels/${data._id}`}>
            <Button className="bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md">See Availability</Button>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default SingleCityHotels
