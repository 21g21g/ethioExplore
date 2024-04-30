import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ButtonReuse from '../hotels/hotelcomponent/ButtonReuse';
import { hotelSliceactions } from '../../redux/hotelRedux/hoteSlice';
const Hotels = () => {
   
    const view = useSelector((state) => state.hotel.view)
    const dispatch=useDispatch()
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
   


  const handleImageData = (event) => {
    const files = Array.from(event.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();



    for (const photo of photos) {
      formdata.append("photos", photo)
    }

    //for...in used for iterate on the object.

    for (const key in formData) {
      formdata.append(key, formData[key])


    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/hotels/createhotel",
        formdata,
      );

      const data = response.data;
      console.log(data);
      dispatch(hotelSliceactions.setView(false))
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleView = () => {
    dispatch(hotelSliceactions.setView(true))
  }

  return (
      <div className='form-add'>
          <ButtonReuse className="btn" onClick={handleView} text="Add Hotel"/>
          {view ? (
              <div className='flex flex-col w-full items-center'>
          <h1 className='text-3xl'>Enter Your Hotel Data's</h1>
                  <form onSubmit={handleSubmit} className='flex flex-col w-full p-3 mt-4 gap-3'>
                      <div className='flex gap-3 flex-col md:flex-row'>
                          <div>
                            <input
                  className="w-full mt-1"
                  type='text' name='name'
                  placeholder='enter hotel name'
                  value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} />
              <input className="w-full  mt-1"  type='text' name='title' placeholder='enter the title' value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
              <input className="w-full  mt-1"  type='text' name='type' placeholder='enter the type' value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})} />    
                          </div>
                          <div> <input className="w-full  mt-1"  type='text' name='city' placeholder='enter the city' value={formData.city} onChange={(e)=>setFormData({...formData,city:e.target.value})} />
              <input className="w-full  mt-1"  type='text' name='address' placeholder='enter the address' value={formData.address} onChange={(e)=>setFormData({...formData,address:e.target.value})} />
                      <input className="w-full  mt-1" type='text' name='distance' placeholder='enter the distance' value={formData.distance} onChange={(e) => setFormData({ ...formData, distance: e.target.value })} />
                       <input className="w-full  mt-1" type='number' name='cheapestPrice' placeholder='enter the chipestprice' value={formData.cheapestPrice} onChange={(e)=>setFormData({...formData,cheapestPrice:e.target.value})} /></div>
                      </div>
            
             
             <ReactQuill
             theme="snow"
             placeholder="write description..."
             onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
          required
          className="h-72 mb-10"
        />
              <input className='w-full' type='file' name='photos' onChange={handleImageData} multiple />

             
             <ButtonReuse className="btn self-center" type="submit" text="submit"/>
 </form>
      
    </div>
          ) :
              <div>
                  <h1>gebeyehu assea</h1>
              </div>}
          
          
    </div>
  )
}

export default Hotels
