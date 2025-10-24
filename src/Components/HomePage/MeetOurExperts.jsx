import React from 'react';

const MeetOurExperts = () => {
  const experts = [
    {
      id: 1,
      name: 'Emma Green',
      specialization: 'Indoor Plant Care',
      image: 'https://www.plantscaping.com/wp-content/uploads/2018/06/Melanie-Plant-Care-400x267.jpg',
    },
    {
      id: 2,
      name: 'Liam Bloom',
      specialization: 'Orchid Specialist',
      image: 'https://www.plantscaping.com/wp-content/uploads/2018/06/Michael-Installation-400x267.jpg',
    },
    {
      id: 3,
      name: 'Sophia Leaf',
      specialization: 'Succulent Expert',
      image: 'https://www.plantscaping.com/wp-content/uploads/2018/06/Aleecia-Plant-Care-400x267.jpg',
    },
    {
      id: 4,
      name: 'Noah Vine',
      specialization: 'Urban Gardening',
      image: 'https://www.plantscaping.com/wp-content/uploads/2025/01/Merkel-Sara.jpg',
    },
  ];

  return (
    <div className="py-12 bg-green-50">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Meet Our Green Experts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {experts.map(expert => (
          <div key={expert.id} className="card bg-white shadow-xl">
            <figure className="px-4 pt-4">
              <img src={expert.image} alt={expert.name} className="rounded-full h-50 w-50 object-cover" />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-green-700 text-xl font-semibold">{expert.name}</h3>
              <p className="text-green-500"><span className='font-bold'>Specialization:</span> {expert.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurExperts;