import axios from 'axios'
import { Button, Label, TextInput,Modal,ModalBody,ModalHeader } from 'flowbite-react'
// import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hotelSliceactions } from '../../../redux/hotelRedux/hoteSlice'

const HotelReserved = () => {
    const dispatch=useDispatch()
    // const [roomData, setRoomData] = useState([])
   
    const roomData = useSelector((state) => state.hotel.roomData)
    const [selectedRooms, setSelectedRooms] = useState([])
    const startDate=useSelector((state)=>state.hotel.startDate)
    const endDate=useSelector((state)=>state.hotel.endDate)
    const { id } = useParams()
        const [modal,setModal]=useState(false)


    useEffect(() => {
        const fetchRoom = async () => {
            const response = await axios.get(`http://localhost:5000/api/hotels/room/${id}`)
            const data = response.data
            dispatch(hotelSliceactions.setRoomData(data))
            localStorage.setItem("roomdata",JSON.stringify(data))
            
          

            
        }
        fetchRoom();
        
    }, [])
    const getDatesRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        let list = []
        // for (let date = new Date(start.getTime()); date < end; date.setDate(date.getDate(+1))){
        //     list.push(new Date(date).getTime())
        //return list
        // }
        while (date <= end) {
            //getDate() is used for inorder to get the current day of the month.
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return list
    }
    const alldates = getDatesRange(startDate, endDate)
    const isAvailable = (roomNumber) => {
        //some function is used for if there is a condition true for one input it returns true.
        const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
        return !isFound
       
         
    }

    const handleCheck = (event) => {
        const checked = event.target.checked
       
        const value = event.target.value
       
       setSelectedRooms(prevSelectedRooms => (
           checked ? [...prevSelectedRooms, value] : prevSelectedRooms.filter(item => item !== value)
          
       ));
         console.log(selectedRooms)
        
        
    }
    const handleClick = async() => {
        try {
            await Promise.all(  selectedRooms.map((roomid) => {
                const response = axios.put(`http://localhost:5000/api/rooms/availability/${roomid}`, { dates: alldates })
                return response.data
        })
)
        } catch (error) {
            console.log(eror)
        }
      
      
        
    }
    return (
        <div className='flex flex-col'>
                  <div>
          {roomData.map((room) => (
              <div key={room._id}>
                  <h1>{room.title}</h1>  
                  <p>{room.maxPeople}</p>
                  <p>{room.description}</p>
                  <p>{room.price}</p>
                  <div className='flex flex-col gap-3'>
                      {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className='flex flex-row gap-3 ml-5'>
                          <Label>{roomNumber.number}: </Label>
                          <TextInput type='checkbox' value={roomNumber._id} onChange={handleCheck} disabled={!isAvailable(roomNumber)}/>
                      </div>
                      
                      ))}
                      
                        
                  </div>
                  
                  


            </div>
        ))}
    
            </div>
            <Button className='flex p-3' onClick={handleClick}>Reserv Now</Button>
      </div>

  )
}

export default HotelReserved
