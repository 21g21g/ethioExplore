import { useState } from "react";
import travel from "../../assets/tour.png"
import Culture from "./Culture"
import Natural from "./Natural"
import Religious from "./Religious"
const Home = () => {
  const [selectedTab, setSelectedTab] = useState('Culture'); // Default selected tab

  return (
    <div className=' '  >

      <div className="lg:py-10 lg:px-10 relative h-[500px] flex ">
        <div className="flex justify-center items-center">
          {/* Text Content */}
          <div className="w-1/2 text-custom-green4  p-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Welcome to EthioExplore
            </h1>
            <p className="text-xl lg:text-xl mb-8">
              Discover the rich cultural heritage, breathtaking landscapes, and warm hospitality of Ethiopia. Embark on a journey of a lifetime and experience the magic of this diverse and enchanting country.
            </p>
            <div className='flex  gap-2 border items-center shadow-lg  max-w-lg rounded-full p-4'>
              <input type="text" name="" id="" className='flex-1 border-none  px-4 py-2 rounded-l-md focus:outline-none focus:border-none' placeholder='Where do you want to go?' />
              <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          {/* Travel Image */}
          <div className="w-1/2 flex justify-center ">
            <img src={travel} className="" alt="Tourism Logo" />
          </div>
        </div>
      </div>

      <div className="">
        <div className='items-center justify-center text-center flex-col lg:px-32 lg:my-10'>
          <h1 className="text-6xl mb-4 text-custom-green1 font-serif">Most Visited Places</h1>
          <p className='text-slate-300'> discover a range of vacation places in Ethiopia which have very intere
            sting attraction places most of the worlds admire and stay along over there</p>
        </div>
        <div className="flex flex-col items-center ">
          <div className="flex rounded-full border bg-slate-100 w-1/3 p-2 shadow-md  ">
            <ul className="flex gap-4 ">
              {/* the active link Background white */}
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Culture' ? 'bg-white' : ''} transition duration-1000`}
                onClick={() => setSelectedTab('Culture')}
              >
                Culture
              </li>
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Natural' ? 'bg-white' : ''} transition duration-1000`}
                onClick={() => setSelectedTab('Natural')}
              >
                Natural
              </li>
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Religious' ? 'bg-white ' : ''} transition duration-1000`}
                onClick={() => setSelectedTab('Religious')}
              >
                Religious
              </li>
            </ul>
          </div>
          <div className="mt-4">
            {/* Conditionally render the outlet content based on the selected tab */}
            {selectedTab === 'Culture' && (
              <Culture />
            )}
            {selectedTab === 'Natural' && (
              <Natural />
            )}
            {selectedTab === 'Religious' && (
              <Religious />
            )}
          </div>
        </div>

      </div>

      <div className='mt-10 px-12'>
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