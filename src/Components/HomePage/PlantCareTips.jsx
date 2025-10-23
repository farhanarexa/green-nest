import React from 'react';

const PlantCareTips = () => {
  const tips = [
    {
      id: 1,
      title: 'Watering Wisely',
      description: 'Water your plants when the top inch of soil feels dry. Overwatering can harm roots, so ensure proper drainage.',
    },
    {
      id: 2,
      title: 'Sunlight Matters',
      description: 'Place plants in bright, indirect light for optimal growth. Rotate them occasionally for even exposure.',
    },
    {
      id: 3,
      title: 'Fertilizing Tips',
      description: 'Use a balanced liquid fertilizer every 4-6 weeks during the growing season to boost plant health.',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Plant Care Tips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {tips.map(tip => (
          <div key={tip.id} className="card bg-green-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-green-700">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCareTips;