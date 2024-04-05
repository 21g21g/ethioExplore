import React from 'react';

const Home = () => {
  return (
    <div className='lg:mx-20 md:my-6  lg:my-2 lg:px-10' >

      <div className="bg-green-900 lg:px-10 relative h-96 flex justify-center items-center">
        {/* Background Image */}
        <img
          src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/F7Q_YokH2DOE79Pd.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />


        {/* Text Content */}
        <div className="text-white text-center z-10">
          <h1 className=" lg:text-4xl font-bold mb-6 text-white font-sans">
            Welcome to Ethiopian Tourism
          </h1>
          <p className="lg:text-xl mb-8  font-mono">
            Discover the rich cultural heritage, breathtaking landscapes, and warm hospitality of Ethiopia. Embark on a journey of a lifetime and experience the magic of this diverse and enchanting country.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-500 px-6 py-3 rounded-md hover:bg-green-100 hover:text-green-600 transition duration-300">Explore More</button>
            <button className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition duration-300">Contact Us</button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div>

        <h1 className='lg:text-3xl text-custom-green2 font-serif px-6'>Most popular places in ethiopia</h1>
        </div>
        <div className='flex lg:my-4 '>
          <div className='flex-col px-3   '>
            <img
              src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/fnypHNfEc7kDpqBw.jpg"
              alt="Background"
            />
            Lalibela
          </div>
          <div className='flex-col px-3  '>
            <img
              src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/QCNzlB75JNcvvtOW.jpg"
              alt="Background"
            />
            Gondar
          </div>

        </div>
        <div className='px-6'>

          <h1 className=' lg:text-3xl text-custom-green2 font-serif'>Explore our beautiful country</h1>
        </div>
        <div className='items-center justify-center w-full  gap-4 flex my-4 bg-green-50'>
          <div className='flex-col px-3 py-4 shadow-md  '>
            <img
              src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/avwhLh9CqKHxtg1v.jpg"
              alt="Background"

            />
            <h1 className='lg:text-3xl text-custom-green2 py-4'>

              Diverse Landscapes
            </h1>

            From the Simien Mountains to the Danakil Depression, Ethiopia boasts a wide range of landscapes, each with its own unique beauty and natural wonders.
          </div>
          <div className='flex-col px-3 py-4 shadow-md cursor-pointer  '>
            <img
              src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/MoCJEd6CRA76-hYy.jpg"
              alt="Background"

            />

            <h1 className='lg:text-3xl text-custom-green2 py-4'>

              Rich Heritage
            </h1>
            Explore the awe-inspiring historical sites and discover the ancient traditions that have been preserved for centuries.
          </div>
          <div className='flex-col px-3 py-4 shadow-md  '>
            <img
              src="https://cdn.gamma.app/xr3f49tj2j7z1i2/generated-images/QCNzlB75JNcvvtOW.jpg"
              alt="Background"

            />

            <h1 className='lg:text-3xl text-custom-green2 py-4'>

              Natural Wonders
            </h1>
            Witness the spectacular waterfalls and natural wonders that make Ethiopia a truly mesmerizing destination.
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
