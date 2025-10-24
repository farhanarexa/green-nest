import React from 'react';

const PlantCareTips = () => {
  const tips =[
  {
    "id": 1,
    "title": "Watering Wisely 💧",
    "description": "Water your plants when the top inch of soil feels dry to the touch, as this prevents overwatering, which can lead to root rot. Ensure pots have drainage holes to allow excess water to escape, and use a saucer to catch drips. For most houseplants, watering once every 1-2 weeks is sufficient, but adjust based on your plant’s needs and room humidity."
  },
  {
    "id": 2,
    "title": "Sunlight Matters ☀️",
    "description": "Place plants in bright, indirect light to promote healthy growth, as direct sunlight can scorch leaves. A north or east-facing window is often ideal. Rotate your plants every couple of weeks to ensure all sides receive even light exposure, which helps prevent lopsided growth. If natural light is limited, consider using a grow light to supplement."
  },
  {
    "id": 3,
    "title": "Fertilizing Tips 🌱",
    "description": "Use a balanced liquid fertilizer, such as a 10-10-10 formula, every 4-6 weeks during the growing season (spring and summer) to provide essential nutrients. Dilute the fertilizer to half-strength to avoid burning the roots. In fall and winter, reduce or stop fertilizing as most plants enter a dormant phase, requiring less nourishment."
  }
]

  return (
    <div className="py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Plant Care Tips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {tips.map(tip => (
          <div key={tip.id} className="card bg-green-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-green-700 mb-5 font-bold text-3xl border-b-2 border-green-200">{tip.title}</h3>
              <p className="text-green-800">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCareTips;