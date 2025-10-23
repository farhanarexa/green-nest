import React from 'react';

const EcoDecorIdeas = () => {
  const decorIdeas = [
    {
      id: 1,
      title: 'Living Wall Art',
      description: 'Create a vertical garden with succulents and ferns to add a vibrant touch to your walls.',
      image: 'https://i.pravatar.cc/150?u=decor1',
    },
    {
      id: 2,
      title: 'Terrarium Centerpiece',
      description: 'Use glass terrariums with small plants for an elegant dining table centerpiece.',
      image: 'https://i.pravatar.cc/150?u=decor2',
    },
    {
      id: 3,
      title: 'Hanging Planters',
      description: 'Hang macramé planters with trailing plants to maximize space and add charm.',
      image: 'https://i.pravatar.cc/150?u=decor3',
    },
  ];

  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Eco Decor Ideas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {decorIdeas.map(idea => (
          <div key={idea.id} className="card bg-green-100 shadow-md">
            <figure className="px-4 pt-4">
              <img src={idea.image} alt={idea.title} className="rounded-xl h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-green-700">{idea.title}</h3>
              <p className="text-gray-600">{idea.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcoDecorIdeas;