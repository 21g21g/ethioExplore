import React, { useState } from 'react'
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { hotelSliceactions } from '../../redux/hotelRedux/hoteSlice'
import ButtonReuse from '../hotels/hotelcomponent/ButtonReuse';
import { useDispatch, useSelector } from 'react-redux'
const Rooms = () => {
  const view = useSelector((state) => state.hotel.view)
  const dispatch = useDispatch()
  const id = JSON.parse(localStorage.getItem("hoid"))
  // console.log(id)
    const [photos, setPhotos] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        maxPeople: '',
        price: '',
    })
    const [roomNumbers, setRoomNumbers] = useState([
        {
            number: "",
            unavailableDates: [],
        }
    ])
    const handlPhotochange = (event) => {
        const files = Array.from(event.target.files);
        setPhotos(files);

    }
    const handleChangenumber = (index, e) => {

        const newRoomNumbers = [...roomNumbers];
        newRoomNumbers[index].number = e.target.value;
        setRoomNumbers(newRoomNumbers);


    }

   const handleChangedate = (index, dateString) => {
    setRoomNumbers(prevRoomNumbers => {
        const newRoomNumbers = [...prevRoomNumbers];
        newRoomNumbers[index] = {
            ...newRoomNumbers[index],
            unavailableDates: [...newRoomNumbers[index].unavailableDates, dateString]
        };
        return newRoomNumbers;
    });
};

    const formatISODate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    const handlesubmit = async (event) => {
        event.preventDefault()
        const formdata = new FormData()
        for (const photo of photos) {
            formdata.append("photos", photo)
        }
        for (const key in formData) {
            formdata.append(key, formData[key])
        }
        const formattedRoomNumbers = roomNumbers.map(room => ({
            ...room,
            unavailableDates: room.unavailableDates.map(date => formatISODate(date))
        }));
        formdata.append("roomNumbers", JSON.stringify(formattedRoomNumbers));


        // console.log([...formdata.entries()])

        try {

            const response = await axios.post(`http://localhost:5000/api/rooms/${id}/createroom`, formdata)
          const data = response.data
          console.log(data)
           dispatch(hotelSliceactions.setView(false))
            
        } catch (error) {
            console.log(error)
        }

    }



  
  const handleView = () => {
        dispatch(hotelSliceactions.setView(true))
    }
   

  return (
    <div className='form-add'>
      <ButtonReuse className="btn" onClick={handleView} text="Add Room"/>
      {view && (
        <div className='flex flex-col w-full items-center'>
          <h1 className='text-3xl'>Enter Your Room's Data's</h1>
            <form onSubmit={handlesubmit} className='flex flex-col w-full justify-start items-center m-3 p-2 gap-2'>
            <input className='w-full' type='text' name='title' placeholder='enter title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            
            <ReactQuill
             
             theme="snow"
             placeholder="write description..."
             onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
          required
          className="h-72 mb-10 w-full"
        />
                   
                    <input className='w-full' type='number' name='maxPeople' placeholder='enter maxpeople' value={formData.maxPeople} onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })} />
                    <input className='w-full' type='number' name='price' placeholder='enter the price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <input className='w-full' type='file' name='photos' onChange={handlPhotochange} multiple />
                    {roomNumbers.map((room, index) => (
                        <div key={index} className='flex gap-1'>
                            <input className='w-full' type='number' placeholder='enter number' name='number' value={room.number} onChange={(e) => handleChangenumber(index, e)} />
                           <input
                    className='w-full'
                         type='date'
                       placeholder='enter dates'
                           value={room.unavailableDates[index] || ''}
                           onChange={(e) => handleChangedate(index, e.target.value)}
        />
                        </div>
                    ))}


                  <ButtonReuse className="btn self-center" type="submit" text="submit"/>
                   


                </form>

          
      </div>


      )}

    </div>

  )
}

export default Rooms