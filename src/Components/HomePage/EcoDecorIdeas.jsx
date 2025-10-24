import React from 'react';

const EcoDecorIdeas = () => {
  const decorIdeas = [
  {
    "id": 1,
    "title": "Living Wall Art",
    "description": "Create a stunning vertical garden by mounting succulents, ferns, and air plants on a wall frame or panel. Use a mix of textures and colors for visual appeal, and ensure the plants are secured in well-draining soil or moss. Install in a spot with bright, indirect light and mist weekly to maintain humidity, transforming your wall into a vibrant, living masterpiece.",
    "image": "https://i.pinimg.com/736x/84/e5/b4/84e5b40f051eeb02b2adeedfe9275cda.jpg"
  },
  {
    "id": 2,
    "title": "Terrarium Centerpiece",
    "description": "Craft an elegant dining table centerpiece using a glass terrarium filled with small plants like moss, fittonia, or mini ferns. Add decorative elements such as pebbles or driftwood for a polished look. Place in a well-lit area but avoid direct sunlight to prevent overheating. Water sparingly with a spray bottle to maintain moisture without flooding the enclosed environment.",
    "image": "https://m.media-amazon.com/images/I/61rpetoDCaL._AC_UF894,1000_QL80_.jpg"
  },
  {
    "id": 3,
    "title": "Hanging Planters",
    "description": "Maximize space and add charm by hanging macramé planters with trailing plants like pothos, ivy, or string of pearls. Choose sturdy ceiling hooks or wall brackets to support the weight, and position near a window for adequate light. Water carefully to avoid drips, and trim plants regularly to encourage lush growth and maintain an attractive, cascading effect.",
    "image": "https://c02.purpledshub.com/uploads/sites/40/2021/10/pr2000035489-8f988b9.jpg?h=1339&webp=1"
  }
]

  return (
    <div className="py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Eco Decor Ideas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {decorIdeas.map(idea => (
          <div key={idea.id} className="card bg-green-100 shadow-md">
            <figure className="px-4 pt-4">
              <img src={idea.image} alt={idea.title} className="rounded-xl h-90 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-green-700 font-bold text-3xl">{idea.title}</h3>
              <p className="text-green-700">{idea.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EcoDecorIdeas;