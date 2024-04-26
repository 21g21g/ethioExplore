import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader,TextInput,Label } from 'flowbite-react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import {  useParams } from 'react-router-dom'


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
      
            <div className='flex flex-row justify-between'>
                {loading&&<p>Loading...</p>}
                       
         <div className='flex flex-col m-4'>
          <div className='flex flex-col md:flex-row justify-between'>
              <div className='flex flex-col'>
                    <p>{singleHotelData.title}</p>
                    <p>{singleHotelData.address}</p>
                  <p>Excellent location-{singleHotelData.distance} from the center</p>
                  <p>book ${singleHotelData.cheapestPrice}</p>
                </div>
            </div>
                <div className='grid grid-cols-2 md:grid-cols-4 md:self-center flex-wrap gap-4'>
                    {singleHotelData.photos.map((photo) => (
                         <img src={`http://localhost:5000/${photo}`} className='w-full md:w-48 h-40 object-cover' />  
                    ))}
                   
                   
             
           
            </div>
            
                    <div className='flex flex-row mt-2 justify-between'>
                        
                    <p>{singleHotelData.description.replace(/<[^>]*>/g, '')}</p>  
                    <div className='flex flex-col p-4 bg-slate-400'>
                        <p>this room is taken for {getDateDifference(new Date(dates[0].endDate),new Date(dates[0].startDate))}-days</p>
                        <p>${options.room * getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) * singleHotelData.cheapestPrice}({getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))}-nights)</p>
                        <div className='bg-custom-green2 p-2 rounded-lg '>
                            <button onClick={handleModal} className=' text-zinc-100 mt-2  ml-3 h-6 cursor-pointer'>reserve now</button>
</div>
                      
                 

               
            </div>
          </div>
            
               
            

            </div>

            
                    
            <Modal show={modal} onClose={()=>setModal(false)}>
                <ModalHeader>
                     <h1 className='text-3xl'>Select the room you want to reserve:</h1>
                </ModalHeader>
                <ModalBody>
                    <div className='flex flex-col'>
                       
                  <div className='flex flex-col'>
                            {roomData.map((room) => (
              room&&(<div key={room._id} className='flex flex-row gap-10'>

                  <div className='flex flex-col'> <h1>{room.title}</h1>  
                  <p>{room.maxPeople}</p>
                  <p>{room.description.replace(/<[^>]*>/g, '')}  </p>
                  <p>{room.price}</p></div>
                 
                  <div className='flex flex-col gap-3'>
                      {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className='flex flex-row gap-3 ml-5'>
                          <Label className='font-bold'>{roomNumber.number}: </Label>
                          <TextInput type='checkbox'   value={roomNumber._id} onChange={handleCheck} disabled={!isAvailable(roomNumber)}/>
                      </div>
                      
                      ))}
                      
                        
                  </div>
                  
                  


            </div>)
              
        ))}
    
                        </div>
                         <button className='bg-custom-green2 w-40 self-center rounded-sm' onClick={handleClick}  outline>Reserv Now</button>
      </div>
                </ModalBody>
            </Modal>  

            </div>
  )
        
    }
    


export default SingleHotelAvailability
