import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

const PlantDetails = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/plants.json')
      .then((response) => response.json())
      .then((data) => {
        const foundPlant = data.find((p) => p.plantId === parseInt(plantId));
        if (foundPlant) {
          setPlant(foundPlant);
        } else {
          navigate('/plants');
        }
      })
      .catch(() => navigate('/plants'));
  }, [plantId, navigate]);

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    if (plant.availableStock <= 0) {
      alert('Sorry, this plant is currently out of stock.');
      return;
    }
    alert(`Booking confirmed for ${plant.plantName}!\nThank you, ${name}!`);
    setName('');
    setEmail('');
  };

  if (!plant) {
    return (
      <div className="container mx-auto my-12 text-center">
        <p>Loading plant details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6">
        ← Back to Plants
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-green-100 shadow-xl rounded-box p-6">
        <div className="flex justify-center lg:block w-full lg:w-auto">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <img
              src={plant.image}
              alt={plant.plantName}
              className="w-full max-w-xs lg:max-w-none h-auto object-contain"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
         <div>
             <h2 className="font-bold text-center lg:text-left text-5xl text-green-800">{plant.plantName}</h2>
          <p className="text-sm text-green-700 font-bold mt-1"><span className="font-medium">Provider:</span> {plant.providerName}</p>
         </div>
          <p className="text-lg text-green-800 mt-6">{plant.description}</p>

          <div className="mt-4 space-y-2 text-left inline-block lg:w-full">
            <p><span className="font-semibold">Price:</span> ${plant.price}</p>
            <p><span className="font-semibold">Rating:</span> {plant.rating} ★</p>
            <p><span className="font-semibold">Category:</span> {plant.category}</p>
            <p><span className="font-semibold">Care Level:</span> {plant.careLevel}</p>
            
            <p>
              <span className="font-semibold">Available Stock:</span>{' '}
              <span className={plant.availableStock > 0 ? 'text-green-600' : 'text-red-600'}>
                {plant.availableStock > 0 ? plant.availableStock : 'Out of Stock'}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">Book This Plant</h3>
            <form onSubmit={handleBookNow}>
              <div className="form-control mb-3">
                <label className="label justify-center lg:justify-start">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full max-w-xs lg:max-w-none mx-auto lg:mx-0"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label justify-center lg:justify-start">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full max-w-xs lg:max-w-none mx-auto lg:mx-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${plant.availableStock <= 0 ? 'btn-disabled' : ''}`}
                disabled={plant.availableStock <= 0}
              >
                {plant.availableStock > 0 ? 'Book Now' : 'Out of Stock'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;