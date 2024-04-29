import React from 'react';

const Religious = () => {
  // Sample data for religious beliefs in Ethiopia
  const religiousBeliefs = [
    {
      name: "Ethiopian Orthodox Tewahedo Church",
      description: "The Ethiopian Orthodox Tewahedo Church is one of the oldest Christian denominations in the world and has been the predominant religion in Ethiopia for centuries. It follows the teachings of the Bible and holds unique traditions such as the observance of holidays like Timkat (Epiphany) and Meskel (Finding of the True Cross). The Church plays a central role in Ethiopian culture and society, influencing art, music, and literature.",
      image: "https://www-images.christianitytoday.com/images/122194.jpg?h=337&w=600",
      link: "#orthodox_tewahedo"
    },
    {
      name: "Islam",
      description: "Islam has a significant presence in Ethiopia, particularly in regions such as Harar, Dire Dawa, and the Somali Region. Muslims in Ethiopia follow both Sunni and Shia branches of Islam and have their own unique cultural practices and traditions. Mosques are prominent landmarks in Ethiopian cities and towns, and Islamic festivals such as Eid al-Fitr and Eid al-Adha are widely celebrated.",
      image: "https://lh5.googleusercontent.com/p/AF1QipPbWeyfZSldb2AWzXwkIo0nqwLYDmieHvqxIAdg=w500-h500-k-no",
      link: "#islam"
    },
    {
      name: "Protestant",
      description: "Traditional indigenous beliefs, often referred to as animism, have deep roots in Ethiopian culture and continue to coexist with Christianity and Islam. These beliefs vary among different ethnic groups and often revolve around the worship of nature, ancestors, and spirits. Rituals, ceremonies, and sacrifices play a central role in traditional Ethiopian religious practices, reflecting a profound connection to the natural world and the spiritual realm.",
      image: "https://www.adequatetravel.com/Images/Kulebi%20St.%20Gabriel%20Church%20In%20Ethiopia.png",
      link: "#traditional_beliefs"
    },
    // Add more religious beliefs here...
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Religious Beliefs in Ethiopia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {religiousBeliefs.map((belief, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={belief.image} alt={belief.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{belief.name}</h2>
              <p className="text-sm mb-4">{belief.description}</p>
              <a href={belief.link} className="text-blue-600 hover:underline">More Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Religious;
