import React from 'react';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-cover bg-center h-1/2" style={{ backgroundImage: `url("path/to/your/image.jpg")` }}>
        <div className="text-green-400 text-center py-16 px-4">
          <h1 className="text-4xl font-bold">Breathtaking Landscapes</h1>
        </div>
      </div>
      <div className="flex flex-col justify-between p-8 space-y-8">
        <div className="flex">
          <div className="w-2 bg-green-300 mr-4 rounded-md"></div>
          <div className="flex flex-col space-y-4 rounded-md bg-white p-4">
            <div className="flex items-center space-x-2 ">
              <h2 className="text-2xl font-bold">1.</h2>
              <p className="text-2xl font-bold">Majestic Mountains</p>
            </div>
            <p className="text-blue-900">Hike through the towering peaks of the Simien Mountains, where you'll find stunning vistas and diverse wildlife.</p>
            <p className="text-gray-700">Hike through the towering peaks of the Simien Mountains, where you'll find stunning vistas and diverse wildlife.</p>
            <p className="text-gray-700">Hike through the towering peaks of the Simien Mountains, where you'll find stunning vistas and diverse wildlife.</p>
          </div>
        </div>
        <div className="flex">
        <div className="w-2 bg-green-300 mr-4 rounded-md"></div>
          <div className="flex flex-col space-y-4 rounded-md bg-white p-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">2.</h2>
              <p className="text-2xl font-bold">Serene Lakes</p>
            </div>
            <p className="text-gray-700">Gaze upon the serene waters of Lake Tana, the source of the Blue Nile, and explore the ancient monasteries on its islands.</p>
          </div>
        </div>
        <div className="flex">
        <div className="w-2 bg-green-300 mr-4 rounded-md"></div>
          <div className="flex flex-col space-y-4 rounded-md bg-white p-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">3.</h2>
              <p className="text-2xl font-bold">Dramatic Valleys</p>
            </div>
            <p className="text-gray-700">Marvel at the dramatic Danakil Depression, a surreal landscape of salt flats, active volcanoes, and colorful mineral deposits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
