import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import spinner from '../../assets/logoL.png';

const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [categoryFilter, setCategoryFilter] = useState('all');

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

  //unique categories for filter dropdown
  const categories = ['all', ...new Set(plants.map(p => p.category))];

  //filtering and sorting
  const filteredAndSortedPlants = plants
    .filter(plant => categoryFilter === 'all' || plant.category === categoryFilter)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

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
    <div className="container mx-auto my-10 p-5">
      <h2 className="text-5xl font-bold text-center text-green-700 mb-8">Our Plants</h2>

      {/* Sorting & Filtering Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mb-8">

        {/* Sort by Price */}
        <div>
          <label htmlFor="sort" className="block text-green-700 font-medium mb-1">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered bg-green-100 text-green-800"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Filter by Category */}
        <div>
          <label htmlFor="category" className="block text-green-700 font-medium mb-1">Filter by Category:</label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered bg-green-100 text-green-800"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAndSortedPlants.length > 0 ? (
          filteredAndSortedPlants.map(plant => (
            <div
              key={plant.plantId}
              className="card bg-white shadow-lg shadow-green-800/40 rounded-4xl overflow-hidden transition-all duration-300 ease-in-out
             hover:shadow-2xl hover:shadow-green-800 hover:-translate-y-2 hover:scale-[1.02]
             cursor-pointer"
            >
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
                  <p className="text-sm mt-1 text-green-600">{plant.category}</p>
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
            No plants available with current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantsPage;
