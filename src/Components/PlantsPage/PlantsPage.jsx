import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import spinner from '../../assets/logoL.png';
const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    fetch('/plants.json')
      .then(response => response.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false); 
      });
  }, []);


  if (loading) {
    return (
      <div className="container mx-auto my-24 flex items-center justify-center min-h-[300px]">
        <div className="relative">
          <img src={spinner} alt="Loading..." className="inline-block w-48" />
          <div className="ripple"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-5 bg-green-50">
      <h2 className="text-5xl font-bold text-center text-green-700 mb-8">Our Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.length > 0 ? (
          plants.map(plant => (
            <div key={plant.plantId} className="card shadow-xl rounded-4xl bg-white">
              <figure>
                <img
                  className="h-96 w-full object-cover p-5 rounded-4xl"
                  src={plant.image}
                  alt={plant.plantName}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-3xl text-green-800 block m-auto">
                  {plant.plantName}
                </h2>
                <div className="text-base text-green-700 text-center">
                  <p>Price: ${plant.price}</p>
                  <p>Rating: {plant.rating} ★</p>
                </div>
                <div className="mt-4">
                  <Link to={`/plantdetails/${plant.plantId}`}>
                    <button className="rounded bg-green-200 px-4 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black text-sm sm:text-base w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          
          <div className="col-span-full text-center text-xl text-gray-600">
            No plants available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantsPage;
