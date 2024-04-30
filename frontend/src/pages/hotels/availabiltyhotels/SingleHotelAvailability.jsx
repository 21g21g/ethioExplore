import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader,TextInput,Label } from 'flowbite-react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import { useParams } from 'react-router-dom'
import Footer from '../../../components/footer/Footer';


const SingleHotelAvailability = () => {
    const [modal,setModal]=useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.hotel.loading)
    const roomData = useSelector((state) => state.hotel.roomData)
    
    const dates = useSelector((state) => state.hotel.dates)
    const options=useSelector((state)=>state.hotel.options)
    const singleHotelData=useSelector((state)=>state.hotel.singleHotelData)
    const [selectedRooms, setSelectedRooms] = useState([])
  
    const getDateDifference = (start, end) => {
     const getDayDifference = Math.abs(end-start)
     const getday = Math.ceil(getDayDifference / (1000 * 60 * 60 * 24))
    return getday
    }
    const handleModal = () => {
      setModal(true)
  }
         useEffect(() => {
           const fetchedSigledata = async () => {
            dispatch(hotelSliceactions.setsingleDatastart(true))
            const response = await axios.get(`http://localhost:5000/api/hotels/gethotel/${id}`)
          
            dispatch(hotelSliceactions.setSingleHotelData(response.data))
           
            
            
        }
        fetchedSigledata()
        
         }, [dispatch, id])
     useEffect(() => {
        const fetchRoom = async () => {
            const response = await axios.get(`http://localhost:5000/api/hotels/room/${id}`)
            // console.log(response.data)
            dispatch(hotelSliceactions.setRoomData(response.data))
            
          

            
        }
        fetchRoom();
        
    }, [dispatch,id])
    


      const getDatesRange = (startDate, endDate) => {
        const start = new Date(startDate)
          const end = new Date(endDate)
         const ends=new Date(end.getTime())
        const date = new Date(start.getTime())
        let list = []
       
        while (date <= ends) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return list
    }
    const alldates = getDatesRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        
        return !roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        
       
         
    }
 
  const handleCheck = (event) => {
    const checked = event.target.checked;
      const value = event.target.value;
     
    
          setSelectedRooms(prevSelectedRooms => {
        return checked ? [...prevSelectedRooms, value] : prevSelectedRooms.filter(select => select !== value);
    });   
    
      

   

   
};
    const handleClick = async () => {
        if (selectedRooms.length >options.room) {
            toast.error(`you cannot select more than ${options.room} number of room you select because are ${options.room}` )
        }
        else {
            try {
               await Promise.all(selectedRooms.map(async(roomid) => {
                const response =await axios.put(`http://localhost:5000/api/rooms/availability/${roomid}`,  { dates: alldates } )
                const data = response.data
                   return data
                   
             
            })
                
                  )
           
            
            
              }
              catch (error) {
            console.log(error)
        }
        }
              
      
      
        
    }
 
        return (
      
            <div className='flex flex-col'>
                {/* {loading&&<p>Loading...</p>} */}
                       
                <div className='flex flex-col m-4'>
                    <div className='flex flex-row justify-between'>
                     
                    <div className='flex flex-col md:flex-row justify-between'>
                        
              <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold'>{singleHotelData.title}.</h1>
                    <p className='font-semibold'>{singleHotelData.address}.</p>
                  <p className='text-blue-500'>Excellent location-{singleHotelData.distance} from the center.</p>
                  <p className='text-emerald-500'>Book a room over ${singleHotelData.cheapestPrice} and enjoy yourself.</p>
                </div>
                        </div>
                       
                    </div>
                    
                <div className='grid grid-cols-2 md:grid-cols-4 md:self-center flex-wrap gap-4 '>
                    {singleHotelData.photos.map((photo) => (
                         <img src={`http://localhost:5000/${photo}`} className='w-full md:w-48 h-40 object-cover' />  
                    ))}
                   
                   
             
           
            </div>
            
                    <div className='flex flex-row mt-2 justify-between'>
                        
                        {/*    */}
                        <div className='flex'>
                            <div className='w-1/2'><p>{singleHotelData.description.replace(/<[^>]*>/g, '')}</p></div>
                        <div className='flex flex-col p-4 bg-slate-300 w-1/4'>
                        <p>this room is taken for {getDateDifference(new Date(dates[0].endDate),new Date(dates[0].startDate))}-days</p>
                            <p>${options.room * getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) * singleHotelData.cheapestPrice}({getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))}-nights)</p>
                            
                            <div>
                                
                            <button onClick={handleModal} className=' text-zinc-100 mt-2  ml-3 h-6 cursor-pointer bg-custom-green2 rounded-md w-full'>reserve now</button>
                                </div>
                      
                 

               
            </div></div>
                    
          </div>
            
               
            

            </div>

            
                    
            <Modal show={modal} onClose={() => setModal(false)}>
      <ModalHeader>
        <h1 className='text-3xl'>Select the room you want to reserve:</h1>
      </ModalHeader>
      <ModalBody>
        <div className='flex flex-col'>

          {roomData.map((room) => (
            room && (
              <div key={room._id} className='flex flex-col lg:flex-row items-start gap-6 p-4 border border-gray-200 rounded-md'>
                
                {/* Room Image and Description */}
                <div className='lg:w-1/2'>
                  <img className='w-full mb-4 rounded-md' src={`http://localhost:5000/${room.photos[0]}`} alt='Room Photo' />
                  <p className='text-lg'>{room.description.replace(/<[^>]*>/g, '')}</p>
                </div>

                {/* Room Details and Selection */}
                <div className='lg:w-1/2'>
                  <h1 className='text-xl font-semibold'>{room.title}</h1>
                  <p className='text-lg font-semibold text-green-500'>Max Capacity: {room.maxPeople}</p>

                  {/* Room Number Selection */}
                  <div className='mt-4'>
                    {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className='flex items-center mb-2'>
                        <Label className='font-bold'>{roomNumber.number}:</Label>
                        <TextInput
                          type='checkbox'
                          value={roomNumber._id}
                          onChange={handleCheck}
                          disabled={!isAvailable(roomNumber)}
                          className='ml-2'
                        />
                      </div>
                    ))}
                  </div>

                  {/* Reserve Button */}
                  <button
                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4'
                    onClick={handleClick}
                  >
                    Reserve Now
                  </button>
                </div>

              </div>
            )
          ))}

        </div>
      </ModalBody>
    </Modal>
                
                <Footer/>

            </div>
  )
        
    }
    


export default SingleHotelAvailability
