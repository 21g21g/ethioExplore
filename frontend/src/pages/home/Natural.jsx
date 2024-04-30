import React from 'react';

const Natural = () => {
  // Sample data for popular natural wonders in Ethiopia
  const naturalWonders = [
    {
      name: "Simien Mountains",
      image: "https://mediaim.expedia.com/destination/1/52d3ea2cd95048e40e49a89cf50874c4.jpg",
      description: "The Simien Mountains, located in northern Ethiopia, are a UNESCO World Heritage Site known for their stunning scenery, including rugged peaks, deep valleys, and unique wildlife such as the Gelada baboon and Ethiopian wolf.",
    },
    {
      name: "Danakil Depression",
      image: "https://ethiotargettravelandtours.com/wp-content/uploads/Danakil-Depression-adventure-tours-Ethio-target-tours-and-travel.jpg",
      description: "The Danakil Depression, one of the hottest and lowest places on Earth, is a unique geological wonder in northeastern Ethiopia. It features otherworldly landscapes with colorful sulfur springs, salt flats, and active volcanoes.",
    },
    {
      name: "Blue Nile Falls",
      image: "https://previews.123rf.com/images/hecke/hecke1703/hecke170300304/74180961-hanging-bridge-over-the-blue-nile-in-ethiopia.jpg",
      description: "The Blue Nile Falls, also known as 'Tis Issat' in Amharic, is a majestic waterfall located on the Blue Nile River in northern Ethiopia. It is one of the country's most iconic natural attractions, especially during the rainy season when it reaches its full splendor.",
    },
    {
      name: "Omo national park",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/f4/26/c1/omo-national-park-and.jpg?w=1200&h=-1&s=1",
      description: "Omo National Park is a national park in Ethiopia founded in 1980. Located in the Southern Nations, Nationalities, and Peoples' Region on the west bank of the Omo River, the park covers approximately 4,068 square kilometers, about 870 kilometers southwest of Addis Ababa; across the Omo is the Mago National Park and the Tama Wildlife Reserve. Although an airstrip was recently built near the park",
    },
    // Add more natural wonders here...
  ];


  return (
    <div className="w-full rounded-md mt-8 flex flex-col items-center">
      <h1 className="text-6xl font-bold py-4">Popular Natural Wonders in Ethiopia</h1>
      <p className='px-4 lg:px-32 py-6 lg:py-10 text-lg lg:text-xl text-green-500 bg-gray-50 my-3 rounded-lg'>
        Ethiopia boasts a diverse array of natural wonders that captivate the imagination and stir the soul. From the rugged peaks of the Simien Mountains, a UNESCO World Heritage Site teeming with unique wildlife and breathtaking vistas, to the otherworldly landscapes of the Danakil Depression, one of the hottest and lowest places on Earth adorned with colorful sulfur springs and active volcanoes, Ethiopia's natural wonders offer a glimpse into the Earth's most awe-inspiring creations. The majestic Blue Nile Falls, known as "Tis Issat" in Amharic, cascade dramatically over basalt cliffs, creating a mesmerizing spectacle that symbolizes the country's abundant natural beauty. With its rich biodiversity, dramatic landscapes, and geological marvels, Ethiopia's natural wonders are a testament to the country's remarkable diversity and allure
      </p>

      <div className="flex flex-col gap-4 w-full" >
        {/* Additional cards with text overlay */}
        <div className="flex flex-col sm:flex-row w-full justify-between space-y-4 sm:space-y-0 sm:space-x-4 h-[300px]">
          <div className="flex-grow relative bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://www.ameco.et/english/wp-content/uploads/2023/06/20230629_120057.jpg" alt="First Natural Wonder" className="w-full h-fit" />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
              <h2 className="text-2xl font-bold">Ye Minilik Meskot</h2>
            </div>
          </div>
          <div className="flex-grow relative bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://previews.123rf.com/images/marishasl/marishasl1904/marishasl190400003/127478836-beautiful-view-of-blue-nile-falls-waterfall-on-the-blue-nile-river-nature-and-travel-ethiopia-amhara.jpg" alt="Second Natural Wonder" className="w-full h-fit" />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
              <h2 className="text-2xl font-bold">Blue Nile Fall</h2>
            </div>
          </div>
          <div className="flex-grow relative bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://www.ytravelblog.com/wp-content/uploads/2023/02/travel-advice-for-ethiopia.jpg" alt="Third Natural Wonder" className="w-full h-fit object-fill" />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
              <h2 className="text-2xl font-bold">Semien Mauntain</h2>
            </div>
          </div>
        </div>

        {/* Rendering natural wonders from the data */}
        {naturalWonders.map((wonder, index) => (
          <div key={index} className="flex flex-col sm:flex-row space-x-2 rounded-lg shadow-md overflow-hidden">
            <img src={wonder.image} alt={wonder.name} className="w-full sm:w-1/3 h-[300px] object-cover" />
            <div className="p-4 flex flex-col  space-y-2 sm:space-y-0 sm:ml-4">
              <h2 className="text-xl font-bold mb-2">{wonder.name}</h2>
              <p>{wonder.description}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Natural;
