import React from 'react';

const MeetOurExperts = () => {
  const experts = [
    {
      id: 1,
      name: 'Emma Green',
      specialization: 'Indoor Plant Care',
      image: 'https://i.pravatar.cc/150?u=expert1',
    },
    {
      id: 2,
      name: 'Liam Bloom',
      specialization: 'Orchid Specialist',
      image: 'https://i.pravatar.cc/150?u=expert2',
    },
    {
      id: 3,
      name: 'Sophia Leaf',
      specialization: 'Succulent Expert',
      image: 'https://i.pravatar.cc/150?u=expert3',
    },
    {
      id: 4,
      name: 'Noah Vine',
      specialization: 'Urban Gardening',
      image: 'https://i.pravatar.cc/150?u=expert4',
    },
  ];

  return (
    <div className="py-12 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Meet Our Green Experts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {experts.map(expert => (
          <div key={expert.id} className="card bg-white shadow-xl">
            <figure className="px-4 pt-4">
              <img src={expert.image} alt={expert.name} className="rounded-full h-32 w-32 object-cover" />
            </figure>
            <div className="card-body text-center">
              <h3 className="text-green-700">{expert.name}</h3>
              <p className="text-gray-600">{expert.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurExperts;