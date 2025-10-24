import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const PlantOfTheWeek = () => {
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch('/plants.json')
      .then(response => response.json())
      .then(data => {
        const featuredPlant = data.find(plant => plant.rating > 4.5);
        setPlant(featuredPlant || data[0]); 
      })
      .catch(error => {
        console.error('Error fetching plant of the week:', error);
      });
  }, []);

  if (!plant) {
    return null; 
  }

  return (
    <div className="py-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Plant of the Week</h2>
      <div className="max-w-4xl mx-auto px-4">
        <div className="card bg-green-100 shadow-xl flex flex-col md:flex-row">
          <figure className="md:w-1/2 p-6">
            <img src={plant.image} alt={plant.plantName} className="rounded-xl h-64 w-full object-cover border-5 border-green-200" />
          </figure>
          <div className="card-body md:w-1/2 text-center md:text-left">
            <h3 className="card-title text-green-700 text-3xl font-bold">{plant.plantName}</h3>
            <p className="text-green-800 text-xl mt-2 font-black">${plant.price.toFixed(2)}</p>
            <p className="text-green-700 mt-2 text-base">Rating: {plant.rating} ★</p>
            <div className="card-actions justify-center md:justify-start mt-4">
              <Link to={`/plantdetails/${plant.plantId}`}>
                <button className="rounded bg-green-300 px-6 py-3 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantOfTheWeek;