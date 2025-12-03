import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinner from '../../assets/logoL.png';

const PlantDetails = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // // Redirect if not authenticated
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     navigate('/login', { state: { from: `/plantdetails/${plantId}` } });
  //   }
  // }, [authLoading, user, navigate, plantId]);

  // Fetch plant data
  useEffect(() => {
    fetch('/plants.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.plantId === parseInt(plantId));
        if (found) {
          setPlant(found);
        } else {
          navigate('/plants');
        }
      })
      .catch(() => navigate('/plants'));
  }, [plantId, navigate]);

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please fill in your name and email.', { toastId: 'booking-error-empty' });
      return;
    }
    if (plant.availableStock <= 0) {
      toast.error('Sorry, this plant is currently out of stock.', { toastId: 'booking-error-stock' });
      return;
    }
    toast.success(`Booking confirmed for ${plant.plantName}! Thank you, ${name}!`, { toastId: 'booking-success' });
    setName('');
    setEmail('');
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="container mx-auto my-12 text-center">
        <p className="text-green-700">Checking authentication...</p>
      </div>
    );
  }

  // Plant loading / not found
  if (!plant) {
    return (
      <div className="container mx-auto my-12 flex items-center justify-center min-h-[200px]">
        <img src={spinner} alt="Loading..." className="w-32 md:w-48" />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 rounded bg-green-200 px-4 py-2 font-bold text-green-700 transition hover:-translate-y-0.5 hover:bg-green-300 hover:text-black"
      >
        ← Back
      </button>

      <div className="bg-green-50 rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 p-5 md:p-8">
          {/* Image Section */}
          <div className="flex justify-center lg:block flex-1">
            <div className="bg-white p-4 rounded-xl shadow-sm max-w-md mx-auto">
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Info & Booking Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 text-center lg:text-left mb-2">
              {plant.plantName}
            </h2>
            <p className="text-green-700 font-medium text-center lg:text-left mb-6">
              Provider: <span className="font-semibold">{plant.providerName}</span>
            </p>

            <p className="text-green-800 mb-6 text-base md:text-lg text-center lg:text-left px-2 lg:px-0">
              {plant.description}
            </p>

            {/* Key Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-green-700">
                  <span className="font-bold">Price:</span>{' '}
                  <span className="text-xl font-black text-green-800">${plant.price}</span>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-green-700">
                  <span className="font-bold">Rating:</span>{' '}
                  <span className="text-xl font-black text-green-800">{plant.rating} ★</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-green-700">
                <p><span className="font-bold">Category:</span> {plant.category}</p>
                <p><span className="font-bold">Care Level:</span> {plant.careLevel}</p>
                <p>
                  <span className="font-bold">Stock:</span>{' '}
                  <span className={plant.availableStock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {plant.availableStock > 0 ? `${plant.availableStock} available` : 'Out of Stock'}
                  </span>
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="border-4 border-green-300 rounded-2xl bg-green-100 p-5">
              <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 text-center">
                Book This Plant
              </h3>
              <form onSubmit={handleBookNow} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-bold text-green-800">Your Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full bg-green-200 placeholder-green-700"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-bold text-green-800">Your Email</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full bg-green-200 placeholder-green-700"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={plant.availableStock <= 0}
                  className={`w-full py-3 font-bold rounded-lg transition-all
                    ${plant.availableStock > 0
                      ? 'bg-green-300 text-green-800 hover:bg-green-400 hover:-translate-y-0.5 hover:text-black'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {plant.availableStock > 0 ? 'Book Now' : 'Out of Stock'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default PlantDetails;
