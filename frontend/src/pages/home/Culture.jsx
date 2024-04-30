import React from 'react';

const Culture = () => {
  const cultures = [
    {
      name: 'Oromo Culture',
      description: 'The Oromo people have a rich cultural heritage, with traditions that date back centuries. They are known for their vibrant music, colorful clothing, and unique ceremonies.',
      imageUrl: 'https://ich.unesco.org/img/photo/thumb/10124-BIG.jpg',
    },
    {
      name: 'Amhara Culture',
      description: 'The Amhara people are one of Ethiopia\'s largest ethnic groups, with a rich cultural heritage that includes traditional music, dance, and art. They are known for their colorful celebrations and festivals.',
      imageUrl: 'https://zehabesha.com/wp-content/uploads/2022/08/EgAf8XKXkAEJpC8.jpg.webp',
    },
    {
      name: 'Sidama culture',
      description: 'The Sidama people of Ethiopia possess a rich and vibrant culture deeply rooted in tradition and community values. Renowned for their distinct language, Sidamu, and their intricate weaving techniques, Sidama artisans create intricate textiles that reflect their cultural heritage. Music and dance play integral roles in Sidama ceremonies and celebrations, with rhythmic drumming and energetic movements embodying their spirit of unity and joy. Traditional cuisine, featuring staples like injera (a sourdough flatbread) and spicy stews, showcases the regions agricultural abundance and culinary prowess.The Sidama people also hold a deep reverence for their ancestral beliefs and rituals, with ceremonies honoring spirits and ancestors serving as important markers of their cultural identity.Throughout their history, the Sidama have maintained a strong sense of solidarity and resilience, embodying the essence  of Ethiopias diverse and dynamic cultural landscape.',
      imageUrl: 'https://visitsidama.travel/wp-content/uploads/2021/06/Fiche-Chambalala.jpg',
    },
    // Add day property for other cultures...
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-4xl">
        <h2 className="text-4xl lg:text-6xl font-semibold mb-8 text-center text-custom-green4 py-6">Explore Ethiopian Cultures</h2>
        <p className="text-lg lg:text-xl text-center py-6 text-custom-green5 mb-3">Oromo: The Oromo people are the largest ethnic group in Ethiopia, known for their vibrant music, traditional dance, and rich oral literature. They have a distinct cultural identity and language. Amhara: The Amhara people have historically played a significant role in Ethiopian politics, culture, and language. They have a rich tradition of poetry, music, and religious practices, often associated with the Ethiopian Orthodox Church. Tigray: The Tigrayan culture is deeply rooted in Christianity, with the Tigrayan people predominantly adhering to the Ethiopian Orthodox Tewahedo Church. They have a unique architectural heritage, with ancient rock-hewn churches and monasteries.</p>
        <div className="flex flex-col space-y-8">
          {cultures.map((culture, index) => (
            <div key={index} className="bg-white rounded-lg border overflow-hidden flex flex-col sm:flex-row">
              <img src={culture.imageUrl} alt={culture.name} className="w-full sm:w-1/2 h-64 object-cover" />
              <div className="p-6 flex flex-col justify-center items-start">
                <h3 className="text-xl lg:text-2xl font-semibold mb-2">{culture.name}</h3>
                <p className="text-lg lg:text-base mb-4">{culture.description}</p>
                <p className="text-gray-600">Day: {culture.day}</p> {/* Display day */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Culture;
