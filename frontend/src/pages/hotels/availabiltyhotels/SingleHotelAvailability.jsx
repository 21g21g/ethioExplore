import axios from 'axios'
import { Button, Modal, ModalBody, ModalHeader,TextInput,Label } from 'flowbite-react'
// import { Button, Label, TextInput } from 'flowbite-react'

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import jaka from "../../../assets/jaka.jpg"
import blue from "../../../assets/blue.avif"
import sheratn from "../../../assets/sheratn.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'

const SingleHotelAvailability = () => {
    const [modal,setModal]=useState(false)
    const { id } = useParams()
      console.log(id)
    const dispatch=useDispatch()
    const singleData = useSelector((state) => state.hotel.singleData)
    const startDate = useSelector((state) => state.hotel.startDate)
   
    const endDate = useSelector((state) => state.hotel.endDate)
  
    const room = useSelector((state) => state.hotel.numbers.room)

    const roomData = useSelector((state) => state.hotel.roomData)
    console.log(roomData)
    

    
    const [selectedRooms, setSelectedRooms] = useState([])
  
    const getDateDifference = (start, end) => {
     const getDayDifference = Math.abs(end-start)//this function is used to change the geted value into absolute value in millisuconds
     const getday = Math.ceil(getDayDifference / (1000 * 60 * 60 * 24))
    return getday
    }
//     const handleModal = () => {
//       setModal(true)
//   }

    // useEffect(() => {
    //     const fetchedSigledata = async () => {
    //         const response = await axios.get(`http://localhost:5000/api/hotels/room/${id}`)
    //         const data = response.data
    //         console.log(data)
          
    //         dispatch(hotelSliceactions.setsingleDataSuccess(data))
           
            
            
    //     }
    //     fetchedSigledata()
        
    // }, [])
    
    
    useEffect(() => {
        const fetchRoom = async () => {
            const response = await axios.get(`http://localhost:5000/api/hotels/room/${id}`)
            const data = response.data
            dispatch(hotelSliceactions.setRoomData(data))
            // localStorage.setItem("roomdata",JSON.stringify(data))
            
          

            
        }
        fetchRoom();
        
    }, [])

      const getDatesRange = (startDate, endDate) => {
        const start = new Date(startDate)
          const end = new Date(endDate)
         const ends=new Date(end.getTime())
        const date = new Date(start.getTime())
        let list = []
       
        while (date <= ends) {
            //getDate() is used for inorder to get the current day of the month.
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return list
    }
    const alldates = getDatesRange(startDate, endDate)

    const isAvailable = (roomNumber) => {
        //some function is used for if there is a condition true for one input it returns true.
        return !roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        
       
         
    }
 
  const handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    setSelectedRooms(prevSelectedRooms => {
        // Update selectedRooms based on previous state
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
    return (
        <div className='flex flex-col'>
            
            
            <h1 className='text-3xl self-center text-lime-500'>Select the room you want to reserve:</h1>

             <div className='flex flex-row justify-between'>

            <div className='all-room'>
                {roomData.map((room,index) => (
                    room && (
                        <div key={index} className='room-data'>
                    <div className='room-image'>
                                <img src={blue}/>

                         </div>
                        <div className='room-detail'>
                                <h1>{room.title}</h1>
                                 <p>{room.maxPeople}</p>
                                <p>{room.description}</p>
                                 <p>{room.price}</p>
             
                            </div>  
                            
                                 
                <div className='flex flex-col gap-3'>
                       
                  <div className='flex flex-col'>
                            
                  <div className='flex flex-col gap-3'>
                      {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className='flex flex-row gap-3 ml-5'>
                          <Label className='font-bold'>{roomNumber.number}: </Label>
                          <TextInput type='checkbox'   value={roomNumber._id} onChange={handleCheck} disabled={!isAvailable(roomNumber)}/>
                      </div>
                      
                      ))}
                      </div>
                 </div>
            <button className='book-button'  onClick={handleClick}>Reserv Now</button>
      </div>

                            
                   </div>
                    )
                    
               ))} 
                </div>
           
        </div>
      
       
                         
         
             {/* <div className='flex flex-col space-y-14 items-center  justify-between'>
                    <div className='flex flex-col bg-slate-400'>
                        <p>this room is taken for {getDateDifference(new Date(endDate),new Date(startDate))}-days</p>
                    <p>${room * getDateDifference(new Date(endDate), new Date(startDate)) * singleData.cheapestPrice}({getDateDifference(new Date(endDate), new Date(startDate))}-nights)</p>
                        <Button onClick={handleModal} className='bg-sky-700 text-zinc-100 mt-2 p-5 ml-3 h-6'>reserve or book now</Button>

                 

                </div>
               
            </div> */}
            {/* <Modal show={modal} onClose={()=>setModal(false)}>
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
                         <Button conClick={handleClick}  outline>Reserv Now</Button>
      </div>
                </ModalBody>
            </Modal>  */}
                       

            </div>
  )
}

export default SingleHotelAvailability
