import axios from 'axios'
import { Button, Card, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Roomadds = () => {
    const singleData = useSelector((state) => state.hotel.singleData)
    console.log(singleData._id)

    const [photos, setPhotos] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        maxPeople: 0,
        price: 0,
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
        const newRoomNumbers = [...roomNumbers];
        newRoomNumbers[index].unavailableDates.push(dateString);
        setRoomNumbers(newRoomNumbers);
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

            const response = await axios.post(`http://localhost:5000/api/rooms/${singleData._id}/createroom`, formdata)
            const data = response.data
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }






    return (
        <div className='flex-col justify-center items-center'>
            <Card className='flex flex-row mt-16 bg-slate-500 w-96 ml-32' >
                <form onSubmit={handlesubmit} className='flex flex-col justify-start items-center m-3 p-2 gap-2'>
                    <TextInput className='w-full' type='text' name='title' placeholder='enter title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <TextInput className='w-full' type='text' name='description' placeholder='enter description' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    <TextInput className='w-full' type='number' name='maxPeople' placeholder='enter maxpeople' value={formData.maxPeople} onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })} />
                    <TextInput className='w-full' type='number' name='price' placeholder='enter the price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <TextInput className='w-full' type='file' name='photos' onChange={handlPhotochange} multiple />
                    {roomNumbers.map((room, index) => (
                        <div key={index}>
                            <TextInput className='w-full' type='number' placeholder='enter number' name='number' value={room.number} onChange={(e) => handleChangenumber(index, e)} />
                            <TextInput className='w-full' type='date' placeholder='enterdates' name='unavailableDates' value={room.unavailableDates[index]} onChange={(e) => handleChangedate(index, e.target.value)} />
                        </div>
                    ))}



                    <Button type='submit'>submit</Button>


                </form>
            </Card>


        </div>
    )
}

export default Roomadds
