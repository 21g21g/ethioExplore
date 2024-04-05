import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader,TextInput,Label } from 'flowbite-react'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'
import {  useParams } from 'react-router-dom'



const SingleHotelAvailability = () => {
    const [modal,setModal]=useState(false)
    const { id } = useParams()
      console.log(id)
    const dispatch = useDispatch()
    const loading=useSelector((state)=>state.hotel.loading)
    const roomData = useSelector((state) => state.hotel.roomData)
    const dates = useSelector((state) => state.hotel.dates)
    const options=useSelector((state)=>state.hotel.options)
     const singleData = useSelector((state) => state.hotel.singleData)

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
            const data = response.data
            console.log(data)
          
            dispatch(hotelSliceactions.setsingleDataSuccess(data))
           
            
            
        }
        fetchedSigledata()
        
    }, [dispatch,id])
    
    
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await axios.get(`http://localhost:5000/api/hotels/room/${id}`)
            const data = response.data
            dispatch(hotelSliceactions.setRoomData(data))
            
          

            
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
        //some function is used for if there is a condition true for one input it returns true.
        return !roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        
       
         
    }
 
  const handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    setSelectedRooms(prevSelectedRooms => {
        return checked ? [...prevSelectedRooms, value] : prevSelectedRooms.filter(select => select !== value);
    });

   
};
              const handleClick = async() => {
              try {
               await Promise.all(selectedRooms.map(async(roomid) => {
                const response =await axios.put(`http://localhost:5000/api/rooms/availability/${roomid}`,  { dates: alldates } )
                const data = response.data
                   return data
                   
             
            })
                
                  )
           
            
            
        } catch (error) {
            console.log(error)
        }
      
      
        
    }

    if (!singleData || !roomData) {
        return <div>Loading...</div>
    }
    else {
        return (
      
            <div className='flex flex-row justify-between'>
                {loading&&<p>Loading...</p>}
                       
         <div className='flex flex-col m-4'>
          <div className='flex flex-col md:flex-row justify-between'>
              <div className='flex flex-col'>
                    <p>{singleData.title}</p>
                    <p>{singleData.address}</p>
                  <p>Excellent location-{singleData.distance} from the center</p>
                  <p>book ${singleData.cheapestPrice}</p>
                </div>
            </div>
                <div className='grid grid-cols-2 md:grid-cols-3 flex-wrap gap-4'>
                    {singleData.photos.map((photo) => (
                         <img src={`http://localhost:5000/${photo}`} className='w-full md:w-48 h-40 object-cover' />  
                    ))}
                   
                   
             
           
            </div>
            
          <div className='flex flex-row mt-2 justify-between'>
                    <p>{singleData.description}</p>  
                    <div className='flex flex-col p-4 bg-slate-400'>
                        <p>this room is taken for {getDateDifference(new Date(dates[0].endDate),new Date(dates[0].startDate))}-days</p>
                        <p>${options.room * getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate)) * singleData.cheapestPrice}({getDateDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))}-nights)</p>
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
                  <p>{room.description}</p>
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
                         <Button onClick={handleClick}  outline>Reserv Now</Button>
      </div>
                </ModalBody>
            </Modal>  

            </div>
  )
        
    }
    
}

export default SingleHotelAvailability
