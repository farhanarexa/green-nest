import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const TopRatedPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('/plants.json')
      .then(response => response.json())
      .then(data => {

        const filteredPlants = data.filter(plant => plant.rating > 4.6);
        setPlants(filteredPlants);
      })
      .catch(error => {
        console.error('Error fetching plants:', error);
      });
  }, []);

  return (
    <div className="py-12 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Top Rated Indoor Plants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plants.map(plant => (
          <div key={plant.plantId} className="card bg-white shadow-xl">
            <figure className="px-4 pt-4">
              <img src={plant.image} alt={plant.plantName} className="rounded-xl h-40 w-full object-cover" />
            </figure>
            <div className="card-body text-center">
              <h3 className=" text-green-700">{plant.plantName}</h3>
              <p className="text-gray-600">${plant.price.toFixed(2)}</p>
              <p className="text-yellow-500">Rating: {plant.rating} ★</p>
              <div className="card-actions justify-center mt-4">
                <Link to={`/plantdetails/${plant.plantId}`}>
                  <button className="rounded bg-green-300 px-4 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-400 hover:text-black">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedPlants;
