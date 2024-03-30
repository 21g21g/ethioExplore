import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import axios from 'axios'
const HotelAdmin = () => {
    const [photos, setPhotos] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        type: "",
        city: "",
        address: "",
        description: "",
        distance: "",
        cheapestPrice: "",
       
       
    })
   
 const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageData = (event) => {
     const files = Array.from(event.target.files);
  setPhotos(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const formdata = new FormData();

     
    
      for (const photo of photos) {
          formdata.append("photos",photo)
      }
      
    //for...in used for iterate on the object.
      
      for (const key in formData) {
         formdata.append(key,formData[key])
        
        
    }

    try {
      
      const response = await axios.post(
        "http://localhost:5000/api/hotels/createhotel",
        formdata
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
   
    
  return (
      <div className='flex flex-col bg-slate-600 justify-center items-center'>
          <h1 className='text-3xl'>Enter Your Form Completely</h1>
          <form onSubmit={handleSubmit} className='flex flex-col p-3 mt-4 gap-3'>
              <TextInput
                  className="w-full"
                  type='text' name='name'
                  placeholder='enter your name'
                  value={formData.name} onChange={handleChange} />
              <TextInput className="w-full"  type='text' name='title' placeholder='enter the title' value={formData.title} onChange={handleChange} />
              <TextInput className="w-full"  type='text' name='type' placeholder='enter the type' value={formData.type} onChange={handleChange} />
              <TextInput className="w-full"  type='text' name='city' placeholder='enter the city' value={formData.city} onChange={handleChange} />
              <TextInput className="w-full"  type='text' name='address' placeholder='enter the address' value={formData.address} onChange={handleChange} />
              <TextInput className="w-full"  type='text' name='distance' placeholder='enter the distance' value={formData.distance} onChange={handleChange} />
              <TextInput className="w-full" type='text' name='description' placeholder='enter the description' value={formData.description} onChange={handleChange} />
              <TextInput className='w-full' type='file' name='photos' onChange={handleImageData} multiple />

              <TextInput className="w-full" type='number' name='cheapestPrice' placeholder='enter the chipestprice' value={formData.cheapestPrice} onChange={handleChange} />
              {/* //when we add files we cannot use value property due to secuirty issue */}
              <Button type='submit'>Submit</Button>
 </form>
      
    </div>
  )
}

export default HotelAdmin
