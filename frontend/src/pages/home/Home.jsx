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

      <div className=" ">
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
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Culture' ? 'bg-white' : ''} transition duration-500`}
                onClick={() => setSelectedTab('Culture')}
              >
                Culture
              </li>
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Natural' ? 'bg-white' : ''} transition duration-500`}
                onClick={() => setSelectedTab('Natural')}
              >
                Natural
              </li>
              <li
                className={`text-custom-green5 font-serif cursor-pointer px-4 py-2 rounded-full ${selectedTab === 'Religious' ? 'bg-white ' : ''} transition duration-500`}
                onClick={() => setSelectedTab('Religious')}
              >
                Religious
              </li>
            </ul>
          </div>
          <div className="mt-4 w-full px-10 rounded-md">
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

    </div>
  );
};

export default Home;