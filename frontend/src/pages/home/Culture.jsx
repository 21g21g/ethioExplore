import React from 'react';

const Culture = () => {
  const cultures = [
    {
      name: 'Oromo Culture',
      description: 'The Oromo people have a rich cultural heritage, with traditions that date back centuries. They are known for their vibrant music, colorful clothing, and unique ceremonies.',
      imageUrl: 'https://images.unsplash.com/photo-1560807707-94e2406fb872',
    },
    {
      name: 'Amhara Culture',
      description: 'The Amhara people are one of Ethiopia\'s largest ethnic groups, with a rich cultural heritage that includes traditional music, dance, and art. They are known for their colorful celebrations and festivals.',
      imageUrl: 'https://images.unsplash.com/photo-1598954968870-fd34288841c1',
    },
    {
      name: 'Tigray Culture',
      description: 'The Tigray people have a rich cultural heritage that includes unique traditions, music, and cuisine. They are known for their ancient churches carved into the rock, as well as their vibrant festivals and celebrations.',
      imageUrl: 'https://images.unsplash.com/photo-1560807707-94e2406fb872',
    },
    {
      name: 'Sidama Culture',
      description: 'The Sidama people have a rich cultural heritage that includes unique traditions, music, and dance. They are known for their vibrant markets, traditional ceremonies, and intricate artwork.',
      imageUrl: 'https://images.unsplash.com/photo-1598954968870-fd34288841c1',
    },
    {
      name: 'Afar Culture',
      description: 'The Afar people have a rich cultural heritage that includes unique traditions, music, and dance. They are known for their nomadic lifestyle, camel herding, and colorful celebrations.',
      imageUrl: 'https://images.unsplash.com/photo-1560807707-94e2406fb872',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center  py-8 px-4">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-semibold mb-8">Explore Ethiopian Cultures</h2>
        <div className="flex flex-col gap-8">
          {cultures.map((culture, index) => (
            <div key={index} className="bg-white rounded-lg flex border overflow-hidden">
              <img src={culture.imageUrl} alt={culture.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{culture.name}</h3>
                <p className="text-lg mb-4">{culture.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Culture;
